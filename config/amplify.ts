import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Explicitly tell Amplify to use React Native's default storage (AsyncStorage)
// This prevents the "Unknown error" when signIn attempts to save the session tokens
cognitoUserPoolsTokenProvider.setKeyValueStorage(AsyncStorage);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_zTmVfNrge',
      userPoolClientId: '22f6gmtbdtkfe8jtpefsp0e6s6',
    },
  },
});
