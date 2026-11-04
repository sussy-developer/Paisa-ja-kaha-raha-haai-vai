import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GlassShimmerSweepProps {
  delay?: number;
  duration?: number;
}

/**
 * Specular light sheen that glides diagonally across the glass card.
 * Simulates high-end optical glass reflection.
 */
export default function GlassShimmerSweep({
  delay = 400,
  duration = 1400,
}: GlassShimmerSweepProps) {
  const sweepAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(sweepAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, sweepAnim]);

  const translateX = sweepAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 0.8, SCREEN_WIDTH * 1.2],
  });

  const opacity = sweepAnim.interpolate({
    inputRange: [0, 0.15, 0.7, 1],
    outputRange: [0, 0.7, 0.7, 0],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.maskContainer}>
        <Animated.View
          style={[
            styles.sheenBeam,
            {
              opacity,
              transform: [
                { translateX },
                { rotate: '25deg' },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maskContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRadius: 22,
  },
  sheenBeam: {
    width: 60,
    height: 350,
    position: 'absolute',
    top: -100,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
});
