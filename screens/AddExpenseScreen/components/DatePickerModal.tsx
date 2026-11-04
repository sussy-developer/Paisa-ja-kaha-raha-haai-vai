import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (formattedDate: string, rawDate: Date) => void;
  currentDate: string;
}

export default function DatePickerModal({
  visible,
  onClose,
  onSelectDate,
  currentDate,
}: DatePickerModalProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);

  const quickDates = [
    { label: 'Today', date: today, formatted: formatDate(today) },
    { label: 'Yesterday', date: yesterday, formatted: formatDate(yesterday) },
    { label: '2 Days Ago', date: twoDaysAgo, formatted: formatDate(twoDaysAgo) },
    { label: '3 Days Ago', date: threeDaysAgo, formatted: formatDate(threeDaysAgo) },
  ];

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
            <Text style={styles.headerTitle}>Select Date</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsList}>
            {quickDates.map((item, index) => {
              const isSelected = currentDate === item.formatted;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateItem, isSelected && styles.selectedDateItem]}
                  onPress={() => {
                    onSelectDate(item.formatted, item.date);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={[styles.dateLabel, isSelected && styles.selectedDateLabel]}>
                      {item.label}
                    </Text>
                    <Text style={styles.dateFormatted}>{item.formatted}</Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={22} color="#FF5E1E" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
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
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 6,
  },
  selectedDateItem: {
    backgroundColor: 'rgba(255, 94, 30, 0.12)',
  },
  dateLabel: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  selectedDateLabel: {
    color: '#FF5E1E',
  },
  dateFormatted: {
    color: '#8E8E96',
    fontSize: 13,
  },
});
