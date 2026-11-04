import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyExpensesViewProps {
  message?: string;
  subMessage?: string;
}

export default function EmptyExpensesView({
  message = 'No expenses found',
  subMessage = 'Try selecting another category or clearing your search.',
}: EmptyExpensesViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="receipt-outline" size={26} color="#8E8E96" />
      </View>
      <Text style={styles.title}>{message}</Text>
      <Text style={styles.subtitle}>{subMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    borderStyle: 'dashed',
    marginTop: 12,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#8E8E96',
    fontSize: 13,
    textAlign: 'center',
  },
});
