import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DescriptionInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function DescriptionInputField({
  value,
  onChangeText,
  placeholder = 'What did you spend on?',
}: DescriptionInputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconBadge}>
          <Ionicons name="document-text-outline" size={20} color="#9E9EA7" />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#18181B',
    borderRadius: 18,
    minHeight: 120,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#242428',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 14,
    color: '#FFFFFF',
    fontSize: 15,
    paddingTop: 8,
    minHeight: 80,
  },
});
