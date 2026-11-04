import React from 'react';
import { StyleSheet, View } from 'react-native';
import SummaryCard from './SummaryCard';

interface SummaryCardsRowProps {
  incomeAmount?: string;
  incomeTrend?: string;
  remainingAmount?: string;
  remainingTrend?: string;
  isEmpty?: boolean;
}

export default function SummaryCardsRow({
  incomeAmount = '₹0.00',
  incomeTrend = '+0%',
  remainingAmount = '₹0.00',
  remainingTrend = '+0%',
  isEmpty = false,
}: SummaryCardsRowProps) {
  const trendColor = isEmpty ? '#8E8E96' : '#10B981';

  return (
    <View style={styles.container}>
      <SummaryCard
        title="Income"
        amount={incomeAmount}
        trend={incomeTrend}
        trendColor={trendColor}
      />
      <SummaryCard
        title="Remaining"
        amount={remainingAmount}
        trend={remainingTrend}
        trendColor={trendColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
});
