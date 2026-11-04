import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

interface AmountInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function AmountInputField({
  value,
  onChangeText,
  placeholder = '0.00',
}: AmountInputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.inputContainer}>
        <View style={styles.currencyBadge}>
          <Text style={styles.currencySymbol}>₹</Text>
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  currencyBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#242428',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#A0A0A5',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    marginLeft: 14,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
