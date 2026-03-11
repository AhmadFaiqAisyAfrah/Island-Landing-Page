import 'dart:ui' as dart_ui;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:emoji_picker_flutter/emoji_picker_flutter.dart';
import '../../../../../core/theme/app_theme.dart';
import '../../../../../core/widgets/island_coin_icon.dart';
import '../../../../archipelago/data/archipelago_provider.dart';
import '../../../../focus_tasks/data/focus_tasks_provider.dart';

class LeftPanel extends StatelessWidget {
  final bool isFocusing;
  final bool isNight;
  final int coinBalance;
  final VoidCallback onMenuPressed;
  final VoidCallback onThemeToggle;
  final VoidCallback onShopPressed;

  const LeftPanel({
    super.key,
    required this.isFocusing,
    required this.isNight,
    required this.coinBalance,
    required this.onMenuPressed,
    required this.onThemeToggle,
    required this.onShopPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Menu Button
        if (!isFocusing)
          IconButton(
            icon: const Icon(Icons.menu_rounded, size: 28),
            color: AppColors.textMain.withOpacity(0.6),
            tooltip: 'Menu',
            onPressed: onMenuPressed,
          ),
        if (!isFocusing) const SizedBox(height: 16),
        
        // Theme Toggle
        if (!isFocusing)
          IconButton(
            icon: AnimatedSwitcher(
              duration: const Duration(milliseconds: 400),
              transitionBuilder: (child, anim) => FadeTransition(opacity: anim, child: child),
              child: Icon(
                isNight ? Icons.wb_sunny_rounded : Icons.nightlight_round,
                key: ValueKey(isNight),
                size: 26,
              ),
            ),
            color: AppColors.textMain.withOpacity(0.6),
            tooltip: isNight ? 'Switch over to Day' : 'Switch over to Night',
            onPressed: onThemeToggle,
          ),
        
        if (!isFocusing) const SizedBox(height: 32),

        if (!isFocusing) ...[
          // Reward Row (Coin + Streak)
          Consumer(
            builder: (context, ref, child) {
              final history = ref.watch(archipelagoProvider);
              final streak = _calculateStreak(history);
              return Row(
                children: [
                  _CoinIndicator(
                    coinBalance: coinBalance,
                    isNight: isNight,
                    onTap: onShopPressed,
                  ),
                  const SizedBox(width: 12),
                  _StreakIndicator(
                    streak: streak,
                    isNight: isNight,
                  ),
                ],
              );
            },
          ),
          
          const SizedBox(height: 24),
          
          // Focus Today Card
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: SizedBox(
              width: 210,
              child: FocusTodayCard(isNight: isNight),
            ),
          ),
          
          const SizedBox(height: 20),
          
          // Focus Tasks Card
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: SizedBox(
              width: 210,
              child: FocusTasksCard(isFocusing: isFocusing, isNight: isNight),
            ),
          ),
        ],
      ],
    );
  }
}

class FocusTodayCard extends ConsumerWidget {
  final bool isNight;

  const FocusTodayCard({super.key, required this.isNight});

  String _formatFocusTime(int totalSeconds) {
    if (totalSeconds == 0) return '0m';
    final int totalMinutes = totalSeconds ~/ 60;
    final int hours = totalMinutes ~/ 60;
    final int minutes = totalMinutes % 60;
    if (hours > 0) {
      if (minutes == 0) return '${hours}h';
      return '${hours}h ${minutes}m';
    }
    return '${minutes}m';
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final history = ref.watch(archipelagoProvider);
    final today = DateTime.now();

    // Find today's progress
    final todayProgressList = history.where((p) => 
        p.date.year == today.year && 
        p.date.month == today.month && 
        p.date.day == today.day
    ).toList();

    final int totalSeconds = todayProgressList.isNotEmpty ? todayProgressList.first.totalFocusSeconds : 0;
    final int sessionCount = todayProgressList.isNotEmpty ? todayProgressList.first.sessionCount : 0;

    final String timeDisplay = _formatFocusTime(totalSeconds);
    final String sessionDisplay = sessionCount == 1 ? '1 session' : '$sessionCount sessions';

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        color: Colors.white.withOpacity(isNight ? 0.08 : 0.4),
        border: Border.all(
          color: Colors.white.withOpacity(isNight ? 0.05 : 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Focus Today',
            style: AppTextStyles.body.copyWith(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: isNight ? Colors.white.withOpacity(0.7) : AppColors.textMain.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            timeDisplay,
            style: AppTextStyles.subHeading.copyWith(
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: isNight ? Colors.white : AppColors.textMain,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            sessionDisplay,
            style: AppTextStyles.body.copyWith(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: isNight ? Colors.white.withOpacity(0.5) : AppColors.textMain.withOpacity(0.5),
            ),
          ),
        ],
      ),
    );
  }
}

