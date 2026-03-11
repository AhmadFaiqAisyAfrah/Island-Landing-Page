import 'dart:async';
import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum TaskStatusFilter { all, pending, completed }

class FocusTask {
  final String id;
  final String title;
  final bool isCompleted;
  final DateTime createdAt;
  final DateTime? dueDate;
  final String? userId;
  final int sessionCount;

  FocusTask({
    required this.id,
    required this.title,
    this.isCompleted = false,
    DateTime? createdAt,
    this.dueDate,
    this.userId,
    this.sessionCount = 0,
  }) : createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toFirestoreMap() {
    return {
      'title': title,
      'isCompleted': isCompleted,
      'createdAt': Timestamp.fromDate(createdAt),
      'date': dueDate != null ? Timestamp.fromDate(dueDate!) : null,
      'userId': userId,
      'sessionCount': sessionCount,
    };
  }

  Map<String, dynamic> toLocalMap() {
    return {
      'id': id,
      'title': title,
      'isCompleted': isCompleted,
      'createdAt': createdAt.toIso8601String(),
      'date': dueDate?.toIso8601String(),
      'userId': userId,
      'sessionCount': sessionCount,
    };
  }

  factory FocusTask.fromMap(Map<String, dynamic> map, {String? fallbackId}) {
    DateTime parsedCreatedAt;
    if (map['createdAt'] is Timestamp) {
      parsedCreatedAt = (map['createdAt'] as Timestamp).toDate();
    } else if (map['createdAt'] is String) {
      parsedCreatedAt = DateTime.parse(map['createdAt']);
    } else {
      parsedCreatedAt = DateTime.now();
    }

    DateTime? parsedDueDate;
    final dynamic dateField = map['date'] ?? map['dueDate'];
    if (dateField != null) {
      if (dateField is Timestamp) {
        parsedDueDate = dateField.toDate();
      } else if (dateField is String) {
        parsedDueDate = DateTime.parse(dateField);
      }
    }

    return FocusTask(
      id: map['id'] ?? fallbackId ?? '',
      title: map['title'] ?? '',
      isCompleted: map['isCompleted'] ?? false,
      createdAt: parsedCreatedAt,
      dueDate: parsedDueDate,
      userId: map['userId'],
      sessionCount: map['sessionCount'] ?? 0,
    );
  }

  FocusTask copyWith({
    String? id,
    String? title,
    bool? isCompleted,
    DateTime? createdAt,
    DateTime? dueDate,
    String? userId,
    int? sessionCount,
    bool clearDueDate = false,
  }) {
    return FocusTask(
      id: id ?? this.id,
      title: title ?? this.title,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
      dueDate: clearDueDate ? null : (dueDate ?? this.dueDate),
      userId: userId ?? this.userId,
      sessionCount: sessionCount ?? this.sessionCount,
    );
  }
}

class FocusTasksRepository {
  static const String _storageKey = 'focus_tasks';
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<SharedPreferences> get _prefs => SharedPreferences.getInstance();

  // --- Local Storage (SharedPreferences) ---
  
  Future<List<FocusTask>> loadLocalTasks() async {
    try {
      final prefs = await _prefs;
      final String? jsonString = prefs.getString(_storageKey);
      if (jsonString == null) return [];
      
      final List<dynamic> decoded = json.decode(jsonString);
      return decoded.map((e) => FocusTask.fromMap(e)).toList();
    } catch (e) {
      debugPrint('[FocusTasks] loadLocalTasks error: $e');
      return [];
    }
  }

  Future<void> saveLocalTasks(List<FocusTask> tasks) async {
    try {
      final prefs = await _prefs;
      final encoded = json.encode(tasks.map((e) => e.toLocalMap()).toList());
      await prefs.setString(_storageKey, encoded);
    } catch (e) {
      debugPrint('[FocusTasks] saveLocalTasks error: $e');
    }
  }

  /// Clear local tasks for guest mode reset
  Future<void> resetToGuest() async {
    debugPrint('[FocusTasks] resetToGuest() — clearing local tasks');
    final prefs = await _prefs;
    await prefs.remove(_storageKey);
  }

  // --- Firestore Operations ---
  // Structure: users/{uid}/focus_tasks/{taskId}

  CollectionReference<Map<String, dynamic>> _getTasksCollection(String userId) {
    return _firestore.collection('users').doc(userId).collection('focus_tasks');
  }

  CollectionReference<Map<String, dynamic>> _getLegacyTasksCollection(String userId) {
    return _firestore.collection('users').doc(userId).collection('focusTasks');
  }

  String newCloudTaskId(String userId) {
    return _getTasksCollection(userId).doc().id;
  }

