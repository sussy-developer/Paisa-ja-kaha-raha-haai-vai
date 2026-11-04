import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseIconType } from '../types';

interface ExpenseItemBadgeProps {
  iconType: ExpenseIconType;
  bgColor: string;
  iconColor: string;
}

export default function ExpenseItemBadge({
  iconType,
  bgColor,
  iconColor,
}: ExpenseItemBadgeProps) {
  const renderIcon = () => {
    switch (iconType) {
      case 'coffee':
        return <Ionicons name="cafe" size={20} color={iconColor} />;
      case 'restaurant':
        return <Ionicons name="restaurant" size={20} color={iconColor} />;
      case 'shopping':
        return <Ionicons name="bag-handle" size={20} color={iconColor} />;
      case 'car':
        return <Ionicons name="car" size={20} color={iconColor} />;
      case 'electricity':
        return <Ionicons name="sparkles" size={20} color={iconColor} />;
      case 'netflix':
        return <Text style={styles.netflixText}>N</Text>;
      case 'groceries':
        return <Ionicons name="basket-outline" size={20} color={iconColor} />;
      default:
        return <Ionicons name="receipt-outline" size={20} color={iconColor} />;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      {renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  netflixText: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
