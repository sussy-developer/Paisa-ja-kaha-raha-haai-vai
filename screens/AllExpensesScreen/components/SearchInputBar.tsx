import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchInputBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  onClear: () => void;
}

export default function SearchInputBar({
  searchQuery,
  onChangeSearch,
  onClear,
}: SearchInputBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#8E8E96" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={onChangeSearch}
        placeholder="Search expenses..."
        placeholderTextColor="#6B7280"
        returnKeyType="search"
        autoCapitalize="none"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={onClear} activeOpacity={0.7} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color="#8E8E96" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18181B',
    borderRadius: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  clearButton: {
    padding: 4,
  },
});
