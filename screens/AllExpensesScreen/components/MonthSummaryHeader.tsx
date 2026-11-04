import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface MonthSummaryHeaderProps {
  monthTitle?: string;
  totalAmount?: string;
}

export default function MonthSummaryHeader({
  monthTitle = 'November 2026',
  totalAmount = '-₹1,240.50',
}: MonthSummaryHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>{monthTitle}</Text>
      <Text style={styles.totalAmount}>{totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  monthTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  totalAmount: {
    color: '#8E8E96',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
});
