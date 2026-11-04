import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ExpenseItem from './ExpenseItem';
import EmptyExpensesState from './EmptyExpensesState';
import AnimatedExpenseRow from './AnimatedExpenseRow';
import { Expense } from '../types';

interface RecentExpensesSectionProps {
  expenses: Expense[];
  maxItems?: number;
  onSeeAllPress?: () => void;
  onExpensePress?: (expense: Expense) => void;
  onDeleteExpense?: (expense: Expense) => void;
}

export default function RecentExpensesSection({
  expenses,
  maxItems = 5,
  onSeeAllPress,
  onExpensePress,
  onDeleteExpense,
}: RecentExpensesSectionProps) {
  const hasExpenses = expenses && expenses.length > 0;
  const displayedExpenses = hasExpenses ? expenses.slice(0, maxItems) : [];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Recent Expenses</Text>
        {hasExpenses && (
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {hasExpenses ? (
        <View style={styles.listContainer}>
          {displayedExpenses.map((expense, index) => (
            <AnimatedExpenseRow
              key={expense.id}
              index={index}
              baseDelay={260}
            >
              <ExpenseItem
                item={expense}
                onPress={onExpensePress ? () => onExpensePress(expense) : undefined}
                onDelete={onDeleteExpense ? () => onDeleteExpense(expense) : undefined}
              />
            </AnimatedExpenseRow>
          ))}
        </View>
      ) : (
        <EmptyExpensesState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  seeAllText: {
    color: '#FF6F1E',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 4,
  },
});
