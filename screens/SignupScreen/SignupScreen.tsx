import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Alert, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import Header from './components/Header';
import InputField from './components/InputField';
import Checkbox from './components/Checkbox';
import SubmitButton from './components/SubmitButton';
import Footer from './components/Footer';

interface SignupScreenProps {
  onLoginPress?: () => void;
  onSignupSuccess?: (email: string) => void;
}

export default function SignupScreen({ onLoginPress, onSignupSuccess }: SignupScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '', confirmPassword: '', agreed: '' });

  const handleSignup = async () => {
    let newErrors = { fullName: '', email: '', password: '', confirmPassword: '', agreed: '' };
    let isValid = true;

    if (!fullName) {
      newErrors.fullName = 'Please enter your full name.';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Please enter your email address.';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Please enter a password.';
      isValid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
    if (!agreed) {
      newErrors.agreed = 'Please accept the Terms of Service and Privacy Policy.';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      if (newErrors.agreed) {
        Alert.alert('Error', newErrors.agreed);
      }
      return;
    }

    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name: fullName,
          },
        },
      });

      if (onSignupSuccess) {
        onSignupSuccess(email);
      } else {
        Alert.alert(
          'Account Created',
          'Your account has been created. Please check your email for the verification code.'
        );
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert(
        'Sign Up Failed',
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
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
              title={"Create\nyour Account"} 
              subtitle={"Start tracking your expenses\ntoday and build a smarter\ntomorrow."} 
            />
            <View style={styles.formContainer}>
              <InputField 
                iconName="user" 
                placeholder="Full Name" 
                value={fullName} 
                onChangeText={(text) => { setFullName(text); setErrors(e => ({ ...e, fullName: '' })); }} 
                error={errors.fullName}
              />
              <InputField 
                iconName="mail" 
                placeholder="Email Address" 
                value={email} 
                onChangeText={(text) => { setEmail(text); setErrors(e => ({ ...e, email: '' })); }} 
                error={errors.email}
              />
              <InputField 
                iconName="lock" 
                placeholder="Password" 
                isPassword 
                value={password} 
                onChangeText={(text) => { setPassword(text); setErrors(e => ({ ...e, password: '' })); }} 
                error={errors.password}
              />
              <InputField 
                iconName="lock" 
                placeholder="Confirm Password" 
                isPassword 
                value={confirmPassword} 
                onChangeText={(text) => { setConfirmPassword(text); setErrors(e => ({ ...e, confirmPassword: '' })); }} 
                error={errors.confirmPassword}
              />
              <Checkbox 
                checked={agreed} 
                onToggle={() => { setAgreed(!agreed); setErrors(e => ({ ...e, agreed: '' })); }} 
              />
              <SubmitButton title="Create Account" onPress={handleSignup} />
              <Footer 
                text="Already have an account?" 
                linkText="Log in" 
                onLinkPress={onLoginPress} 
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
    justifyContent: 'flex-end',
    paddingTop: 40,
  }
});
