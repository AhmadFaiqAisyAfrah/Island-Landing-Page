import 'dart:ui' as dart_ui;
import 'package:flutter/material.dart';

import '../../../../tags/presentation/tag_selector.dart';
import '../../../../music/presentation/music_icon_button.dart';
import '../../../../../core/widgets/glass_hint.dart';
import '../../../../../core/theme/app_theme.dart';
import '../../../../../core/theme/theme_provider.dart';
import '../../widgets/animated_focus_button.dart';

class RightPanel extends StatelessWidget {
  final bool isFocusing;
  final ThemeState themeState;
  final String currentQuote;
  final String selectedMusic;
  final bool showFocusHint;
  final bool isNight;
  final int remainingSeconds;
  final ValueChanged<String> onMusicSelected;
  final VoidCallback onDismissHint;
  final VoidCallback onFocusToggle;
  final String Function(int) formatTime;

  const RightPanel({
    super.key,
    required this.isFocusing,
    required this.themeState,
    required this.currentQuote,
    required this.selectedMusic,
    required this.showFocusHint,
    required this.isNight,
    required this.remainingSeconds,
    required this.onMusicSelected,
    required this.onDismissHint,
    required this.onFocusToggle,
    required this.formatTime,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 48.0, vertical: 48.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Quote
          AnimatedSwitcher(
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
                : Text(
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
          
          const SizedBox(height: 16),

          // Timer
          SizedBox(
            width: 240,
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                formatTime(remainingSeconds),
                maxLines: 1,
                softWrap: false,
                textAlign: TextAlign.center,
                style: AppTextStyles.timer.copyWith(
                  color: isNight ? Colors.white : const Color(0xFF5F6B7A),
                  fontSize: 100,
                  fontWeight: FontWeight.w300,
                  letterSpacing: 2.0,
                  height: 1.0,
                  shadows: AppTextStyles.softShadow,
                ),
              ),
            ),
          ),
          
          const SizedBox(height: 24),
          
          // Selectors
          Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Flexible(child: TagSelector(isFocusing: isFocusing)),
              const SizedBox(width: 12),
              if (!isFocusing)
                Flexible(child: MusicIconButton(
                  initialValue: selectedMusic,
                  onMusicSelected: onMusicSelected,
                )),
            ],
          ),

          const SizedBox(height: 24),

          // Focus Button
          AnimatedFocusButton(
            isFocusing: isFocusing,
            themeState: themeState,
            onTap: onFocusToggle,
          ),

          if (!isFocusing && showFocusHint) ...[
            const SizedBox(height: 32),
            GlassHint(
              text: 'Set your time. Let the island breathe with you.',
              isNight: isNight,
              onDismiss: onDismissHint,
            ),
          ],
        ],
      ),
    );
  }
}
