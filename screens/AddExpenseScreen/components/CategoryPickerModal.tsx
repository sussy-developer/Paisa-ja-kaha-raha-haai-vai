import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryOption } from '../types';

interface CategoryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: CategoryOption) => void;
  selectedCategory: CategoryOption;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    iconName: 'restaurant',
    iconColor: '#D97706',
    badgeBgColor: '#2C1F18',
  },
  {
    id: 'coffee',
    name: 'Coffee & Snacks',
    iconName: 'cafe',
    iconColor: '#C2884A',
    badgeBgColor: '#342318',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    iconName: 'bag-handle',
    iconColor: '#C084FC',
    badgeBgColor: '#3E1E42',
  },
  {
    id: 'transport',
    name: 'Transportation',
    iconName: 'car',
    iconColor: '#60A5FA',
    badgeBgColor: '#1A2942',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    iconName: 'game-controller',
    iconColor: '#F472B6',
    badgeBgColor: '#381A2A',
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    iconName: 'flash',
    iconColor: '#FBBF24',
    badgeBgColor: '#2E2818',
  },
  {
    id: 'other',
    name: 'General / Other',
    iconName: 'receipt-outline',
    iconColor: '#9CA3AF',
    badgeBgColor: '#26262B',
  },
];

export default function CategoryPickerModal({
  visible,
  onClose,
  onSelectCategory,
  selectedCategory,
}: CategoryPickerModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Category</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {CATEGORY_OPTIONS.map((item) => {
              const isSelected = item.id === selectedCategory.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.optionItem, isSelected && styles.selectedOptionItem]}
                  onPress={() => {
                    onSelectCategory(item);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.optionBadge, { backgroundColor: item.badgeBgColor }]}>
                      <Ionicons name={item.iconName} size={20} color={item.iconColor} />
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                      {item.name}
                    </Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={22} color="#FF5E1E" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#18181B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsList: {
    marginTop: 4,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
  },
  selectedOptionItem: {
    backgroundColor: 'rgba(255, 94, 30, 0.12)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
