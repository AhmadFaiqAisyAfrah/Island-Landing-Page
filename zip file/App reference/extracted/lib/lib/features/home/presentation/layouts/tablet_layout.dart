import 'package:flutter/material.dart';

import '../../../../core/theme/theme_provider.dart';
import 'panels/left_panel.dart';
import 'panels/center_panel.dart';
import 'panels/right_panel.dart';

class TabletLayout extends StatelessWidget {
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

  const TabletLayout({
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
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 64.0),
        child: Stack(
          children: [
            Row(
              children: [
                Expanded(
                  flex: 3,
                  child: LeftPanel(
                    isFocusing: isFocusing,
                    isNight: isNight,
                    coinBalance: coinBalance,
                    onMenuPressed: onMenuPressed,
                    onThemeToggle: onThemeToggle,
                    onShopPressed: onShopPressed,
                  ),
                ),
                const Spacer(flex: 3),
                const SizedBox(width: 32),
                Expanded(
                  flex: 3,
                  child: RightPanel(
                    isFocusing: isFocusing,
                    themeState: themeState,
                    currentQuote: currentQuote,
                    selectedMusic: selectedMusic,
                    showFocusHint: showFocusHint,
                    isNight: isNight,
                    remainingSeconds: remainingSeconds,
                    onMusicSelected: onMusicSelected,
                    onDismissHint: onDismissHint,
                    onFocusToggle: onFocusToggle,
                    formatTime: formatTime,
                  ),
                ),
              ],
            ),
            Center(
              child: CenterPanel(
                isFocusing: isFocusing,
                themeState: themeState,
                remainingSeconds: remainingSeconds,
                initialDuration: initialDuration,
                onDurationChanged: onDurationChanged,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
