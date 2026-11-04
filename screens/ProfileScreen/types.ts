import { Ionicons } from '@expo/vector-icons';

export interface ProfileMenuItemData {
  id: string;
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export const PROFILE_MENU_ITEMS: ProfileMenuItemData[] = [
  {
    id: 'categories',
    title: 'Expense Categories',
    iconName: 'grid-outline',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    iconName: 'notifications-outline',
  },
  {
    id: 'help',
    title: 'Help & Support',
    iconName: 'help-circle-outline',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    iconName: 'shield-checkmark-outline',
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    iconName: 'document-text-outline',
  },
];
