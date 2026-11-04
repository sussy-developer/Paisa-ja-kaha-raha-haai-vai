import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LiquidGlassCard from './LiquidGlassCard';
import { TimeRange, TIME_RANGE_OPTIONS } from '../types';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onSelectRange: (range: TimeRange) => void;
}

export default function TimeRangeSelector({
  selectedRange,
  onSelectRange,
}: TimeRangeSelectorProps) {
  return (
    <LiquidGlassCard style={styles.container}>
      {TIME_RANGE_OPTIONS.map((option) => {
        const isActive = selectedRange === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.segment, isActive && styles.activeSegment]}
            onPress={() => onSelectRange(option.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.segmentText, isActive && styles.activeSegmentText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </LiquidGlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 20,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeSegment: {
    backgroundColor: '#FF5E1E',
  },
  segmentText: {
    color: '#8E8E96',
    fontSize: 14,
    fontWeight: '500',
  },
  activeSegmentText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
