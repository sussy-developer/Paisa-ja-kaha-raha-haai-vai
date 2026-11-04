import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MonthNavigatorProps {
  currentPeriod: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function MonthNavigator({
  currentPeriod = 'November 2026',
  onPrevious,
  onNext,
}: MonthNavigatorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={onPrevious}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={18} color="#8E8E96" />
      </TouchableOpacity>

      <Text style={styles.periodText}>{currentPeriod}</Text>

      <TouchableOpacity
        style={styles.navButton}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-forward" size={18} color="#8E8E96" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  periodText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  navButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
