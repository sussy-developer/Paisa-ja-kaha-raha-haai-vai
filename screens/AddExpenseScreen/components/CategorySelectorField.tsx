import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryOption } from '../types';

interface CategorySelectorFieldProps {
  selectedCategory: CategoryOption;
  onPress: () => void;
}

export default function CategorySelectorField({
  selectedCategory,
  onPress,
}: CategorySelectorFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: selectedCategory.badgeBgColor },
            ]}
          >
            <Ionicons
              name={selectedCategory.iconName}
              size={20}
              color={selectedCategory.iconColor}
            />
          </View>
          <Text style={styles.categoryName}>{selectedCategory.name}</Text>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  fieldContainer: {
    backgroundColor: '#18181B',
    borderRadius: 18,
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 14,
  },
});
