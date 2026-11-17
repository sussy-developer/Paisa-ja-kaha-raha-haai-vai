import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';

try {
  // Explicitly configure key-value storage adapter for React Native AsyncStorage
  cognitoUserPoolsTokenProvider.setKeyValueStorage({
    async setItem(key: string, value: string): Promise<void> {
      await AsyncStorage.setItem(key, value);
    },
    async getItem(key: string): Promise<string | null> {
      return await AsyncStorage.getItem(key);
    },
    async removeItem(key: string): Promise<void> {
      await AsyncStorage.removeItem(key);
    },
    async clear(): Promise<void> {
      await AsyncStorage.clear();
    },
  });

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: 'eu-north-1_zTmVfNrge',
        userPoolClientId: '22f6gmtbdtkfe8jtpefsp0e6s6',
      },
    },
  });
} catch (error) {
  console.error('Amplify configuration error:', error);
}
