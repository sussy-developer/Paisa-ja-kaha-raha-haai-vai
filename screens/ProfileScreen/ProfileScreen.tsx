import React, { useState } from 'react';
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
import { updateUserAttributes } from 'aws-amplify/auth';
import ProfileBackground from './components/ProfileBackground';
import ProfileHeader from './components/ProfileHeader';
import ProfileUserInfo from './components/ProfileUserInfo';
import MonthlyBudgetCard from './components/MonthlyBudgetCard';
import ProfileMenuList from './components/ProfileMenuList';
import LogOutButton from './components/LogOutButton';
import EditUsernameModal from './components/EditUsernameModal';
import BottomNavigationBar from '../HomeScreen/components/BottomNavigationBar';
import { TabKey } from '../HomeScreen/types';
import { ProfileMenuItemData } from './types';

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  onUpdateUsername: (newName: string) => void;
  onLogout: () => void;
  onTabChange?: (tab: TabKey) => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const CUSTOM_NAME_KEY = '@custom_user_name';

export default function ProfileScreen({
  userName,
  userEmail,
  onUpdateUsername,
  onLogout,
  onTabChange,
}: ProfileScreenProps) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleSaveUsername = async (newName: string): Promise<boolean> => {
    try {
      // 1. Update in AWS Cognito User Pool
      try {
        await updateUserAttributes({
          userAttributes: {
            name: newName,
          },
        });
      } catch (cognitoError) {
        console.log('Cognito update attribute note:', cognitoError);
      }

      // 2. Persist locally to AsyncStorage
      await AsyncStorage.setItem(CUSTOM_NAME_KEY, newName);

      // 3. Update application state
      onUpdateUsername(newName);
      return true;
    } catch (error) {
      console.error('Error saving username:', error);
      return false;
    }
  };

  const handleMenuItemPress = (item: ProfileMenuItemData) => {
    switch (item.id) {
      case 'categories':
        Alert.alert('Expense Categories', 'Manage and customize your expense categories.');
        break;
      case 'notifications':
        Alert.alert('Notifications', 'Monthly budget alerts and daily reminders are active.');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Need help? Contact us at support@expensetracker.com');
        break;
      case 'privacy':
        Alert.alert('Privacy Policy', 'Your financial data is encrypted and securely stored.');
        break;
      case 'terms':
        Alert.alert('Terms of Service', 'Expense Tracker Terms of Service v1.0');
        break;
      default:
        break;
    }
  };

  return (
    <ProfileBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Header: Clean "Profile" title */}
            <ProfileHeader
              title="Profile"
            />

            {/* User Info Row: Gray circular avatar with initial, name, edit button on right, and email */}
            <ProfileUserInfo
              userName={userName}
              userEmail={userEmail}
              onEditPress={() => setIsEditModalVisible(true)}
            />

            {/* Monthly Budget Card: Target icon, "Monthly Budget", "₹3,000.00", chevron */}
            <MonthlyBudgetCard
              amount="₹3,000.00"
              onPress={() => Alert.alert('Monthly Budget', 'Your monthly budget limit is ₹3,000.00')}
            />

            {/* Settings Menu List: Expense Categories, Notifications, Help, Privacy, Terms */}
            <ProfileMenuList onItemPress={handleMenuItemPress} />

            {/* Log Out Button */}
            <LogOutButton onLogout={onLogout} />
          </ScrollView>

          {/* Bottom Navigation Bar with "Profile" active */}
          <BottomNavigationBar
            activeTab="profile"
            onTabChange={(tab) => {
              if (onTabChange) {
                onTabChange(tab);
              }
            }}
          />
        </View>

        {/* Edit Username Modal */}
        <EditUsernameModal
          visible={isEditModalVisible}
          currentUsername={userName}
          onClose={() => setIsEditModalVisible(false)}
          onSave={handleSaveUsername}
        />
      </SafeAreaView>
    </ProfileBackground>
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
