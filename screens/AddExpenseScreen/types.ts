import { Ionicons } from '@expo/vector-icons';

export interface CategoryOption {
  id: string;
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  badgeBgColor: string;
}

export interface ExpenseFormData {
  amount: string;
  category: CategoryOption;
  date: string;
  rawDate: Date;
  description: string;
}
