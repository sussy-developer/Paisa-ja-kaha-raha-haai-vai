import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BlurredCard from './BlurredCard';
import { ExpenseRecord } from '../types';

interface DeleteExpenseModalProps {
  visible: boolean;
  expense: ExpenseRecord | null;
  onCancel: () => void;
  onConfirmDelete: () => void;
}

export default function DeleteExpenseModal({
  visible,
  expense,
  onCancel,
  onConfirmDelete,
}: DeleteExpenseModalProps) {
  if (!expense) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          {/* Blurred backdrop behind popup */}
          <BlurredCard
            blurType="dark"
            blurAmount={35}
            overlayColor="rgba(0, 0, 0, 0.55)"
            style={StyleSheet.absoluteFill}
          />

          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <BlurredCard
              blurType="dark"
              blurAmount={60}
              overlayColor="rgba(22, 22, 27, 0.78)"
              style={styles.dialogCard}
            >
              {/* Warning Trash Icon Badge */}
              <View style={styles.iconCircle}>
                <Ionicons name="trash" size={26} color="#FF453A" />
              </View>

              {/* Title & Subtitle */}
              <Text style={styles.title}>Delete Expense</Text>
              <Text style={styles.subtitle}>
                Are you sure you want to remove this expense record? This action cannot be undone.
              </Text>

              {/* Expense Preview Card */}
              <View style={styles.expensePreviewCard}>
                <View style={styles.previewLeft}>
                  <Text style={styles.previewTitle} numberOfLines={1}>
                    {expense.title}
                  </Text>
                  <Text style={styles.previewDate}>{expense.date}</Text>
                </View>
                <Text style={styles.previewAmount}>{expense.amount}</Text>
              </View>

              {/* Action Buttons Row */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onCancel}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={onConfirmDelete}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="trash-outline"
                    size={17}
                    color="#FFFFFF"
                    style={styles.deleteButtonIcon}
                  />
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </BlurredCard>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialogCard: {
    width: '100%',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 69, 58, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 69, 58, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A0A0A8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  expensePreviewCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 22,
  },
  previewLeft: {
    flex: 1,
    marginRight: 12,
  },
  previewTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  previewDate: {
    color: '#8E8E96',
    fontSize: 12,
    fontWeight: '400',
  },
  previewAmount: {
    color: '#FF5E1E',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#FF3B30',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButtonIcon: {
    marginRight: 6,
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
