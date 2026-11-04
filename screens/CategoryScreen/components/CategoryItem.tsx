import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryRadioButton from './CategoryRadioButton';
import { CategoryItemData } from '../types';

interface CategoryItemProps {
  item: CategoryItemData;
  isSelected: boolean;
  onSelect: (item: CategoryItemData) => void;
  showDivider?: boolean;
}

export default function CategoryItem({
  item,
  isSelected,
  onSelect,
  showDivider = true,
}: CategoryItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selectedCard : styles.unselectedRow,
        !isSelected && showDivider ? styles.divider : null,
      ]}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconBadge, { backgroundColor: item.badgeBgColor }]}>
          <Ionicons name={item.iconName} size={22} color={item.iconColor} />
        </View>
        <Text style={[styles.nameText, isSelected && styles.selectedNameText]}>
          {item.name}
        </Text>
      </View>

      <CategoryRadioButton isSelected={isSelected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  selectedCard: {
    backgroundColor: '#1E1813',
    borderWidth: 1.5,
    borderColor: '#FF6F1E',
    borderRadius: 20,
    paddingVertical: 12,
    marginVertical: 4,
  },
  unselectedRow: {
    paddingVertical: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 14,
  },
  selectedNameText: {
    fontWeight: '600',
  },
});