  Future<void> migrateLegacyPathIfNeeded(String userId) async {
    try {
      final legacySnapshot = await _getLegacyTasksCollection(userId).get();
      if (legacySnapshot.docs.isEmpty) return;

      final batch = _firestore.batch();
      for (final legacyDoc in legacySnapshot.docs) {
        final targetDoc = _getTasksCollection(userId).doc(legacyDoc.id);
        batch.set(targetDoc, legacyDoc.data(), SetOptions(merge: true));
      }
      await batch.commit();
      debugPrint('[FocusTasks] migrated legacy focusTasks -> focus_tasks');
    } catch (e) {
      debugPrint('[FocusTasks] migrateLegacyPathIfNeeded error: $e');
    }
  }

  Future<List<FocusTask>> loadCloudTasks(String userId) async {
    try {
      final snapshot = await _getTasksCollection(userId).orderBy('createdAt', descending: true).get();
      if (snapshot.docs.isEmpty) return [];

      return snapshot.docs.map((doc) => FocusTask.fromMap(doc.data(), fallbackId: doc.id)).toList();
    } catch (e) {
      debugPrint('[FocusTasks] loadCloudTasks error: $e');
      return [];
    }
  }

  Stream<List<FocusTask>> streamCloudTasks(String userId) {
    return _getTasksCollection(userId)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) => FocusTask.fromMap(doc.data(), fallbackId: doc.id)).toList();
    });
  }

  Future<void> saveCloudTask(String userId, FocusTask task) async {
    try {
      final taskWithUser = task.copyWith(userId: userId);
      await _getTasksCollection(userId).doc(task.id).set(taskWithUser.toFirestoreMap(), SetOptions(merge: true));
    } catch (e) {
      debugPrint('[FocusTasks] saveCloudTask error: $e');
    }
  }

  Future<void> updateCloudTask(String userId, FocusTask task) async {
    try {
      final taskWithUser = task.copyWith(userId: userId);
      await _getTasksCollection(userId).doc(task.id).set(taskWithUser.toFirestoreMap(), SetOptions(merge: true));
    } catch (e) {
      debugPrint('[FocusTasks] updateCloudTask error: $e');
    }
  }

  Future<void> deleteCloudTask(String userId, String taskId) async {
    try {
      await _getTasksCollection(userId).doc(taskId).delete();
    } catch (e) {
      debugPrint('[FocusTasks] deleteCloudTask error: $e');
    }
  }

  // --- Sync on Login ---

  Future<List<FocusTask>> syncOnLogin(String userId) async {
    try {
      await migrateLegacyPathIfNeeded(userId);

      final localTasks = await loadLocalTasks();
      final cloudTasks = await loadCloudTasks(userId);

      // Merge: combine all tasks, remove duplicates by id
      final mergedMap = <String, FocusTask>{};

      for (final task in localTasks) {
        mergedMap[task.id] = task;
      }

      for (final task in cloudTasks) {
        mergedMap[task.id] = task;
      }

      final mergedTasks = mergedMap.values.toList();

      // Save merged to both local and cloud
      await saveLocalTasks(mergedTasks);

      // Upload each task to Firestore as individual documents
      for (final task in mergedTasks) {
        await saveTask(task.copyWith(userId: userId));
      }

      return mergedTasks;
    } catch (e) {
      debugPrint('[FocusTasks] syncOnLogin error: $e');
      return [];
    }
  }

  // --- DIRECT FIRESTORE METHODS ---
  // Requested direct integration endpoints

  /// Saves a task directly to users/{uid}/focus_tasks/{taskId}
  Future<void> saveTask(FocusTask task) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      final taskWithUser = task.copyWith(userId: user.uid);
      await _firestore
          .collection('users')
          .doc(user.uid)
          .collection('focus_tasks')
          .doc(task.id)
          .set(taskWithUser.toFirestoreMap(), SetOptions(merge: true));
          
      // Cache locally
      final local = await loadLocalTasks();
      final idx = local.indexWhere((t) => t.id == task.id);
      if (idx >= 0) {
        local[idx] = taskWithUser;
      } else {
        local.insert(0, taskWithUser);
      }
      await saveLocalTasks(local);
    } else {
      // Guest local save
      final local = await loadLocalTasks();
      final idx = local.indexWhere((t) => t.id == task.id);
      if (idx >= 0) {
        local[idx] = task;
      } else {
        local.insert(0, task);
      }
      await saveLocalTasks(local);
    }
  }

  /// Automatically fetches all tasks from users/{uid}/focus_tasks as a Stream
  Stream<List<FocusTask>> fetchTasks() {
    final authStream = FirebaseAuth.instance.authStateChanges();
    return authStream.asyncExpand((user) {
      if (user != null) {
        return _firestore
            .collection('users')
            .doc(user.uid)
            .collection('focus_tasks')
            .orderBy('createdAt', descending: true)
            .snapshots()
            .map((snapshot) {
              final tasks = snapshot.docs
                  .map((doc) => FocusTask.fromMap(doc.data(), fallbackId: doc.id))
                  .toList();
              saveLocalTasks(tasks); // Sync to local backup so they don't disappear when offline
              return tasks;
            });
      } else {
        return Stream.fromFuture(loadLocalTasks());
      }
    });
  }
  
  /// Deletes task directly from Firestore
  Future<void> deleteTaskDirect(String taskId) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      await _firestore
          .collection('users')
          .doc(user.uid)
          .collection('focus_tasks')
          .doc(taskId)
          .delete();
    }
    // Delete locally
    final local = await loadLocalTasks();
    local.removeWhere((t) => t.id == taskId);
    await saveLocalTasks(local);
  }
}

