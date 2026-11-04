import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CategoryBreakdownItem } from '../types';

interface CategoryBreakdownRowProps {
  item: CategoryBreakdownItem;
  isSelected?: boolean;
  onPress?: (item: CategoryBreakdownItem) => void;
}

export default function CategoryBreakdownRow({
  item,
  isSelected = false,
  onPress,
}: CategoryBreakdownRowProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress ? () => onPress(item) : undefined}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        <View
          style={[
            styles.colorDot,
            { backgroundColor: item.dotColor },
            isSelected && styles.selectedColorDot,
          ]}
        />
        <Text style={[styles.nameText, isSelected && styles.selectedNameText]}>
          {item.name}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.percentageText, isSelected && styles.selectedPercentageText]}>
          {item.percentage}%
        </Text>
        <Text style={[styles.amountText, isSelected && { color: item.chartColor }]}>
          {item.amount}
        </Text>
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
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  selectedColorDot: {
    transform: [{ scale: 1.25 }],
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  nameText: {
    color: '#E5E7EB',
    fontSize: 15,
    fontWeight: '500',
  },
  selectedNameText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageText: {
    color: '#8E8E96',
    fontSize: 14,
    fontWeight: '400',
    minWidth: 46,
    textAlign: 'right',
    marginRight: 16,
  },
  selectedPercentageText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  amountText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
    minWidth: 80,
    textAlign: 'right',
  },
});
