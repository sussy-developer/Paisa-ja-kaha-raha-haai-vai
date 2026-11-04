import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface SaveUsernameButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  title?: string;
  disabled?: boolean;
}

export default function SaveUsernameButton({
  onPress,
  isLoading = false,
  title = 'Save Changes',
  disabled = false,
}: SaveUsernameButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5E1E',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5E1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 94, 30, 0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
