import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DeleteIconButton from './DeleteIconButton';
import { Expense } from '../types';

interface ExpenseItemProps {
  item: Expense;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function ExpenseItem({ item, onPress, onDelete }: ExpenseItemProps) {
  const renderIcon = () => {
    switch (item.category) {
      case 'coffee':
        return <Ionicons name="cafe" size={20} color="#FFFFFF" />;
      case 'restaurant':
        return <Ionicons name="restaurant" size={20} color="#FFFFFF" />;
      case 'shopping':
        return <Ionicons name="bag-handle" size={20} color="#FFFFFF" />;
      default:
        return <Ionicons name="receipt-outline" size={20} color="#FFFFFF" />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onDelete || onPress}
      activeOpacity={0.7}
      disabled={!onPress && !onDelete}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
          {renderIcon()}
        </View>
        <View style={styles.textSection}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>{item.amount}</Text>
        {onDelete && <DeleteIconButton onPress={onDelete} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textSection: {
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  date: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '400',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
