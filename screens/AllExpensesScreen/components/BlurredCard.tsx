import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  UIManager,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { BlurView as NativeBlurView } from '@sbaiahmed1/react-native-blur';
import { BlurView as ExpoBlurView } from 'expo-blur';

export interface BlurredCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  blurType?:
    | 'xlight'
    | 'light'
    | 'dark'
    | 'extraDark'
    | 'regular'
    | 'prominent';
  blurAmount?: number;
  overlayColor?: string;
}

/**
 * Modern blurred card component following https://github.com/sbaiahmed1/react-native-blur.
 */
export default function BlurredCard({
  children,
  style,
  blurType = 'dark',
  blurAmount = 50,
  overlayColor = 'rgba(24, 24, 27, 0.65)',
}: BlurredCardProps) {
  const isNativeBlurAvailable = useMemo(() => {
    try {
      if (Platform.OS === 'web') return false;
      return Boolean(
        UIManager.getViewManagerConfig &&
        (UIManager.getViewManagerConfig('ReactNativeBlurView') ||
          (UIManager as any).ReactNativeBlurView)
      );
    } catch {
      return false;
    }
  }, []);

  const webStyle: any = useMemo(() => {
    if (Platform.OS !== 'web') return null;
    return {
      backdropFilter: `blur(${blurAmount * 0.4}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blurAmount * 0.4}px) saturate(180%)`,
      backgroundColor: overlayColor,
    };
  }, [blurAmount, overlayColor]);

  if (isNativeBlurAvailable) {
    return (
      <NativeBlurView
        blurType={blurType}
        blurAmount={blurAmount}
        overlayColor={overlayColor}
        style={[styles.container, style]}
      >
        {children}
      </NativeBlurView>
    );
  }

  return (
    <View style={[styles.container, style, webStyle]}>
      {Platform.OS !== 'web' && (
        <>
          <ExpoBlurView
            intensity={blurAmount}
            tint={blurType === 'dark' || blurType === 'extraDark' ? 'dark' : 'default'}
            style={StyleSheet.absoluteFill}
          />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} />
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
