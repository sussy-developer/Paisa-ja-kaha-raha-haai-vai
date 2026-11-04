import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LogOutButtonProps {
  onLogout: () => void;
}

export default function LogOutButton({ onLogout }: LogOutButtonProps) {
  const handlePress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: onLogout },
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
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E63946',
    backgroundColor: 'rgba(230, 57, 70, 0.04)',
    borderRadius: 26,
    height: 52,
    marginBottom: 24,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FF4D4D',
    fontSize: 16,
    fontWeight: '600',
  },
});
