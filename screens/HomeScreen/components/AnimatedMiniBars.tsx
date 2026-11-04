import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

interface AnimatedMiniBarsProps {
  color?: string;
  isEmpty?: boolean;
}

/**
 * Dynamic financial waveform that plays a satisfying staggered spring entrance
 * once when navigating to the Home screen, then settles into its resting state.
 * No constant background looping.
 */
export default function AnimatedMiniBars({
  color = '#FF5E1E',
  isEmpty = false,
}: AnimatedMiniBarsProps) {
  // Target heights for the 4 equalizer bars
  const targetHeights = isEmpty ? [8, 12, 10, 14] : [16, 32, 22, 40];

  const barAnim1 = useRef(new Animated.Value(4)).current;
  const barAnim2 = useRef(new Animated.Value(4)).current;
  const barAnim3 = useRef(new Animated.Value(4)).current;
  const barAnim4 = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    // Reset to base height on navigation
    barAnim1.setValue(4);
    barAnim2.setValue(4);
    barAnim3.setValue(4);
    barAnim4.setValue(4);

    // Staggered spring wave entrance that surges up and cleanly locks into place
    const anims = [
      Animated.spring(barAnim1, {
        toValue: targetHeights[0],
        friction: 6,
        tension: 80,
        useNativeDriver: false,
      }),
      Animated.spring(barAnim2, {
        toValue: targetHeights[1],
        friction: 5.5,
        tension: 80,
        useNativeDriver: false,
      }),
      Animated.spring(barAnim3, {
        toValue: targetHeights[2],
        friction: 6,
        tension: 80,
        useNativeDriver: false,
      }),
      Animated.spring(barAnim4, {
        toValue: targetHeights[3],
        friction: 5,
        tension: 80,
        useNativeDriver: false,
      }),
    ];

    const entranceWave = Animated.stagger(85, anims);
    entranceWave.start();

    return () => {
      entranceWave.stop();
    };
  }, [isEmpty]);

  const activeColor = isEmpty ? 'rgba(255, 94, 30, 0.25)' : color;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          { height: barAnim1, backgroundColor: activeColor },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          { height: barAnim2, backgroundColor: activeColor },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          { height: barAnim3, backgroundColor: activeColor },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          { height: barAnim4, backgroundColor: activeColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    height: 44,
    paddingBottom: 2,
    paddingRight: 4,
  },
  bar: {
    width: 7,
    borderRadius: 3.5,
  },
});
