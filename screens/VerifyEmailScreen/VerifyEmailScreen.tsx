import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

import BackgroundImage from '../SignupScreen/components/BackgroundImage';
import Header from '../SignupScreen/components/Header';
import InputField from '../SignupScreen/components/InputField';
import SubmitButton from '../SignupScreen/components/SubmitButton';

interface VerifyEmailScreenProps {
  email: string;
  onVerifySuccess: () => void;
}

export default function VerifyEmailScreen({ email, onVerifySuccess }: VerifyEmailScreenProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!code) {
      setError('Please enter the verification code.');
      return;
    }

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      Alert.alert('Success', 'Email verified successfully! You can now log in.');
      onVerifySuccess();
    } catch (err) {
      console.error('Verify error:', err);
      setError(err instanceof Error ? err.message : 'Invalid code. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
    } catch (err) {
      console.error('Resend error:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to resend code.');
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
              title={"Verify\nYour Email"} 
              subtitle={`We've sent a 6-digit code to\n${email}`} 
            />
            <View style={styles.formContainer}>
              <InputField 
                iconName="key" 
                placeholder="6-digit code" 
                value={code} 
                onChangeText={(text) => { setCode(text); setError(''); }} 
                error={error}
              />
              
              <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive a code? Resend</Text>
              </TouchableOpacity>

              <SubmitButton title="Verify Email" onPress={handleVerify} />
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
    justifyContent: 'flex-end',
    paddingTop: 40,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  }
});
