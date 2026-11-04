import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

interface MonthlyBudgetCardProps {
  amount?: string;
  onPress?: () => void;
}

export default function MonthlyBudgetCard({
  amount = '₹3,000.00',
  onPress,
}: MonthlyBudgetCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconBadge}>
          <MaterialCommunityIcons name="bullseye-arrow" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.label}>Monthly Budget</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#242428',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textColumn: {
    justifyContent: 'center',
  },
  label: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
