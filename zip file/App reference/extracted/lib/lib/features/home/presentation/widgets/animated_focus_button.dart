import 'dart:ui' as dart_ui;
import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/theme/theme_provider.dart';

class AnimatedFocusButton extends StatefulWidget {
  final bool isFocusing;
  final ThemeState themeState;
  final VoidCallback onTap;

  const AnimatedFocusButton({
    super.key,
    required this.isFocusing,
    required this.themeState,
    required this.onTap,
  });

  @override
  State<AnimatedFocusButton> createState() => _AnimatedFocusButtonState();
}

class _AnimatedFocusButtonState extends State<AnimatedFocusButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        vsync: this, 
        duration: const Duration(milliseconds: 150),
        reverseDuration: const Duration(milliseconds: 150)
    );
    _scaleAnim = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut)
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails details) => _controller.forward();
  void _onTapUp(TapUpDetails details) => _controller.reverse();
  void _onTapCancel() => _controller.reverse();

  Color _getButtonBaseColor() {
    if (widget.isFocusing) {
       return Colors.white.withOpacity(0.15); // Translucent when active
    }
    
    final isNight = widget.themeState.mode == AppThemeMode.night;
    // Unified Glass Material (White-based)
    if (isNight) {
       return Colors.white.withOpacity(0.12); // Slightly more visible for contrast
    } else {
       return Colors.white.withOpacity(0.25); // Airy, light glass
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _onTapDown,
      onTapUp: _onTapUp,
      onTapCancel: _onTapCancel,
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
           return Transform.scale(
             scale: _scaleAnim.value,
             child: child,
           );
        },
        child: ClipRRect(
          borderRadius: BorderRadius.circular(34),
          child: BackdropFilter(
            filter: dart_ui.ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 500), 
              width: widget.isFocusing ? 140 : 200,
              height: 68,
                decoration: BoxDecoration(
                  color: _getButtonBaseColor(),
                  borderRadius: BorderRadius.circular(34),
                  border: Border.all(
                    color: Colors.white.withOpacity(widget.isFocusing ? 0.2 : 0.4), 
                    width: 1.0
                  ), 
                  boxShadow: widget.isFocusing ? [] : [
                     BoxShadow(
                       color: Colors.black.withOpacity(0.03),
                       blurRadius: 10, 
                       offset: const Offset(0, 4), 
                     )
                  ],
                ),
              alignment: Alignment.center,
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                child: Text(
                  widget.isFocusing ? "Stop" : "Begin Focus",
                  key: ValueKey(widget.isFocusing),
                  style: AppTextStyles.subHeading.copyWith(
                    color: widget.themeState.mode == AppThemeMode.night ? Colors.white : const Color(0xFF5F6B7A),
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.5,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
