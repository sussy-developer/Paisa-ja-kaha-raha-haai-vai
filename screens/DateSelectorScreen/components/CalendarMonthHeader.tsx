import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MONTH_NAMES } from '../types';

interface CalendarMonthHeaderProps {
  currentMonth: number; // 0-11
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarMonthHeader({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
}: CalendarMonthHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>
        {MONTH_NAMES[currentMonth]} {currentYear}
      </Text>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onPreviousMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={onNextMonth}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  monthTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E1E22',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
});
