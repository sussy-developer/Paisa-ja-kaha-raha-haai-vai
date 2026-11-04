import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AllExpensesBackground from './components/AllExpensesBackground';
import AllExpensesHeader from './components/AllExpensesHeader';
import SearchInputBar from './components/SearchInputBar';
import CategoryFilterBar from './components/CategoryFilterBar';
import MonthSummaryHeader from './components/MonthSummaryHeader';
import ExpenseList from './components/ExpenseList';
import DeleteExpenseModal from './components/DeleteExpenseModal';
import BottomNavigationBar from '../HomeScreen/components/BottomNavigationBar';
import { TabKey } from '../HomeScreen/types';
import {
  ExpenseRecord,
  FILTER_CATEGORIES,
  formatCurrentMonthYear,
} from './types';

interface AllExpensesScreenProps {
  expenses?: ExpenseRecord[];
  onDeleteExpense?: (id: string) => void;
  onTabChange?: (tab: TabKey) => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export default function AllExpensesScreen({
  expenses = [],
  onDeleteExpense,
  onTabChange,
  onBackPress,
  showBackButton = false,
}: AllExpensesScreenProps) {
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<ExpenseRecord | null>(null);

  // Filter expenses by category and search query
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Category match
      const matchesCategory =
        activeCategoryId === 'all' || expense.category.toLowerCase() === activeCategoryId.toLowerCase();

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        expense.title.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.amount.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [expenses, activeCategoryId, searchQuery]);

  // Compute total for filtered list (real sum)
  const totalSum = useMemo(() => {
    if (filteredExpenses.length === 0) {
      return '-₹0.00';
    }
    const sum = filteredExpenses.reduce((acc, curr) => acc + curr.numericAmount, 0);
    return `-₹${sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [filteredExpenses]);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setSearchQuery('');
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handlePromptDelete = (item: ExpenseRecord) => {
    setExpenseToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete && onDeleteExpense) {
      onDeleteExpense(expenseToDelete.id);
    }
    setExpenseToDelete(null);
  };

  const currentMonth = formatCurrentMonthYear();

  return (
    <AllExpensesBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Navigation Header: Centered Title & Search Icon */}
            <AllExpensesHeader
              onSearchPress={handleSearchToggle}
              onBackPress={onBackPress}
              showBackButton={showBackButton}
            />

            {/* Optional Search Bar when toggled */}
            {isSearchOpen && (
              <SearchInputBar
                searchQuery={searchQuery}
                onChangeSearch={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            )}

            {/* Filter Pills Bar: All, Food, Shopping, Transport, etc. */}
            <CategoryFilterBar
              categories={FILTER_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />

            {/* Month Header: Current Month and real sum */}
            <MonthSummaryHeader
              monthTitle={currentMonth}
              totalAmount={totalSum}
            />

            {/* Scrollable List of Expenses or Empty View */}
            <ExpenseList
              expenses={filteredExpenses}
              onExpensePress={handlePromptDelete}
              onDeleteExpense={handlePromptDelete}
            />
          </ScrollView>

          {/* Delete Expense Confirmation Modal */}
          <DeleteExpenseModal
            visible={!!expenseToDelete}
            expense={expenseToDelete}
            onCancel={() => setExpenseToDelete(null)}
            onConfirmDelete={handleConfirmDelete}
          />

          {/* Bottom Tab Bar with "Expenses" active */}
          <BottomNavigationBar
            activeTab="expenses"
            onTabChange={(tab) => {
              if (onTabChange) {
                onTabChange(tab);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </AllExpensesBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
