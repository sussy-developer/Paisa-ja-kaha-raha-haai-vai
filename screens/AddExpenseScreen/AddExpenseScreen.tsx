import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import AddExpenseBackground from './components/AddExpenseBackground';
import AddExpenseHeader from './components/AddExpenseHeader';
import AmountInputField from './components/AmountInputField';
import CategorySelectorField from './components/CategorySelectorField';
import DateSelectorField from './components/DateSelectorField';
import DescriptionInputField from './components/DescriptionInputField';
import SaveExpenseButton from './components/SaveExpenseButton';
import CategoryScreen from '../CategoryScreen/CategoryScreen';
import DateSelectorScreen from '../DateSelectorScreen/DateSelectorScreen';
import { CATEGORIES_DATA } from '../CategoryScreen/types';
import { formatDisplayDate } from '../DateSelectorScreen/types';
import { CategoryOption, ExpenseFormData } from './types';

interface AddExpenseScreenProps {
  onBack: () => void;
  onSaveExpense?: (expense: ExpenseFormData) => void;
}

export default function AddExpenseScreen({
  onBack,
  onSaveExpense,
}: AddExpenseScreenProps) {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(CATEGORIES_DATA[0]);
  const [rawDate, setRawDate] = useState<Date>(() => new Date());
  const [formattedDate, setFormattedDate] = useState<string>(() => formatDisplayDate(new Date()));
  const [description, setDescription] = useState('');

  const [isCategoryScreenVisible, setIsCategoryScreenVisible] = useState(false);
  const [isDateScreenVisible, setIsDateScreenVisible] = useState(false);

  const handleSave = () => {
    const cleanedAmount = amount.trim();
    if (!cleanedAmount || parseFloat(cleanedAmount) <= 0 || isNaN(parseFloat(cleanedAmount))) {
      Alert.alert('Invalid Amount', 'Please enter a valid expense amount.');
      return;
    }

    const newExpense: ExpenseFormData = {
      amount: parseFloat(cleanedAmount).toFixed(2),
      category: selectedCategory,
      date: formattedDate,
      rawDate: rawDate,
      description: description.trim(),
    };

    if (onSaveExpense) {
      onSaveExpense(newExpense);
    } else {
      Alert.alert(
        'Expense Recorded',
        `Successfully saved ₹${newExpense.amount} for ${newExpense.category.name}.`,
        [{ text: 'OK', onPress: onBack }]
      );
    }
  };

  // If Category Screen is opened, render it full screen
  if (isCategoryScreenVisible) {
    return (
      <CategoryScreen
        initialCategoryId={selectedCategory.id}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
        }}
        onBack={() => setIsCategoryScreenVisible(false)}
      />
    );
  }

  // If Date Selector Calendar Screen is opened, render it full screen
  if (isDateScreenVisible) {
    return (
      <DateSelectorScreen
        initialDate={rawDate}
        onSelectDate={(formatted, raw) => {
          setFormattedDate(formatted);
          setRawDate(raw);
        }}
        onBack={() => setIsDateScreenVisible(false)}
      />
    );
  }

  return (
    <AddExpenseBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            {/* Top Navigation Header: Back Chevron & Title */}
            <AddExpenseHeader onBackPress={onBack} />

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Field 1: Amount */}
              <AmountInputField
                value={amount}
                onChangeText={setAmount}
              />

              {/* Field 2: Category */}
              <CategorySelectorField
                selectedCategory={selectedCategory}
                onPress={() => setIsCategoryScreenVisible(true)}
              />

              {/* Field 3: Date */}
              <DateSelectorField
                formattedDate={formattedDate}
                onPress={() => setIsDateScreenVisible(true)}
              />

              {/* Field 4: Description */}
              <DescriptionInputField
                value={description}
                onChangeText={setDescription}
              />

              {/* Submit Action: Save Expense */}
              <SaveExpenseButton onPress={handleSave} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AddExpenseBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
