import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileMenuItemData } from '../types';

interface ProfileMenuItemProps {
  item: ProfileMenuItemData;
  onPress: (item: ProfileMenuItemData) => void;
  showDivider?: boolean;
}

export default function ProfileMenuItem({
  item,
  onPress,
  showDivider = true,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, showDivider && styles.divider]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Ionicons name={item.iconName} size={22} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    marginRight: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
