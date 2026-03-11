import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/theme/app_theme.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'features/archipelago/data/archipelago_repository.dart';
import 'features/archipelago/data/archipelago_provider.dart';
import 'core/data/shared_preferences_provider.dart';
import 'core/services/theme_unlock_service.dart';
import 'services/music_service.dart';
import 'services/notification_service.dart';
import 'services/ad_service.dart';
import 'core/services/coin_service.dart';
import 'features/home/presentation/home_screen.dart';
import 'features/onboarding/presentation/onboarding_screen.dart';
import 'features/onboarding/data/onboarding_storage.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseFirestore.instance.settings = const Settings(
    persistenceEnabled: !kIsWeb,
  );
  await MobileAds.instance.initialize();

  // Determine device shortest side for orientation lock
  final dispatcher = WidgetsBinding.instance.platformDispatcher;
  final view = dispatcher.views.first;
  final shortestSide = view.physicalSize.shortestSide / view.devicePixelRatio;

  if (shortestSide >= 600) {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);
  } else {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
  }

  final prefs = await SharedPreferences.getInstance();
  final repository = ArchipelagoRepository(prefs);

  // Initialize MusicService (singleton, non-blocking)
  // Audio will be preloaded and ready for playback
  MusicService().init();

  // Initialize AdService (preload ads)
  AdService().init();

  // Initialize CoinService (load balance, migrate legacy data)
  await CoinService().init();
  await ThemeUnlockService().init();
  debugPrint('[main] 🚀 App startup — CoinService.coinNotifier: ${CoinService().coinNotifier.value}');

  // Initialize Notification Service
  await NotificationService().init();
  
  // Schedule daily reflection notification if conditions met
  await NotificationService().rescheduleDailyReflectionIfNeeded();

  // Determine initial screen based on onboarding status
  final onboardingStorage = OnboardingStorage(prefs);
  final initialHome = onboardingStorage.hasSeenOnboarding 
      ? const HomeScreen() 
      : const OnboardingScreen();

  runApp(
    ProviderScope(
      overrides: [
        archipelagoRepoProvider.overrideWithValue(repository),
        sharedPreferencesProvider.overrideWithValue(prefs),
      ],
      child: IslandApp(home: initialHome),
    ),
  );
}

class IslandApp extends StatelessWidget {
  final Widget home;
  
  const IslandApp({super.key, required this.home});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Island',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.pastelTheme,
      // Enforce the pastel theme for the MVP visual consistency
      themeMode: ThemeMode.light,
      home: home,
      routes: {
        '/dashboard': (context) => const HomeScreen(),
      },
    );
  }
}
