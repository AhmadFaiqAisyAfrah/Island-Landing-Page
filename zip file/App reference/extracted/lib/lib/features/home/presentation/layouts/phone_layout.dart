import 'dart:ui' as dart_ui;
import 'package:flutter/material.dart';

import '../../../../core/theme/theme_provider.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../island/presentation/island_visual_stack.dart';
import '../../../tags/presentation/tag_selector.dart';
import '../../../music/presentation/music_icon_button.dart';
import '../../../../core/widgets/glass_hint.dart';
import '../../../../core/widgets/island_coin_icon.dart';
import '../widgets/animated_focus_button.dart';

class PhoneLayout extends StatelessWidget {
  final bool isFocusing;
  final ThemeState themeState;
  final bool isNight;
  final String currentQuote;
  final int coinBalance;
  final String selectedMusic;
  final bool showFocusHint;
  final int remainingSeconds;
  final int initialDuration;
  final VoidCallback onMenuPressed;
  final VoidCallback onThemeToggle;
  final VoidCallback onShopPressed;
  final ValueChanged<String> onMusicSelected;
  final VoidCallback onDismissHint;
  final ValueChanged<int> onDurationChanged;
  final VoidCallback onFocusToggle;
  final String Function(int) formatTime;

  const PhoneLayout({
    super.key,
    required this.isFocusing,
    required this.themeState,
    required this.isNight,
    required this.currentQuote,
    required this.coinBalance,
    required this.selectedMusic,
    required this.showFocusHint,
    required this.remainingSeconds,
    required this.initialDuration,
    required this.onMenuPressed,
    required this.onThemeToggle,
    required this.onShopPressed,
    required this.onMusicSelected,
    required this.onDismissHint,
    required this.onDurationChanged,
    required this.onFocusToggle,
    required this.formatTime,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        // The Living Island (Midground)
        Positioned.fill(
          child: IslandVisualStack(
            isFocusing: isFocusing,
            themeState: themeState,
            currentSeconds: isFocusing ? remainingSeconds : initialDuration,
            totalSeconds: isFocusing ? initialDuration : 7200,
            onDurationChanged: onDurationChanged,
          ),
        ),

        // UI Layer (Safe Area)
        SafeArea(
          child: Stack(
            children: [
              // HAMBURGER MENU (Top-Left)
              if (!isFocusing)
                Positioned(
                  top: 16,
                  left: 24,
                  child: IconButton(
                    icon: const Icon(Icons.menu_rounded, size: 28),
                    color: AppColors.textMain.withOpacity(0.6),
                    tooltip: 'Menu',
                    onPressed: onMenuPressed,
                  ),
                ),

              // DAY/NIGHT TOGGLE (Top-Right)
              if (!isFocusing)
                Positioned(
                  top: 16,
                  right: 24,
                  child: IconButton(
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
                ),

              // Main Layout (Centered Quote & Bottom Controls)
              Positioned.fill(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // Top: Quote / Header
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
                      child: AnimatedSwitcher(
                        duration: const Duration(seconds: 1),
                        child: isFocusing
                            ? ClipRRect(
                                borderRadius: BorderRadius.circular(30),
                                child: BackdropFilter(
                                  filter: dart_ui.ImageFilter.blur(sigmaX: 8, sigmaY: 8),
                                  child: Container(
                                    key: ValueKey(currentQuote),
                                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withOpacity(isNight ? 0.08 : 0.4),
                                      borderRadius: BorderRadius.circular(30),
                                      border: Border.all(
                                        color: Colors.white.withOpacity(isNight ? 0.1 : 0.3),
                                        width: 1.0,
                                      ),
                                    ),
                                    child: Text(
                                      currentQuote,
                                      textAlign: TextAlign.center,
                                      style: AppTextStyles.subHeading.copyWith(
                                        color: isNight ? Colors.white.withOpacity(0.95) : const Color(0xFF5F6B7A),
                                        fontSize: 18,
                                        fontStyle: FontStyle.italic,
                                        letterSpacing: 0.5,
                                        shadows: AppTextStyles.softShadow,
                                      ),
                                    ),
                                  ),
                                ),
                              )
                            : Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(top: 16.0),
                                    child: Text(
                                      currentQuote,
                                      key: ValueKey(currentQuote),
                                      style: AppTextStyles.subHeading.copyWith(
                                        color: isNight ? Colors.white.withOpacity(0.85) : const Color(0xFF5F6B7A).withOpacity(0.8),
                                        letterSpacing: 1.2,
                                        fontWeight: FontWeight.w400,
                                        shadows: AppTextStyles.softShadow,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  // CENTERED COIN BALANCE
                                  GestureDetector(
                                    onTap: onShopPressed,
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
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
                                          const IslandCoinIcon(size: 22),
                                          const SizedBox(width: 6),
                                          Text(
                                            '$coinBalance',
                                            style: AppTextStyles.body.copyWith(
                                              fontSize: 14,
                                              fontWeight: FontWeight.w600,
                                              color: isNight ? Colors.white : AppColors.textMain,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                      ),
                    ),

                    // Center Spacer
                    const Spacer(),

                    // Bottom: Controls
                    Padding(
                      padding: const EdgeInsets.only(bottom: 12.0, left: 24, right: 24),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          if (!isFocusing)
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                TagSelector(isFocusing: isFocusing),
                                const SizedBox(width: 12),
                                MusicIconButton(
                                  initialValue: selectedMusic,
                                  onMusicSelected: onMusicSelected,
                                ),
                              ],
                            )
                          else
                            TagSelector(isFocusing: isFocusing),

                          if (!isFocusing && showFocusHint) ...[
                            const SizedBox(height: 16),
                            GlassHint(
                              text: 'Set your time. Let the island breathe with you.',
                              isNight: isNight,
                              onDismiss: onDismissHint,
                            ),
                            const SizedBox(height: 20),
                          ] else
                            const SizedBox(height: 32),

                          // Timer Text
                          Text(
                            formatTime(remainingSeconds),
                            textAlign: TextAlign.center,
                            style: AppTextStyles.timer.copyWith(
                              color: isNight ? Colors.white : const Color(0xFF5F6B7A),
                              fontWeight: FontWeight.w300,
                              letterSpacing: 4.0,
                              height: 1.0,
                              shadows: AppTextStyles.softShadow,
                            ),
                          ),

                          const SizedBox(height: 56),

                          // Primary Action Button
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 24.0),
                            child: SizedBox(
                              height: 80,
                              width: double.infinity,
                              child: Stack(
                                children: [
                                  Center(
                                    child: AnimatedFocusButton(
                                      isFocusing: isFocusing,
                                      themeState: themeState,
                                      onTap: onFocusToggle,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

