import 'package:flutter/material.dart';

import '../../../../../core/theme/theme_provider.dart';
import '../../../../island/presentation/island_visual_stack.dart';

class CenterPanel extends StatelessWidget {
  final bool isFocusing;
  final ThemeState themeState;
  final int remainingSeconds;
  final int initialDuration;
  final ValueChanged<int> onDurationChanged;

  const CenterPanel({
    super.key,
    required this.isFocusing,
    required this.themeState,
    required this.remainingSeconds,
    required this.initialDuration,
    required this.onDurationChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Align(
              alignment: Alignment.topCenter,
                child: Transform.translate(
                offset: const Offset(-28, -52),
                child: SizedBox(
                  height: 390,
                  width: 390,
                  child: IslandVisualStack(
                    isFocusing: isFocusing,
                    themeState: themeState,
                    currentSeconds: isFocusing ? remainingSeconds : initialDuration,
                    totalSeconds: initialDuration,
                    onDurationChanged: onDurationChanged,
                    showSlider: !isFocusing,
                    enableCharacterIdleMotion: !isFocusing,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
