import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseListItem from './ExpenseListItem';
import EmptyExpensesView from './EmptyExpensesView';
import { ExpenseRecord } from '../types';

interface ExpenseListProps {
  expenses: ExpenseRecord[];
  onExpensePress?: (expense: ExpenseRecord) => void;
  onDeleteExpense?: (expense: ExpenseRecord) => void;
}

export default function ExpenseList({
  expenses,
  onExpensePress,
  onDeleteExpense,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return <EmptyExpensesView />;
  }

  return (
    <View style={styles.listContainer}>
      {expenses.map((expense) => (
        <ExpenseListItem
          key={expense.id}
          item={expense}
          onPress={onExpensePress}
          onDelete={onDeleteExpense}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
});
