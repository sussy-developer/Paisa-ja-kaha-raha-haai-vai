export type ExpenseIconType =
  | 'coffee'
  | 'restaurant'
  | 'shopping'
  | 'car'
  | 'electricity'
  | 'netflix'
  | 'groceries'
  | 'other';

export interface ExpenseRecord {
  id: string;
  title: string;
  date: string;
  amount: string; // e.g. "-₹4.50"
  numericAmount: number;
  category: string; // 'all' | 'food' | 'shopping' | 'transport' | 'bills' | 'entertainment'
  iconType: ExpenseIconType;
  iconBgColor: string;
  iconColor: string;
}

export interface FilterCategory {
  id: string;
  label: string;
}

export const FILTER_CATEGORIES: FilterCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'transport', label: 'Transport' },
  { id: 'bills', label: 'Bills' },
  { id: 'entertainment', label: 'Entertainment' },
];

export const formatCurrentMonthYear = (): string => {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};
