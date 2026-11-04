import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CalendarDay } from '../types';

interface CalendarDayCellProps {
  day: CalendarDay;
  onSelect: (date: Date) => void;
}

export default function CalendarDayCell({ day, onSelect }: CalendarDayCellProps) {
  const handlePress = () => {
    onSelect(day.date);
  };

  return (
    <View style={styles.cellWrapper}>
      <TouchableOpacity
        style={[
          styles.cell,
          day.isSelected && styles.selectedCell,
          day.isToday && !day.isSelected && styles.todayCell,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            !day.isCurrentMonth && styles.otherMonthText,
            day.isSelected && styles.selectedDayText,
            day.isToday && !day.isSelected && styles.todayDayText,
          ]}
        >
          {day.dayNumber}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cellWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  cell: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCell: {
    backgroundColor: '#FF5E1E',
    shadowColor: '#FF5E1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  todayCell: {
    borderWidth: 1.5,
    borderColor: '#FF6F1E',
    backgroundColor: 'rgba(255, 111, 30, 0.12)',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  otherMonthText: {
    color: '#3F3F46',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  todayDayText: {
    color: '#FF6F1E',
    fontWeight: '600',
  },
});
