export type TabKey = 'home' | 'expenses' | 'analytics' | 'profile';

export type ExpenseCategory = 'coffee' | 'restaurant' | 'shopping' | string;

export interface Expense {
  id: string;
  title: string;
  date: string;
  amount: string;
  category: ExpenseCategory;
  iconBgColor: string;
}

export interface SummaryCardData {
  title: string;
  amount: string;
  trend: string;
  trendColor?: string;
}
