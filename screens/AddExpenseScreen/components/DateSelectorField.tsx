import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DateSelectorFieldProps {
  formattedDate: string;
  onPress: () => void;
}

export default function DateSelectorField({
  formattedDate,
  onPress,
}: DateSelectorFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftSection}>
          <View style={styles.iconBadge}>
            <Ionicons name="calendar-outline" size={20} color="#9E9EA7" />
          </View>
          <Text style={styles.dateText}>{formattedDate}</Text>
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
    backgroundColor: '#242428',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 14,
  },
});
