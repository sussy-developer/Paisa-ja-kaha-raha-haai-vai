import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LiquidGlassView as NativeLiquidGlassView } from '@sbaiahmed1/react-native-blur';
import { BlurView as ExpoBlurView } from 'expo-blur';

export interface LiquidGlassCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glassType?: 'clear' | 'regular';
  glassTintColor?: string;
  glassOpacity?: number;
  blurAmount?: number;
}

/**
 * Liquid glass card component following https://github.com/sbaiahmed1/react-native-blur.
 *
 * Implements native liquid glass on supported platforms (iOS 26+ / Android 13+) via
 * @sbaiahmed1/react-native-blur, and provides a hardware-accelerated glassmorphic
 * fallback for Expo Go and Web.
 */
export default function LiquidGlassCard({
  children,
  style,
  glassType = 'clear',
  glassTintColor = '#000000',
  glassOpacity = 0.45,
  blurAmount = 65,
}: LiquidGlassCardProps) {
  // Check if native ReactNativeLiquidGlassView is registered in UIManager
  const isNativeGlassAvailable = useMemo(() => {
    try {
      if (Platform.OS === 'web') return false;
      return Boolean(
        UIManager.getViewManagerConfig &&
        (UIManager.getViewManagerConfig('ReactNativeLiquidGlassView') ||
          (UIManager as any).ReactNativeLiquidGlassView)
      );
    } catch {
      return false;
    }
  }, []);

  const overlayColor = useMemo(() => {
    return 'rgba(24, 24, 29, 0.55)';
  }, []);

  const webStyle: any = useMemo(() => {
    if (Platform.OS !== 'web') return null;
    return {
      backdropFilter: `blur(${blurAmount * 0.4}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blurAmount * 0.4}px) saturate(180%)`,
      backgroundColor: overlayColor,
    };
  }, [blurAmount, overlayColor]);

  // Use native liquid glass if view manager is registered
  if (isNativeGlassAvailable) {
    return (
      <NativeLiquidGlassView
        glassType={glassType}
        glassTintColor={glassTintColor}
        glassOpacity={glassOpacity}
        style={[styles.container, style]}
      >
        {children}
      </NativeLiquidGlassView>
    );
  }

  // Fallback for Expo Go and Web
  return (
    <View style={[styles.container, style, webStyle]}>
      {Platform.OS !== 'web' && (
        <>
          <ExpoBlurView
            intensity={blurAmount}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: overlayColor },
            ]}
          />
        </>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
});
