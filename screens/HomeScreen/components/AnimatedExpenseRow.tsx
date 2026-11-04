import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface AnimatedExpenseRowProps {
  index: number;
  baseDelay?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Cascading entry wrapper for individual expense items.
 * Creates an elegant waterfall slide-and-fade entrance effect.
 */
export default function AnimatedExpenseRow({
  index,
  baseDelay = 280,
  children,
  style,
}: AnimatedExpenseRowProps) {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const delay = baseDelay + index * 55;
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          friction: 8,
          tension: 70,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [index, baseDelay, opacityAnim, translateYAnim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: opacityAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
