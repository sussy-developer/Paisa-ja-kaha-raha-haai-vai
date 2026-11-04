import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SaveUsernameButton from './SaveUsernameButton';

interface UsernameEditCardProps {
  currentUsername: string;
  onSave: (newUsername: string) => Promise<boolean>;
}

export default function UsernameEditCard({
  currentUsername,
  onSave,
}: UsernameEditCardProps) {
  const [editedName, setEditedName] = useState(currentUsername);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setEditedName(currentUsername);
  }, [currentUsername]);

  const hasChanged = editedName.trim() !== currentUsername.trim() && editedName.trim().length > 0;

  const handleSavePress = async () => {
    if (!editedName.trim()) {
      setErrorMessage('Username cannot be empty.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsSaving(true);

    const success = await onSave(editedName.trim());
    setIsSaving(false);

    if (success) {
      setSuccessMessage('Username updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage('Failed to update username. Please try again.');
    }
  };

  const handleReset = () => {
    setEditedName(currentUsername);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardLabel}>Username / Display Name</Text>
        {hasChanged && (
          <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-outline" size={18} color="#FF6F1E" />
        </View>
        <TextInput
          style={styles.input}
          value={editedName}
          onChangeText={(text) => {
            setEditedName(text);
            if (errorMessage) setErrorMessage('');
            if (successMessage) setSuccessMessage('');
          }}
          placeholder="Enter your username"
          placeholderTextColor="#6B7280"
          autoCapitalize="words"
          returnKeyType="done"
        />
        <Ionicons name="pencil" size={16} color="#8E8E96" style={styles.pencilIcon} />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      {hasChanged && (
        <SaveUsernameButton
          onPress={handleSavePress}
          isLoading={isSaving}
          title="Save Changes"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181B',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLabel: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '500',
  },
  resetText: {
    color: '#FF6F1E',
    fontSize: 13,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 111, 30, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pencilIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 13,
    marginTop: 8,
  },
  successText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
});
