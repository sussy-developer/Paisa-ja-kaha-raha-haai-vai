import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';

const AnimatedWord = ({ word, delay, hasSpace }: { word: string, delay: number, hasSpace?: boolean }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, delay]);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Text style={styles.titleText}>{word}{hasSpace ? ' ' : ''}</Text>
    </Animated.View>
  );
};

export default function Title() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AnimatedWord word="Check" delay={0} hasSpace />
        <AnimatedWord word="Your" delay={300} />
      </View>
      <View style={styles.row}>
        <AnimatedWord word="Daily" delay={600} />
      </View>
      <View style={styles.row}>
        <AnimatedWord word="Expenses" delay={900} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container for the whole title
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'left',
    lineHeight: 48,
    letterSpacing: -2,
  },
});
