import React, { useState } from 'react';
import { Alert, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { signIn } from 'aws-amplify/auth';

import BackgroundImage from '../SignupScreen/components/BackgroundImage';
import Header from '../SignupScreen/components/Header';
import InputField from '../SignupScreen/components/InputField';
import SubmitButton from '../SignupScreen/components/SubmitButton';
import Footer from '../SignupScreen/components/Footer';

interface LoginScreenProps {
  onSignupPress?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginScreen({ onSignupPress, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    try {
      const { nextStep } = await signIn({
        username: email.trim(),
        password,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH',
        },
      });

      console.log('Sign in next step:', nextStep);

      if (nextStep.signInStep === 'DONE') {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email address before logging in.'
        );
      } else {
        Alert.alert(
          'Additional Verification Required',
          `Cognito requires an additional authentication step: ${nextStep.signInStep}`
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      console.log('RAW ERROR OBJECT:', JSON.stringify(error, null, 2));
      
      const errorMessage = error?.message || error?.underlyingError?.message || JSON.stringify(error);
      Alert.alert(
        'Login Failed',
        `Detailed error: ${errorMessage}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Header 
              title={"Welcome\nBack"} 
              subtitle={"Log in to continue tracking your\nexpenses and build a smarter\ntomorrow."} 
            />
            <View style={styles.formContainer}>
              <InputField 
                iconName="mail" 
                placeholder="Email Address" 
                value={email} 
                onChangeText={setEmail}
              />
              <InputField 
                iconName="lock" 
                placeholder="Password" 
                isPassword 
                value={password} 
                onChangeText={setPassword}
              />
              <SubmitButton title="Log In" onPress={handleLogin} />
              <Footer 
                text="Don't have an account?" 
                linkText="Sign up" 
                onLinkPress={onSignupPress} 
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  }
});
