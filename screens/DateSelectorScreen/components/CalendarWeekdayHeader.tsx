import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WEEKDAYS } from '../types';

export default function CalendarWeekdayHeader() {
  return (
    <View style={styles.container}>
      {WEEKDAYS.map((day, index) => (
        <View key={index} style={styles.dayCell}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
