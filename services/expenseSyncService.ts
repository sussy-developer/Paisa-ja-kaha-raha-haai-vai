import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateClient } from 'aws-amplify/api';
import { createExpenseMutation, deleteExpenseMutation } from '../graphql/mutations';
import { listExpensesByUserQuery } from '../graphql/queries';
import { Expense } from '../screens/HomeScreen/types';

export const STORAGE_KEY = '@user_expenses_list';

let client: any = null;

function getApiClient() {
  if (!client) {
    try {
      client = generateClient();
    } catch (e) {
      console.log('Amplify API client init note:', e);
    }
  }
  return client;
}

/**
 * Loads expenses from local storage, then syncs with AWS AppSync cloud database.
 * If user reinstalled the app and local storage is empty, restores all past expenses from DynamoDB!
 */
export async function syncAndLoadExpenses(userId: string): Promise<Expense[]> {
  let localExpenses: Expense[] = [];

  // 1. Load local expenses from AsyncStorage for instant UI rendering
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      localExpenses = JSON.parse(stored);
    }
  } catch (err) {
    console.log('Error reading local expenses:', err);
  }

  // 2. Query cloud database (AWS AppSync / DynamoDB)
  try {
    const apiClient = getApiClient();
    if (apiClient && userId) {
      const response: any = await apiClient.graphql({
        query: listExpensesByUserQuery,
        variables: { userId },
        authMode: 'userPool',
      });

      const cloudItems: Expense[] = response?.data?.listExpensesByUser?.items || [];

      if (cloudItems.length > 0) {
        // Merge cloud items with local items (cloud wins for persistence across reinstalls)
        const itemMap = new Map<string, Expense>();
        cloudItems.forEach((item) => itemMap.set(item.id, item));
        localExpenses.forEach((item) => {
          if (!itemMap.has(item.id)) {
            itemMap.set(item.id, item);
          }
        });

        const mergedExpenses = Array.from(itemMap.values());
        // Save back to local AsyncStorage for offline availability
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mergedExpenses));
        return mergedExpenses;
      }
    }
  } catch (cloudErr) {
    console.log('Cloud sync note (will use local cache):', cloudErr);
  }

  return localExpenses;
}

/**
 * Saves a new expense to local storage immediately, and syncs to AWS DynamoDB via AppSync.
 */
export async function persistNewExpense(
  expense: Expense,
  userId: string,
  currentList: Expense[]
): Promise<Expense[]> {
  const updatedList = [expense, ...currentList];

  // 1. Save to local device storage immediately
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.log('Error saving to AsyncStorage:', e);
  }

  // 2. Sync to AWS AppSync in background
  try {
    const apiClient = getApiClient();
    if (apiClient && userId) {
      await apiClient.graphql({
        query: createExpenseMutation,
        variables: {
          input: {
            id: expense.id,
            userId,
            title: expense.title,
            date: expense.date,
            amount: expense.amount,
            category: expense.category || 'other',
            iconBgColor: expense.iconBgColor || '#352115',
            createdAt: new Date().toISOString(),
          },
        },
        authMode: 'userPool',
      });
    }
  } catch (cloudErr) {
    console.log('Cloud upload note (saved locally):', cloudErr);
  }

  return updatedList;
}

/**
 * Deletes an expense from local storage and deletes it from AWS DynamoDB.
 */
export async function removeExpense(
  id: string,
  currentList: Expense[]
): Promise<Expense[]> {
  const updatedList = currentList.filter((item) => item.id !== id);

  // 1. Delete from local storage
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.log('Error updating AsyncStorage:', e);
  }

  // 2. Delete from AWS AppSync in background
  try {
    const apiClient = getApiClient();
    if (apiClient) {
      await apiClient.graphql({
        query: deleteExpenseMutation,
        variables: { input: { id } },
        authMode: 'userPool',
      });
    }
  } catch (cloudErr) {
    console.log('Cloud delete note (deleted locally):', cloudErr);
  }

  return updatedList;
}
