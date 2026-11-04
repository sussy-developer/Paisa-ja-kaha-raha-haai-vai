import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatFullDate, isSameDay } from '../types';

interface SelectedDatePreviewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function SelectedDatePreview({
  selectedDate,
  onSelectDate,
}: SelectedDatePreviewProps) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSelectedToday = isSameDay(selectedDate, today);
  const isSelectedYesterday = isSameDay(selectedDate, yesterday);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.iconBadge}>
          <Ionicons name="calendar-outline" size={20} color="#FF6F1E" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.label}>Selected Date</Text>
          <Text style={styles.fullDate}>{formatFullDate(selectedDate)}</Text>
        </View>
      </View>

      <View style={styles.quickChipsRow}>
        <TouchableOpacity
          style={[styles.chip, isSelectedToday && styles.activeChip]}
          onPress={() => onSelectDate(today)}
          activeOpacity={0.7}
        >
          <Text style={[styles.chipText, isSelectedToday && styles.activeChipText]}>
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.chip, isSelectedYesterday && styles.activeChip]}
          onPress={() => onSelectDate(yesterday)}
          activeOpacity={0.7}
        >
          <Text style={[styles.chipText, isSelectedYesterday && styles.activeChipText]}>
            Yesterday
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181B',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 111, 30, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textColumn: {
    flex: 1,
  },
  label: {
    color: '#8E8E96',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  fullDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickChipsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
  },
  chip: {
    backgroundColor: '#242428',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  activeChip: {
    backgroundColor: '#FF5E1E',
  },
  chipText: {
    color: '#A0A0A5',
    fontSize: 13,
    fontWeight: '500',
  },
  activeChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