final focusTasksRepositoryProvider = Provider<FocusTasksRepository>((ref) {
  return FocusTasksRepository();
});

class FocusTaskNotifier extends StateNotifier<List<FocusTask>> {
  final FocusTasksRepository _repository;
  late final StreamSubscription<User?> _authSubscription;
  StreamSubscription<List<FocusTask>>? _cloudTasksSubscription;
  User? _currentUser;

  FocusTaskNotifier(this._repository) : super([]) {
    // Listen to auth changes
    _authSubscription = FirebaseAuth.instance.authStateChanges().listen((user) {
      unawaited(_onAuthStateChanged(user));
    });
  }

  Future<void> _onAuthStateChanged(User? user) async {
    await _cloudTasksSubscription?.cancel();
    _cloudTasksSubscription = null;

    _currentUser = user;
    debugPrint('[FocusTasks] Auth state changed: ${user?.uid ?? 'guest'}');

    if (user != null) {
      debugPrint('[FocusTasks] Syncing + streaming cloud tasks for user: ${user.uid}');
      final mergedTasks = await _repository.syncOnLogin(user.uid);
      state = mergedTasks;

      _cloudTasksSubscription = _repository.streamCloudTasks(user.uid).listen(
        (cloudTasks) {
          state = cloudTasks;
          unawaited(_repository.saveLocalTasks(cloudTasks));
        },
        onError: (error) async {
          debugPrint('[FocusTasks] streamCloudTasks error: $error');
          final localTasks = await _repository.loadLocalTasks();
          state = localTasks;
        },
      );
    } else {
      // User logged out - load from local
      debugPrint('[FocusTasks] Loading from local (guest mode)');
      final tasks = await _repository.loadLocalTasks();
      state = tasks;
    }
  }

  Future<void> addTask(String title, {DateTime? dueDate}) async {
    final activeUid = _currentUser?.uid ?? FirebaseAuth.instance.currentUser?.uid;
    final taskId = activeUid != null
        ? _repository.newCloudTaskId(activeUid)
        : DateTime.now().millisecondsSinceEpoch.toString();

    final task = FocusTask(
      id: taskId,
      title: title,
      dueDate: dueDate,
      userId: activeUid,
    );

    await _repository.saveTask(task);
    
    // Update local riverpod state for fast UI / guest mode
    state = [task, ...state];
  }

  Future<void> toggleTask(String id) async {
    final currentTasks = state;
    final taskToToggle = currentTasks.firstWhere((t) => t.id == id, orElse: () => state.firstWhere((t) => t.id == id));
    final updatedTask = taskToToggle.copyWith(isCompleted: !taskToToggle.isCompleted);
    
    await _repository.saveTask(updatedTask);
    
    state = state.map((t) => t.id == id ? updatedTask : t).toList();
  }

  Future<void> deleteTask(String id) async {
    await _repository.deleteTaskDirect(id);
    state = state.where((task) => task.id != id).toList();
  }

  Future<void> updateTask(String id, String newTitle, {DateTime? dueDate}) async {
    final taskToUpdate = state.firstWhere((t) => t.id == id);
    final updatedTask = taskToUpdate.copyWith(title: newTitle, dueDate: dueDate, clearDueDate: dueDate == null);
    
    await _repository.saveTask(updatedTask);
    state = state.map((t) => t.id == id ? updatedTask : t).toList();
  }

  /// Reset to guest mode (empty task list). Called after logout.
  Future<void> resetToGuest() async {
    debugPrint('[FocusTasks] resetToGuest() — clearing local tasks');
    await _cloudTasksSubscription?.cancel();
    _cloudTasksSubscription = null;
    await _repository.resetToGuest();
    state = [];
  }

  @override
  void dispose() {
    unawaited(_cloudTasksSubscription?.cancel());
    unawaited(_authSubscription.cancel());
    super.dispose();
  }
}

final focusTasksProvider = StateNotifierProvider<FocusTaskNotifier, List<FocusTask>>((ref) {
  final repository = ref.watch(focusTasksRepositoryProvider);
  return FocusTaskNotifier(repository);
});
