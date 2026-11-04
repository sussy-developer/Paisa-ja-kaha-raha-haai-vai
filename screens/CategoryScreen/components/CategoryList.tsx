import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import CategoryItem from './CategoryItem';
import { CategoryItemData } from '../types';

interface CategoryListProps {
  categories: CategoryItemData[];
  selectedCategoryId: string;
  onSelectCategory: (item: CategoryItemData) => void;
}

export default function CategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.list}>
        {categories.map((item, index) => {
          const isSelected = item.id === selectedCategoryId;
          const isLast = index === categories.length - 1;
          return (
            <CategoryItem
              key={item.id}
              item={item}
              isSelected={isSelected}
              onSelect={onSelectCategory}
              showDivider={!isLast}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  list: {
    paddingBottom: 8,
  },
});
