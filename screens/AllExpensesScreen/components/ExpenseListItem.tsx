import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ExpenseItemBadge from './ExpenseItemBadge';
import DeleteIconButton from './DeleteIconButton';
import { ExpenseRecord } from '../types';

interface ExpenseListItemProps {
  item: ExpenseRecord;
  onPress?: (item: ExpenseRecord) => void;
  onDelete?: (item: ExpenseRecord) => void;
}

export default function ExpenseListItem({ item, onPress, onDelete }: ExpenseListItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress ? () => onPress(item) : undefined}
      onLongPress={onDelete ? () => onDelete(item) : undefined}
      activeOpacity={0.7}
      disabled={!onPress && !onDelete}
    >
      <View style={styles.leftSection}>
        <ExpenseItemBadge
          iconType={item.iconType}
          bgColor={item.iconBgColor}
          iconColor={item.iconColor}
        />
        <View style={styles.textSection}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>{item.amount}</Text>
        {onDelete && <DeleteIconButton onPress={() => onDelete(item)} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
