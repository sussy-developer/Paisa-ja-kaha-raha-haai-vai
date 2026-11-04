import React from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryBreakdownRow from './CategoryBreakdownRow';
import EmptyAnalyticsView from './EmptyAnalyticsView';
import { CategoryBreakdownItem } from '../types';

interface CategoryBreakdownListProps {
  categories: CategoryBreakdownItem[];
  selectedCategoryId?: string | null;
  onItemPress?: (item: CategoryBreakdownItem) => void;
}

export default function CategoryBreakdownList({
  categories,
  selectedCategoryId,
  onItemPress,
}: CategoryBreakdownListProps) {
  if (categories.length === 0) {
    return <EmptyAnalyticsView />;
  }

  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <CategoryBreakdownRow
          key={item.id}
          item={item}
          isSelected={selectedCategoryId === item.id}
          onPress={onItemPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});
