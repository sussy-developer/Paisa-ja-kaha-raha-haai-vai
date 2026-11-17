import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut, fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import {
  syncAndLoadExpenses,
  persistNewExpense,
  removeExpense,
} from '../../services/expenseSyncService';
import DashboardBackground from './components/DashboardBackground';
import GreetingHeader from './components/GreetingHeader';
import TotalExpensesCard from './components/TotalExpensesCard';
import SummaryCardsRow from './components/SummaryCardsRow';
import RecentExpensesSection from './components/RecentExpensesSection';
import AddExpenseButton from './components/AddExpenseButton';
import BottomNavigationBar from './components/BottomNavigationBar';
import DeleteExpenseModal from './components/DeleteExpenseModal';
import DashboardEntranceWrapper from './components/DashboardEntranceWrapper';
import AddExpenseScreen from '../AddExpenseScreen/AddExpenseScreen';
import AllExpensesScreen from '../AllExpensesScreen/AllExpensesScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AnalyticsScreen from '../AnalyticsScreen/AnalyticsScreen';
import { ExpenseFormData } from '../AddExpenseScreen/types';
import { ExpenseRecord } from '../AllExpensesScreen/types';
import { Expense, TabKey } from './types';

interface HomeScreenProps {
  onLogoutSuccess: () => void;
  onNavigateToAddExpense?: () => void;
}

const STORAGE_KEY = '@user_expenses_list';
const CUSTOM_NAME_KEY = '@custom_user_name';

