import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SignOutButtonProps {
  onLogout: () => void;
}

export default function SignOutButton({ onLogout }: SignOutButtonProps) {
  const handlePress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Ionicons name="log-out-outline" size={20} color="#FF4D4D" style={styles.icon} />
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.25)',
    borderRadius: 18,
    height: 52,
    marginBottom: 28,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FF4D4D',
    fontSize: 15,
    fontWeight: '600',
  },
});