int _calculateStreak(List<dynamic> history) {
  if (history.isEmpty) return 0;
  
  final sortedDays = List.from(history)
    ..sort((a, b) => b.date.compareTo(a.date));
  
  int streak = 0;
  DateTime checkDate = DateTime.now();
  
  for (final day in sortedDays) {
    final dayDate = DateTime(day.date.year, day.date.month, day.date.day);
    final targetDate = DateTime(checkDate.year, checkDate.month, checkDate.day);
    
    if (dayDate == targetDate || 
        dayDate == targetDate.subtract(const Duration(days: 1))) {
      if (day.totalFocusSeconds > 0) {
        streak++;
        checkDate = dayDate;
      } else {
        break;
      }
    } else if (dayDate.isBefore(targetDate.subtract(const Duration(days: 1)))) {
      break;
    }
  }
  
  return streak;
}

class _CoinIndicator extends StatelessWidget {
  final int coinBalance;
  final bool isNight;
  final VoidCallback onTap;

  const _CoinIndicator({
    required this.coinBalance,
    required this.isNight,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 46,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        decoration: BoxDecoration(
          color: isNight
              ? Colors.white.withOpacity(0.15)
              : Colors.white.withOpacity(0.65),
          borderRadius: BorderRadius.circular(30),
          border: Border.all(
            color: Colors.white.withOpacity(0.5),
            width: 1.0
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            )
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const IslandCoinIcon(size: 20),
            const SizedBox(width: 6),
            Text(
              '$coinBalance',
              style: AppTextStyles.body.copyWith(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: isNight ? Colors.white : AppColors.textMain,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StreakIndicator extends StatelessWidget {
  final int streak;
  final bool isNight;

  const _StreakIndicator({
    required this.streak,
    required this.isNight,
  });

  @override
  Widget build(BuildContext context) {
    if (streak == 0) return const SizedBox.shrink();
    
    return Container(
      height: 46,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isNight
            ? Colors.white.withOpacity(0.15)
            : Colors.white.withOpacity(0.65),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(
          color: Colors.white.withOpacity(0.5),
          width: 1.0
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          )
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            '🔥',
            style: TextStyle(fontSize: 16),
          ),
          const SizedBox(width: 4),
          Text(
            '$streak',
            style: AppTextStyles.body.copyWith(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isNight ? Colors.white : AppColors.textMain,
            ),
          ),
        ],
      ),
    );
  }
}

class FocusTasksCard extends ConsumerStatefulWidget {
  final bool isFocusing;
  final bool isNight;

  const FocusTasksCard({
    super.key,
    required this.isFocusing,
    required this.isNight,
  });

  @override
  ConsumerState<FocusTasksCard> createState() => _FocusTasksCardState();
}

class _FocusTasksCardState extends ConsumerState<FocusTasksCard> {
  final TextEditingController _addTaskController = TextEditingController();
  DateTime? _startDate;
  DateTime? _endDate;
  TaskStatusFilter _statusFilter = TaskStatusFilter.all;

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    _startDate = DateTime(now.year, now.month, now.day);
    _endDate = _startDate;
  }

  @override
  void dispose() {
    _addTaskController.dispose();
    super.dispose();
  }

  String _formatDateRange() {
    if (_startDate == null) return '📅 All';
    final start = _startDate!;
    if (_endDate == null || _startDate == _endDate) {
      return '📅 ${_monthName(start.month)} ${start.day}';
    }
    return '📅 ${_monthName(start.month)} ${start.day} – ${_monthName(_endDate!.month)} ${_endDate!.day}';
  }

  String _monthName(int month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  }

  List<FocusTask> _filterTasks(List<FocusTask> tasks) {
    return tasks.where((task) {
      bool passesDueFilter = true;
      bool passesStatusFilter = true;

      if (task.dueDate != null && _startDate != null) {
        final dueDay = DateTime(task.dueDate!.year, task.dueDate!.month, task.dueDate!.day);
        final start = DateTime(_startDate!.year, _startDate!.month, _startDate!.day);
        final end = _endDate != null ? DateTime(_endDate!.year, _endDate!.month, _endDate!.day) : start;
        passesDueFilter = !dueDay.isBefore(start) && !dueDay.isAfter(end);
      }

      switch (_statusFilter) {
        case TaskStatusFilter.pending:
          passesStatusFilter = !task.isCompleted;
          break;
        case TaskStatusFilter.completed:
          passesStatusFilter = task.isCompleted;
          break;
        case TaskStatusFilter.all:
          passesStatusFilter = true;
          break;
      }

      return passesDueFilter && passesStatusFilter;
    }).toList();
  }

  void _showDateRangePicker() {
    showDialog(
      context: context,
      builder: (context) => _DateRangePickerDialog(
        initialStartDate: _startDate,
        initialEndDate: _endDate,
        isNight: widget.isNight,
        onConfirm: (start, end) {
          setState(() {
            _startDate = start;
            _endDate = end;
          });
        },
      ),
    );
  }

  void _showAddTaskDialog() async {
    _addTaskController.clear();
    String? selectedEmoji;
    final result = await showDialog<String>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: AppColors.skyBottom,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: Text("New Focus Task", style: AppTextStyles.heading.copyWith(fontSize: 18)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _addTaskController,
                autofocus: true,
                decoration: InputDecoration(
                  hintText: "Task name (e.g. 📚 Study biology)",
                  counterText: "",
                  suffixIcon: GestureDetector(
                    onTap: () {
                      showModalBottomSheet(
                        context: context,
                        backgroundColor: Colors.transparent,
                        isScrollControlled: true,
                        builder: (ctx) => SizedBox(
                          height: 350,
                          child: EmojiPicker(
                            onEmojiSelected: (category, emoji) {
                              setDialogState(() {
                                selectedEmoji = emoji.emoji;
                              });
                              final currentText = _addTaskController.text;
                              final newText = currentText.isEmpty 
                                  ? '${emoji.emoji} ' 
                                  : '${emoji.emoji} $currentText';
                              _addTaskController.text = newText;
                              _addTaskController.selection = TextSelection.fromPosition(
                                TextPosition(offset: newText.length),
                              );
                              Navigator.pop(ctx);
                            },
                          ),
                        ),
                      );
                    },
                    child: Container(
                      margin: const EdgeInsets.all(8),
                      alignment: Alignment.center,
                      width: 24,
                      height: 24,
                      child: Text(
                        selectedEmoji ?? "😊",
                        style: const TextStyle(fontSize: 18),
                      ),
                    ),
                  ),
                ),
                onSubmitted: (_) {
                  final title = _addTaskController.text.trim();
                  if (title.isNotEmpty) {
                    Navigator.pop(dialogContext, title);
                  }
                },
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialogContext),
              child: const Text("Cancel"),
            ),
            TextButton(
              onPressed: () {
                final title = _addTaskController.text.trim();
                if (title.isNotEmpty) {
                  Navigator.pop(dialogContext, title);
                }
              },
              child: const Text("Add"),
            ),
          ],
        ),
      ),
    );

    if (result != null && result.isNotEmpty) {
      ref.read(focusTasksProvider.notifier).addTask(result);
      setState(() {
        _statusFilter = TaskStatusFilter.all;
      });
    }
  }

  void _showEditTaskDialog(String taskId, String currentTitle) {
    _addTaskController.text = currentTitle;
    showDialog(
      context: context,
      builder: (dialogContext) => AlertDialog(
        backgroundColor: AppColors.skyBottom,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text("Edit Task", style: AppTextStyles.heading.copyWith(fontSize: 18)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _addTaskController,
              autofocus: true,
              decoration: InputDecoration(
                hintText: "Task name (e.g. 📚 Study biology)",
                counterText: "",
              ),
              onSubmitted: (_) => _updateTask(taskId),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(dialogContext),
            child: const Text("Cancel"),
          ),
          TextButton(
            onPressed: () {
              _updateTask(taskId);
              Navigator.pop(dialogContext);
            },
            child: const Text("Save"),
          ),
        ],
      ),
    );
  }

  void _updateTask(String taskId) {
    final title = _addTaskController.text.trim();
    if (title.isNotEmpty) {
      ref.read(focusTasksProvider.notifier).updateTask(taskId, title);
    }
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    StreamBuilder<List<FocusTask>>(
      stream: ref.watch(focusTasksRepositoryProvider).fetchTasks(),
      builder: (context, snapshot) {
        final allTasks = snapshot.data ?? ref.watch(focusTasksProvider);
        final filteredTasks = _filterTasks(allTasks);
        final visibleTasks = filteredTasks.take(5).toList();
        final hasMoreTasks = filteredTasks.length > 5;

        return AnimatedOpacity(
          duration: const Duration(milliseconds: 300),
          opacity: widget.isFocusing ? 0.4 : 1.0,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
              color: Colors.white.withOpacity(widget.isNight ? 0.10 : 0.35),
              border: Border.all(
                color: Colors.white.withOpacity(widget.isNight ? 0.05 : 0.25),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Focus Tasks',
                      style: AppTextStyles.body.copyWith(
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                        color: widget.isNight ? Colors.white.withOpacity(0.7) : AppColors.textMain.withOpacity(0.7),
                      ),
                    ),
                    GestureDetector(
                      onTap: _showAddTaskDialog,
                      child: Text(
                        '+ Add',
                        style: AppTextStyles.body.copyWith(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: widget.isNight ? Colors.white.withOpacity(0.6) : AppColors.textMain.withOpacity(0.6),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    GestureDetector(
                      onTap: _showDateRangePicker,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: widget.isNight ? Colors.white.withOpacity(0.1) : Colors.white.withOpacity(0.3),
                        ),
                        child: Text(
                          _formatDateRange(),
                          style: AppTextStyles.body.copyWith(
                            fontSize: 12,
                            color: widget.isNight ? Colors.white : AppColors.textMain,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    SizedBox(
                      width: 110,
                      child: _FilterDropdown<TaskStatusFilter>(
                        value: _statusFilter,
                        items: TaskStatusFilter.values,
                        labelBuilder: (filter) {
                          switch (filter) {
                            case TaskStatusFilter.all: return 'All';
                            case TaskStatusFilter.pending: return 'Pending';
                            case TaskStatusFilter.completed: return 'Done';
                          }
                        },
                        onChanged: (value) => setState(() => _statusFilter = value),
                        isNight: widget.isNight,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                if (visibleTasks.isEmpty)
                  _EmptyTaskState(
                    onAddTask: _showAddTaskDialog,
                    isNight: widget.isNight,
                  )
                else
                  SizedBox(
                    height: visibleTasks.length * 40.0,
                    child: ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: visibleTasks.length,
                      itemBuilder: (context, index) {
                        final task = visibleTasks[index];
                        return _TaskRow(
                          task: task,
                          isNight: widget.isNight,
                          onToggle: () => ref.read(focusTasksProvider.notifier).toggleTask(task.id),
                          onEdit: () => _showEditTaskDialog(task.id, task.title),
                          onDelete: () => ref.read(focusTasksProvider.notifier).deleteTask(task.id),
                        );
                      },
                    ),
                  ),
                if (hasMoreTasks) ...[
                  const SizedBox(height: 8),
                  Text(
                    'View all →',
                    style: AppTextStyles.body.copyWith(
                      fontSize: 12,
                      color: widget.isNight ? Colors.white.withOpacity(0.5) : AppColors.textMain.withOpacity(0.5),
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      }
    );
  }
}

class _FilterDropdown<T> extends StatelessWidget {
  final T value;
  final List<T> items;
  final String Function(T) labelBuilder;
  final ValueChanged<T> onChanged;
  final bool isNight;

  const _FilterDropdown({
    required this.value,
    required this.items,
    required this.labelBuilder,
    required this.onChanged,
    required this.isNight,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: isNight ? Colors.white.withOpacity(0.1) : Colors.white.withOpacity(0.3),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<T>(
          value: value,
          isDense: true,
          icon: Icon(Icons.arrow_drop_down, size: 18, color: isNight ? Colors.white60 : Colors.black54),
          style: AppTextStyles.body.copyWith(
            fontSize: 11,
            color: isNight ? Colors.white : AppColors.textMain,
          ),
          dropdownColor: isNight ? const Color(0xFF2C2C2E) : Colors.white,
          items: items.map((item) => DropdownMenuItem<T>(
            value: item,
            child: Text(labelBuilder(item)),
          )).toList(),
          onChanged: (v) => v != null ? onChanged(v) : null,
        ),
      ),
    );
  }
}

class _EmptyTaskState extends StatelessWidget {
  final VoidCallback onAddTask;
  final bool isNight;

  const _EmptyTaskState({
    required this.onAddTask,
    required this.isNight,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Column(
        children: [
          Text(
            'No tasks yet',
            style: AppTextStyles.body.copyWith(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: isNight ? Colors.white.withOpacity(0.6) : AppColors.textMain.withOpacity(0.6),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Add something you want to focus on today.',
            textAlign: TextAlign.center,
            style: AppTextStyles.body.copyWith(
              fontSize: 12,
              color: isNight ? Colors.white.withOpacity(0.4) : AppColors.textMain.withOpacity(0.4),
            ),
          ),
          const SizedBox(height: 12),
          GestureDetector(
            onTap: onAddTask,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                color: isNight ? Colors.white.withOpacity(0.15) : Colors.white.withOpacity(0.5),
              ),
              child: Text(
                '+ Add Task',
                style: AppTextStyles.body.copyWith(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: isNight ? Colors.white.withOpacity(0.8) : AppColors.textMain.withOpacity(0.7),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DateRangePickerDialog extends StatefulWidget {
  final DateTime? initialStartDate;
  final DateTime? initialEndDate;
  final bool isNight;
  final void Function(DateTime startDate, DateTime endDate) onConfirm;

  const _DateRangePickerDialog({
    this.initialStartDate,
    this.initialEndDate,
    required this.isNight,
    required this.onConfirm,
  });

  @override
  State<_DateRangePickerDialog> createState() => _DateRangePickerDialogState();
}

class _DateRangePickerDialogState extends State<_DateRangePickerDialog> {
  late DateTime _focusedMonth;
  DateTime? _startDate;
  DateTime? _endDate;
  bool _selectingStart = true;

  @override
  void initState() {
    super.initState();
    _focusedMonth = widget.initialStartDate ?? DateTime.now();
    _startDate = widget.initialStartDate;
    _endDate = widget.initialEndDate;
  }

  String _monthName(int month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  }

  bool _isInRange(DateTime day) {
    if (_startDate == null) return false;
    final end = _endDate ?? _startDate;
    if (end == null) return false;
    final start = DateTime(_startDate!.year, _startDate!.month, _startDate!.day);
    final e = DateTime(end.year, end.month, end.day);
    final d = DateTime(day.year, day.month, day.day);
    return !d.isBefore(start) && !d.isAfter(e);
  }

  bool _isStartOrEnd(DateTime day) {
    if (_startDate == null) return false;
    final d = DateTime(day.year, day.month, day.day);
    final start = DateTime(_startDate!.year, _startDate!.month, _startDate!.day);
    if (_endDate != null) {
      final end = DateTime(_endDate!.year, _endDate!.month, _endDate!.day);
      return d == start || d == end;
    }
    return d == start;
  }

  void _handleDateTap(DateTime date) {
    setState(() {
      if (_selectingStart) {
        _startDate = date;
        _endDate = null;
        _selectingStart = false;
      } else {
        if (date.isBefore(_startDate!)) {
          _endDate = _startDate;
          _startDate = date;
        } else {
          _endDate = date;
        }
        _selectingStart = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final firstDayOfMonth = DateTime(_focusedMonth.year, _focusedMonth.month, 1);
    final lastDayOfMonth = DateTime(_focusedMonth.year, _focusedMonth.month + 1, 0);
    final firstWeekday = firstDayOfMonth.weekday % 7;
    final daysInMonth = lastDayOfMonth.day;

    final effectiveEndDate = _endDate ?? _startDate;
    final hasSelection = _startDate != null;

    return AlertDialog(
      backgroundColor: widget.isNight ? const Color(0xFF2C2C2E) : Colors.white,
      title: Text(
        'Select Date Range',
        style: TextStyle(color: widget.isNight ? Colors.white : AppColors.textMain),
      ),
      content: SizedBox(
        width: 300,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  icon: Icon(Icons.chevron_left, color: widget.isNight ? Colors.white : AppColors.textMain),
                  onPressed: () => setState(() => _focusedMonth = DateTime(_focusedMonth.year, _focusedMonth.month - 1)),
                ),
                Text(
                  '${_monthName(_focusedMonth.month)} ${_focusedMonth.year}',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: widget.isNight ? Colors.white : AppColors.textMain,
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.chevron_right, color: widget.isNight ? Colors.white : AppColors.textMain),
                  onPressed: () => setState(() => _focusedMonth = DateTime(_focusedMonth.year, _focusedMonth.month + 1)),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => SizedBox(
                width: 32,
                child: Text(d, textAlign: TextAlign.center, style: TextStyle(fontSize: 12, color: widget.isNight ? Colors.white54 : Colors.black45)),
              )).toList(),
            ),
            const SizedBox(height: 4),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 7, childAspectRatio: 1),
              itemCount: firstWeekday + daysInMonth,
              itemBuilder: (context, index) {
                if (index < firstWeekday) return const SizedBox();
                final day = index - firstWeekday + 1;
                final date = DateTime(_focusedMonth.year, _focusedMonth.month, day);
                final isSelected = _isStartOrEnd(date);
                final isInRange = _isInRange(date);
                final isToday = DateTime.now().year == date.year && DateTime.now().month == date.month && DateTime.now().day == day;

                return GestureDetector(
                  onTap: () => _handleDateTap(date),
                  child: Container(
                    margin: const EdgeInsets.all(2),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isSelected ? (widget.isNight ? Colors.white : AppColors.textMain) : (isInRange ? (widget.isNight ? Colors.white.withOpacity(0.2) : Colors.black.withOpacity(0.1)) : null),
                      border: isToday ? Border.all(color: widget.isNight ? Colors.white : AppColors.textMain, width: 1) : null,
                    ),
                    child: Center(
                      child: Text(
                        '$day',
                        style: TextStyle(
                          fontSize: 12,
                          color: isSelected ? (widget.isNight ? Colors.black : Colors.white) : (widget.isNight ? Colors.white : AppColors.textMain),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 16),
            if (hasSelection && effectiveEndDate != null)
              Text(
                '${_startDate!.day}/${_startDate!.month}${_endDate != null && _startDate != _endDate ? ' – ${effectiveEndDate.day}/${effectiveEndDate.month}' : ''}',
                style: TextStyle(
                  color: widget.isNight ? Colors.white70 : Colors.black54,
                  fontWeight: FontWeight.w500,
                ),
              ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            final now = DateTime.now();
            final today = DateTime(now.year, now.month, now.day);
            widget.onConfirm(today, today);
          },
          child: Text('Today', style: TextStyle(color: widget.isNight ? Colors.white70 : Colors.black54)),
        ),
        TextButton(
          onPressed: () {
            widget.onConfirm(DateTime.now(), DateTime.now());
          },
          child: Text('Clear', style: TextStyle(color: widget.isNight ? Colors.white70 : Colors.black54)),
        ),
        TextButton(
          onPressed: () {
            if (_startDate != null) {
              widget.onConfirm(_startDate!, effectiveEndDate ?? _startDate!);
            }
            Navigator.pop(context);
          },
          child: const Text('Done'),
        ),
      ],
    );
  }
}

class _TaskRow extends StatelessWidget {
  final FocusTask task;
  final bool isNight;
  final VoidCallback onToggle;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const _TaskRow({
    required this.task,
    required this.isNight,
    required this.onToggle,
    required this.onEdit,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key(task.id),
      direction: DismissDirection.endToStart,
      onDismissed: (_) => onDelete(),
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 8),
        child: Icon(
          Icons.delete_outline,
          size: 18,
          color: Colors.red.withOpacity(0.7),
        ),
      ),
      child: GestureDetector(
        onLongPress: onEdit,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Row(
            children: [
              GestureDetector(
                onTap: onToggle,
                child: Container(
                  width: 18,
                  height: 18,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: task.isCompleted
                          ? Colors.transparent
                          : (isNight ? Colors.white.withOpacity(0.5) : AppColors.textMain.withOpacity(0.5)),
                      width: 1.5,
                    ),
                    color: task.isCompleted ? (isNight ? Colors.white.withOpacity(0.3) : AppColors.textMain.withOpacity(0.6)) : Colors.transparent,
                  ),
                  child: task.isCompleted
                      ? Icon(Icons.check, size: 12, color: isNight ? Colors.white : Colors.white)
                      : null,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  task.title,
                  style: AppTextStyles.body.copyWith(
                    fontSize: 13,
                    fontWeight: FontWeight.w400,
                    color: task.isCompleted
                        ? (isNight ? Colors.white.withOpacity(0.4) : AppColors.textMain.withOpacity(0.4))
                        : (isNight ? Colors.white.withOpacity(0.8) : AppColors.textMain),
                    decoration: task.isCompleted ? TextDecoration.lineThrough : null,
                    decorationColor: isNight ? Colors.white.withOpacity(0.4) : AppColors.textMain.withOpacity(0.4),
                  ),
                ),
              ),
              GestureDetector(
                onTap: onDelete,
                child: Padding(
                  padding: const EdgeInsets.only(left: 8),
                  child: Icon(
                    Icons.close,
                    size: 14,
                    color: isNight ? Colors.white.withOpacity(0.4) : AppColors.textMain.withOpacity(0.3),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