export default function HomeScreen({
  onLogoutSuccess,
  onNavigateToAddExpense,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [isAddExpenseVisible, setIsAddExpenseVisible] = useState(false);

  // Real data state (starts completely empty, zero dummy data)
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomeAmount, setIncomeAmount] = useState('₹0.00');
  const [totalExpensesAmount, setTotalExpensesAmount] = useState('₹0.00');
  const [remainingAmount, setRemainingAmount] = useState('₹0.00');
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // First check if user customized their name locally
      const savedName = await AsyncStorage.getItem(CUSTOM_NAME_KEY);
      if (savedName) {
        setUserName(savedName);
      }

      // Fetch current authenticated user
      let uid = '';
      try {
        const currentUser = await getCurrentUser();
        if (currentUser?.userId) {
          uid = currentUser.userId;
          setCurrentUserId(uid);
        }
      } catch (authErr) {
        console.log('User not signed in or offline:', authErr);
      }

      // Then fetch Cognito attributes
      try {
        const attributes = await fetchUserAttributes();
        if (!savedName && attributes.name) {
          setUserName(attributes.name);
        } else if (!savedName && attributes.email) {
          setUserName(attributes.email.split('@')[0]);
        }
        if (attributes.email) {
          setUserEmail(attributes.email);
        }
      } catch (attrErr) {
        console.log('Unable to load user attributes:', attrErr);
      }

      // Load expenses from local storage and sync with cloud DynamoDB
      await loadExpenses(uid);
    } catch (error) {
      console.log('Error initializing user data:', error);
      await loadExpenses('');
    }
  };

  const loadExpenses = async (uid?: string) => {
    try {
      const activeUid = uid !== undefined ? uid : currentUserId;
      const loaded = await syncAndLoadExpenses(activeUid);
      const normalized: Expense[] = loaded.map((item) => ({
        ...item,
        amount: item.amount.replace('$', '₹'),
      }));
      setExpenses(normalized);

      const total = normalized.reduce((sum, item) => {
        const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
        return sum + numeric;
      }, 0);

      setTotalExpensesAmount(`₹${total.toFixed(2)}`);
    } catch (error) {
      console.log('Unable to load stored expenses:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onLogoutSuccess();
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Unable to sign out. Please try again.');
    }
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const handleAddExpensePress = () => {
    if (onNavigateToAddExpense) {
      onNavigateToAddExpense();
    } else {
      setIsAddExpenseVisible(true);
    }
  };

  const handleSaveExpense = async (newExpenseData: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: newExpenseData.description || newExpenseData.category.name,
      date: newExpenseData.date,
      amount: `-₹${newExpenseData.amount}`,
      category: newExpenseData.category.id,
      iconBgColor: newExpenseData.category.badgeBgColor,
    };

    // Persist to local AsyncStorage and sync to DynamoDB cloud database
    const updatedExpenses = await persistNewExpense(newExpense, currentUserId, expenses);
    setExpenses(updatedExpenses);

    // Calculate updated total expenses
    const newTotal = updatedExpenses.reduce((sum, item) => {
      const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
      return sum + numeric;
    }, 0);

    setTotalExpensesAmount(`₹${newTotal.toFixed(2)}`);
    setIsAddExpenseVisible(false);
  };

  const handleSeeAll = () => {
    setActiveTab('expenses');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'You have no new notifications.');
  };

  const handleDeleteExpense = async (id: string) => {
    // Delete from local storage and sync delete to DynamoDB cloud database
    const updatedExpenses = await removeExpense(id, expenses);
    setExpenses(updatedExpenses);

    const newTotal = updatedExpenses.reduce((sum, item) => {
      const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
      return sum + numeric;
    }, 0);

    setTotalExpensesAmount(`₹${newTotal.toFixed(2)}`);
    setExpenseToDelete(null);
  };

  const handlePromptDelete = (item: Expense) => {
    setExpenseToDelete(item);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      handleDeleteExpense(expenseToDelete.id);
    }
  };

  // Convert real expenses to ExpenseRecord format for AllExpensesScreen
  const allExpenseRecords: ExpenseRecord[] = expenses.map((item) => {
    const numeric = parseFloat(item.amount.replace(/[^0-9.]/g, '')) || 0;
    return {
      id: item.id,
      title: item.title,
      date: item.date,
      amount: item.amount,
      numericAmount: numeric,
      category: item.category || 'other',
      iconType: (item.category as any) || 'other',
      iconBgColor: item.iconBgColor || '#352115',
      iconColor: '#FFFFFF',
    };
  });

  // If Add Expense screen is active, render it
  if (isAddExpenseVisible) {
    return (
      <AddExpenseScreen
        onBack={() => setIsAddExpenseVisible(false)}
        onSaveExpense={handleSaveExpense}
      />
    );
  }

  // If "Expenses" tab is selected, render All Expenses screen with real data
  if (activeTab === 'expenses') {
    return (
      <AllExpensesScreen
        expenses={allExpenseRecords}
        onDeleteExpense={handleDeleteExpense}
        onTabChange={handleTabChange}
        onBackPress={() => setActiveTab('home')}
        showBackButton={true}
      />
    );
  }

  // If "Analytics" tab is selected, render Analytics screen with real data
  if (activeTab === 'analytics') {
    return (
      <AnalyticsScreen
        expenses={expenses}
        onTabChange={handleTabChange}
      />
    );
  }

  // If "Profile" tab is selected, render Profile screen with username change capability
  if (activeTab === 'profile') {
    return (
      <ProfileScreen
        userName={userName}
        userEmail={userEmail}
        onUpdateUsername={(newName) => setUserName(newName)}
        onLogout={handleLogout}
        onTabChange={handleTabChange}
        onBackPress={() => setActiveTab('home')}
        showBackButton={true}
      />
    );
  }

  const isEmpty = expenses.length === 0;

  return (
    <DashboardBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header: Greeting, dynamic user name from Cognito, notification bell */}
            <DashboardEntranceWrapper delay={40}>
              <GreetingHeader
                userName={userName || 'User'}
                onNotificationPress={handleNotificationPress}
              />
            </DashboardEntranceWrapper>

            {/* Total Expenses Card with ambient halo, rolling counter, & equalizer bars */}
            <DashboardEntranceWrapper delay={120}>
              <TotalExpensesCard
                label="Total Expenses"
                amount={totalExpensesAmount}
                trend={isEmpty ? '0%' : `+${expenses.length}`}
                comparisonText={isEmpty ? 'no expenses yet' : 'total items'}
                isEmpty={isEmpty}
              />
            </DashboardEntranceWrapper>

            {/* Side-by-side Summary Cards: Income & Remaining */}
            <DashboardEntranceWrapper delay={200}>
              <SummaryCardsRow
                incomeAmount={incomeAmount}
                incomeTrend="0%"
                remainingAmount={remainingAmount}
                remainingTrend="0%"
                isEmpty={isEmpty}
              />
            </DashboardEntranceWrapper>

            {/* Recent Expenses List / Empty State with waterfall cascade */}
            <DashboardEntranceWrapper delay={280}>
              <RecentExpensesSection
                expenses={expenses}
                onSeeAllPress={handleSeeAll}
                onExpensePress={handlePromptDelete}
                onDeleteExpense={handlePromptDelete}
              />
            </DashboardEntranceWrapper>

            {/* Action Button: + Add Expense with spring pop */}
            <DashboardEntranceWrapper delay={360}>
              <AddExpenseButton onPress={handleAddExpensePress} />
            </DashboardEntranceWrapper>
          </ScrollView>

          {/* Delete Expense Confirmation Modal */}
          <DeleteExpenseModal
            visible={!!expenseToDelete}
            expense={expenseToDelete}
            onCancel={() => setExpenseToDelete(null)}
            onConfirmDelete={handleConfirmDelete}
          />

          {/* Bottom Tab Bar */}
          <BottomNavigationBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </View>
      </SafeAreaView>
    </DashboardBackground>
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
    paddingTop: 16,
    paddingBottom: 24,
  },
});
