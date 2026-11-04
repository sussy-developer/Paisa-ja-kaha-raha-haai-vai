import { Ionicons } from '@expo/vector-icons';

export interface CategoryItemData {
  id: string;
  name: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  badgeBgColor: string;
}

export const CATEGORIES_DATA: CategoryItemData[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    iconName: 'restaurant',
    iconColor: '#E58A38',
    badgeBgColor: '#352115',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    iconName: 'basket-outline',
    iconColor: '#D8B4E2',
    badgeBgColor: '#38222E',
  },
  {
    id: 'transport',
    name: 'Transport',
    iconName: 'car',
    iconColor: '#38BDF8',
    badgeBgColor: '#12304A',
  },
  {
    id: 'bills',
    name: 'Bills & Utilities',
    iconName: 'home-outline',
    iconColor: '#E58A38',
    badgeBgColor: '#352216',
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    iconName: 'heart',
    iconColor: '#FFFFFF',
    badgeBgColor: '#4A1526',
  },
  {
    id: 'travel',
    name: 'Travel',
    iconName: 'airplane',
    iconColor: '#E0F2FE',
    badgeBgColor: '#1B2C52',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    iconName: 'game-controller',
    iconColor: '#34D399',
    badgeBgColor: '#153C35',
  },
  {
    id: 'education',
    name: 'Education',
    iconName: 'school-outline',
    iconColor: '#E9D5FF',
    badgeBgColor: '#3E2232',
  },
  {
    id: 'other',
    name: 'Other',
    iconName: 'ellipsis-horizontal',
    iconColor: '#A1A1AA',
    badgeBgColor: '#26262B',
  },
];
