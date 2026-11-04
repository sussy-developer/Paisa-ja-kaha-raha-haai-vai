import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AllExpensesHeaderProps {
  title?: string;
  onSearchPress: () => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export default function AllExpensesHeader({
  title = 'All Expenses',
  onSearchPress,
  onBackPress,
  showBackButton = false,
}: AllExpensesHeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton && onBackPress ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={styles.actionButton} />
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={onSearchPress}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 16,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
});
