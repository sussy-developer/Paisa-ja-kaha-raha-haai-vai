import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface AnalyticsHeaderProps {
  title?: string;
}

export default function AnalyticsHeader({ title = 'Analytics' }: AnalyticsHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
});
