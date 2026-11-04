import React from 'react';
import { StyleSheet, View } from 'react-native';

interface MiniBarChartProps {
  color?: string;
  isEmpty?: boolean;
}

export default function MiniBarChart({
  color = '#FF6F1E',
  isEmpty = false,
}: MiniBarChartProps) {
  const activeColor = isEmpty ? 'rgba(255, 111, 30, 0.25)' : color;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          isEmpty ? styles.barEmpty1 : styles.barShort,
          { backgroundColor: activeColor },
        ]}
      />
      <View
        style={[
          styles.bar,
          isEmpty ? styles.barEmpty2 : styles.barMedium,
          { backgroundColor: activeColor },
        ]}
      />
      <View
        style={[
          styles.bar,
          isEmpty ? styles.barEmpty3 : styles.barTall,
          { backgroundColor: activeColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 44,
    paddingBottom: 2,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barShort: {
    height: 14,
  },
  barMedium: {
    height: 26,
  },
  barTall: {
    height: 38,
  },
  barEmpty1: {
    height: 6,
  },
  barEmpty2: {
    height: 8,
  },
  barEmpty3: {
    height: 10,
  },
});
