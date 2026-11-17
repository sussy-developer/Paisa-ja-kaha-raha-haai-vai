import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import GetStartedScreen from './screens/GetStartedScreen/GetStartedScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen/VerifyEmailScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'getStarted' | 'signup' | 'login' | 'verifyEmail' | 'home'>('getStarted');
  const [pendingEmail, setPendingEmail] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      await getCurrentUser();
      setCurrentScreen('home');
    } catch (error) {
      setCurrentScreen('getStarted');
    } finally {
      setIsAuthLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {currentScreen === 'getStarted' && (
          <GetStartedScreen onGetStarted={() => setCurrentScreen('login')} />
        )}
        {currentScreen === 'signup' && (
          <SignupScreen 
            onLoginPress={() => setCurrentScreen('login')} 
            onSignupSuccess={(email) => {
              setPendingEmail(email);
              setCurrentScreen('verifyEmail');
            }}
          />
        )}
        {currentScreen === 'verifyEmail' && (
          <VerifyEmailScreen 
            email={pendingEmail} 
            onVerifySuccess={() => setCurrentScreen('login')} 
          />
        )}
        {currentScreen === 'login' && (
          <LoginScreen 
            onSignupPress={() => setCurrentScreen('signup')} 
            onLoginSuccess={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen onLogoutSuccess={() => setCurrentScreen('getStarted')} />
        )}
        <StatusBar style="auto" />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
