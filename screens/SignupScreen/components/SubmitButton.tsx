import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SubmitButtonProps {
  title: string;
  onPress?: () => void;
}

export default function SubmitButton({ title, onPress }: SubmitButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.iconContainer}>
        <Feather name="arrow-right" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    marginLeft: 48, // Balances the icon space to perfectly center the text
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E84C22',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
