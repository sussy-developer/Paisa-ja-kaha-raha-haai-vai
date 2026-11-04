import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarDayCell from './CalendarDayCell';
import { CalendarDay, isSameDay } from '../types';

interface CalendarGridProps {
  year: number;
  month: number; // 0-11
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({
  year,
  month,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const today = new Date();

  // First day of current month
  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayIndex = firstDayOfMonth.getDay(); // 0 = Sunday

  // Days in current month
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

  // Days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  // Previous month trailing days
  for (let i = startingDayIndex - 1; i >= 0; i--) {
    const prevDate = new Date(year, month - 1, daysInPrevMonth - i);
    days.push({
      date: prevDate,
      dayNumber: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: isSameDay(prevDate, today),
      isSelected: isSameDay(prevDate, selectedDate),
    });
  }

  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const currDate = new Date(year, month, i);
    days.push({
      date: currDate,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(currDate, today),
      isSelected: isSameDay(currDate, selectedDate),
    });
  }

  // Next month leading days to complete the grid (multiple of 7)
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      dayNumber: i,
      isCurrentMonth: false,
      isToday: isSameDay(nextDate, today),
      isSelected: isSameDay(nextDate, selectedDate),
    });
  }

  // Split into weeks of 7 days
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.grid}>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => (
            <CalendarDayCell
              key={`${weekIndex}-${dayIndex}`}
              day={day}
              onSelect={onSelectDate}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: '#18181B',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 20,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
});
