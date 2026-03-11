import 'dart:async';
import 'dart:ui' as dart_ui;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_theme.dart';
import '../../island/presentation/island_visual_stack.dart';
import '../../island/presentation/layers/island_base_layer.dart';
import '../../navigation/presentation/island_drawer.dart';
import '../../timer/domain/timer_logic.dart';
import '../../focus_guide/data/quotes_repository.dart';

import '../../../../core/theme/theme_provider.dart';
import '../../../../core/data/feature_discovery_provider.dart';
import '../../../../core/data/shared_preferences_provider.dart';
import '../../../../core/widgets/glass_hint.dart';
import 'distant_scenery.dart';
import 'star_scatter.dart';

import 'dart:math' as math;
import '../../shop/presentation/shop_screen.dart';
import '../../../../core/widgets/island_coin_icon.dart';
import '../../../../core/services/coin_service.dart';
import '../../archipelago/data/archipelago_provider.dart';
import '../../tags/presentation/tags_provider.dart';
import '../../music/presentation/music_icon_button.dart';
import '../../../services/music_service.dart';
import '../../tags/presentation/tag_selector.dart';

import 'layouts/phone_layout.dart';
import 'layouts/tablet_layout.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with WidgetsBindingObserver, TickerProviderStateMixin {
  // ... (Code omitted for brevity)
  String _currentQuote = "Your quiet place.";
  Timer? _quoteRotationTimer;
  DateTime? _pausedAt;
  bool _showFocusHint = false;
  String _selectedMusic =
      'None'; // Track selected music: None, Rainy Vibes, Forest Vibes

  // Theme selection state
  String _selectedTheme = 'Original Island';
  TabController? _tabController;
  bool _collapseAllByDefault = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    // Initialize tab controller
    _tabController = TabController(length: 3, vsync: this);
    // Initial Headline
    _currentQuote = QuotesRepository.getDashboardHeadline();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final discovery = ref.read(featureDiscoveryProvider);
      if (!discovery.hasSeenFocusHint) {
        setState(() => _showFocusHint = true);
        ref.read(featureDiscoveryProvider.notifier).markFocusHintSeen();
      }
    });
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused) {
      _pausedAt = DateTime.now();
      _quoteRotationTimer?.cancel(); // Pause rotation
    } else if (state == AppLifecycleState.resumed) {
      _resumeCopyRotation();
    }
  }

  void _resumeCopyRotation() {
    final now = DateTime.now();
    // Rotate Header if idle > 30 mins
    if (_pausedAt != null && now.difference(_pausedAt!).inMinutes > 30) {
      final timerState = ref.read(timerProvider);
      if (timerState.status != TimerStatus.running) {
        setState(() => _currentQuote = QuotesRepository.getDashboardHeadline());
      }
    }

    // Resume Timer if focusing
    final timerState = ref.read(timerProvider);
    if (timerState.status == TimerStatus.running) {
      _startFocusRotation();
    }
  }

  void _startFocusRotation() {
    _quoteRotationTimer?.cancel();
    // Rotate every 6 minutes (360s)
    _quoteRotationTimer = Timer.periodic(const Duration(minutes: 6), (_) {
      final timerState = ref.read(timerProvider);
      if (mounted && timerState.status == TimerStatus.running) {
        setState(() => _currentQuote = QuotesRepository.getFocusQuote());
      }
    });
  }

  void _stopFocusRotation() {
    _quoteRotationTimer?.cancel();
    _quoteRotationTimer = null;
  }

  void _toggleFocus() {
    final timerState = ref.read(timerProvider);
    final isFocusing = timerState.status == TimerStatus.running;
    if (isFocusing) {
      // STOP FOCUS
      ref.read(timerProvider.notifier).reset();
      // Stop music when focus ends
      MusicService.instance.stop();
    } else {
      // START FOCUS
      ref.read(timerProvider.notifier).start();
      // Start music based on selection
      MusicService.instance.stop(); // Reset first
      switch (_selectedMusic) {
        case 'Rainy Vibes':
          MusicService.instance.switchTrack(MusicTrack.rainy);
          MusicService.instance.playCurrentTrack();
          break;
        case 'Forest Vibes':
          MusicService.instance.switchTrack(MusicTrack.forest);
          MusicService.instance.playCurrentTrack();
          break;
        case 'Night Vibes':
          MusicService.instance.switchTrack(MusicTrack.night);
          MusicService.instance.playCurrentTrack();
          break;
        case 'Snow Vibes':
          MusicService.instance.switchTrack(MusicTrack.snow);
          MusicService.instance.playCurrentTrack();
          break;
        case 'Ocean Vibes':
          MusicService.instance.switchTrack(MusicTrack.ocean);
          MusicService.instance.playCurrentTrack();
          break;
        case 'None':
        default:
          // No music selected, do nothing
          break;
      }
    }
  }

  String _formatTime(int seconds) {
    final m = seconds ~/ 60;
    final s = seconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final timerState = ref.watch(timerProvider);
    final themeState = ref.watch(themeProvider);
    final isFocusing = timerState.status == TimerStatus.running;
    final isNight = themeState.mode == AppThemeMode.night;
    final bgColors = _getBackgroundColors(themeState);

    // Listen for completion & state changes
    ref.listen(timerProvider, (previous, next) {
      // START FOCUS
      if (next.status == TimerStatus.running &&
          (previous?.status != TimerStatus.running)) {
        setState(() {
          _currentQuote = QuotesRepository.getFocusQuote();
          _startFocusRotation();
          _showFocusHint = false;
        });
      }
      // STOP/PAUSE FOCUS
      else if (previous?.status == TimerStatus.running &&
          next.status != TimerStatus.running) {
        _stopFocusRotation();
        // Stop music when focus stops
        MusicService.instance.stop();
        if (next.status == TimerStatus.idle) {
          setState(
              () => _currentQuote = QuotesRepository.getDashboardHeadline());
        }
      }

      if (next.status == TimerStatus.completed) {
        // Calculate Reward (1 Coin per minute)
        final int minutesFocused = next.initialDuration ~/ 60;
        final int reward = minutesFocused > 0 ? minutesFocused : 1;

        // Award Coins using CoinService (single source of truth)
        CoinService().addCoins(reward);

        // Archipelago: Save Daily Progress
        final selectedTag = ref.read(selectedTagProvider);
        ref.read(archipelagoProvider.notifier).addSession(
            durationSeconds: next.initialDuration,
            tagLabel: selectedTag.label,
            tagEmoji: selectedTag.emoji);

        // Music continues independent of timer
        // ref.read(audioServiceProvider.notifier).stopPlayback();

        showDialog(
            context: context,
            barrierDismissible: false,
            builder: (ctx) => AlertDialog(
                  backgroundColor: AppColors.skyBottom,
                  title: Column(
                    children: [
                      const Text("🧘", style: TextStyle(fontSize: 40)),
                      const SizedBox(height: 8),
                      Text('Well done.', style: AppTextStyles.heading),
                    ],
                  ),
                  content: Text(
                    'You focused for $minutesFocused minutes\nand earned $reward coins!',
                    style: AppTextStyles.body,
                    textAlign: TextAlign.center,
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20)),
                  actions: [
                    Center(
                      child: TextButton(
                        onPressed: () {
                          ref.read(timerProvider.notifier).reset();
                          Navigator.pop(ctx);
                        },
                        child: Text('Collect',
                            style: TextStyle(
                                color: AppColors.islandCliff,
                                fontWeight: FontWeight.bold)),
                      ),
                    )
                  ],
                ));
      }
    });

    return Scaffold(
      drawer: const IslandDrawer(), // 3. The Sidebar
      // The Stack handles the background gradient directly
      body: Stack(
        fit: StackFit.expand, // Force stack to fill the screen
        children: [
          // 1. SKY / OCEAN ATMOSPHERE (Global Gradient)
          Positioned.fill(
              child: AnimatedContainer(
                  duration: const Duration(
                      milliseconds: 1200), // Smooth slow transition
                  curve: Curves.easeInOut,
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: bgColors,
                    // DAY/AUTUMN: Smooth steps. NIGHT: Standard.
                    stops: isNight
                        ? null
                        : (bgColors.length == 4
                            ? [0.0, 0.4, 0.7, 1.0]
                            : (bgColors.length == 3
                                ? [0.0, 0.5, 1.0]
                                : [0.0, 1.0])),
                  )))),

          // 1.25 STAR SCATTER (Global Night Layer)
          // Always present at night, behind scenery.
          if (isNight)
            const Positioned.fill(
              child: StarScatter(count: 60),
            ),

          // 1.5 DISTANT SCENERY (Environment Specific)
          Positioned.fill(
            child: DistantScenery(themeState: themeState),
          ),

          // Layouts Switcher (Tablet and Phone)
          Positioned.fill(
            child: Builder(
              builder: (innerContext) => ValueListenableBuilder<int>(
                valueListenable: CoinService().coinNotifier,
                builder: (context, coinBalance, _) {
                  return LayoutBuilder(
                    builder: (context, constraints) {
                      if (constraints.maxWidth >= 600) {
                        return TabletLayout(
                          isFocusing: isFocusing,
                          themeState: themeState,
                          isNight: isNight,
                          currentQuote: _currentQuote,
                          coinBalance: coinBalance,
                          selectedMusic: _selectedMusic,
                          showFocusHint: _showFocusHint,
                          remainingSeconds: timerState.remainingSeconds,
                          initialDuration: timerState.initialDuration,
                          onMenuPressed: () =>
                              Scaffold.of(innerContext).openDrawer(),
                          onThemeToggle: () =>
                              ref.read(themeProvider.notifier).toggleMode(),
                          onShopPressed: () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (_) => const ShopScreen())),
                          onMusicSelected: (music) =>
                              setState(() => _selectedMusic = music),
                          onDismissHint: () =>
                              setState(() => _showFocusHint = false),
                          onDurationChanged: (val) {
                            if (!isFocusing) {
                              ref.read(timerProvider.notifier).setDuration(val);
                            }
                          },
                          onFocusToggle: _toggleFocus,
                          formatTime: _formatTime,
                        );
                      } else {
                        return PhoneLayout(
                          isFocusing: isFocusing,
                          themeState: themeState,
                          isNight: isNight,
                          currentQuote: _currentQuote,
                          coinBalance: coinBalance,
                          selectedMusic: _selectedMusic,
                          showFocusHint: _showFocusHint,
                          remainingSeconds: timerState.remainingSeconds,
                          initialDuration: timerState.initialDuration,
                          onMenuPressed: () =>
                              Scaffold.of(innerContext).openDrawer(),
                          onThemeToggle: () =>
                              ref.read(themeProvider.notifier).toggleMode(),
                          onShopPressed: () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (_) => const ShopScreen())),
                          onMusicSelected: (music) =>
                              setState(() => _selectedMusic = music),
                          onDismissHint: () =>
                              setState(() => _showFocusHint = false),
                          onDurationChanged: (val) {
                            if (!isFocusing) {
                              ref.read(timerProvider.notifier).setDuration(val);
                            }
                          },
                          onFocusToggle: _toggleFocus,
                          formatTime: _formatTime,
                        );
                      }
                    },
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Helper for background colors
  List<Color> _getBackgroundColors(ThemeState state) {
    final bool isNight = state.mode == AppThemeMode.night;
    final environment = state.environment;
    final season = state.season;

    // 1. SPECIFIC ENVIRONMENTS
    switch (environment) {
      case AppEnvironment.mountain:
        // Cold, majestic purple-grey
        return isNight
            ? [const Color(0xFF232526), const Color(0xFF414345)]
            : [const Color(0xFFE6DADA), const Color(0xFF274046)];

      case AppEnvironment.beach:
        // Warm cyan/teal
        return isNight
            ? [const Color(0xFF0F2027), const Color(0xFF203A43)]
            : [const Color(0xFF89F7FE), const Color(0xFF66A6FF)];

      case AppEnvironment.forest:
        // Deep greens and mists
        return isNight
            ? [const Color(0xFF093028), const Color(0xFF237A57)]
            : [const Color(0xFFD3CCE3), const Color(0xFFE9E4F0)];

      case AppEnvironment.defaultSky:
      default:
        // 2. DEFAULT (SEASONAL SKY)

        // Unified Night (Premium)
        if (isNight) {
          return [CalmPalette.winterNightTop, CalmPalette.winterNightBot];
        }

        // Winter Day
        if (season == AppSeason.winter) {
          return const [const Color(0xFFF2F4F6), const Color(0xFFF2F4F6)];
        }

        // Autumn Day
        if (season == AppSeason.autumn) {
          return const [const Color(0xFFF2F4F6), const Color(0xFFF2F4F6)];
        }

        // Normal / Sakura Day
        return const [const Color(0xFFF2F4F6), const Color(0xFFF2F4F6)];
    }
  }
}

// --- PAINTERS ---

class _NoisePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Generate static noise to break gradient banding
    final random = math.Random(42); // Seeded for static consistency
    final paint = Paint();
    final w = size.width;
    final h = size.height;

    // Low density noise
    for (int i = 0; i < 2000; i++) {
      paint.color = Colors.white
          .withOpacity(random.nextDouble() * 0.03); // Tiny white specks
      canvas.drawCircle(
          Offset(random.nextDouble() * w, random.nextDouble() * h), 1.0, paint);

      paint.color = Colors.black
          .withOpacity(random.nextDouble() * 0.02); // Tiny dark specks
      canvas.drawCircle(
          Offset(random.nextDouble() * w, random.nextDouble() * h), 1.0, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// --- WIDGETS ---
