import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

interface ChartGlowHaloProps {
  size: number;
  glowColor?: string;
}

/**
 * Atmospheric breathing ambient glow behind the Donut Chart.
 * Adds dimensional luxury depth that illuminates behind the active segment.
 */
export default function ChartGlowHalo({
  size,
  glowColor = '#FF5E1E',
}: ChartGlowHaloProps) {
  const pulseAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0.18)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.32,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 0.85,
            duration: 2400,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.18,
            duration: 2400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [pulseAnim, opacityAnim]);

  const haloSize = size * 0.72;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.centerContainer}>
        <Animated.View
          style={[
            styles.halo,
            {
              width: haloSize,
              height: haloSize,
              borderRadius: haloSize / 2,
              backgroundColor: glowColor,
              opacity: opacityAnim,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halo: {
    shadowColor: '#FF5E1E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
});
