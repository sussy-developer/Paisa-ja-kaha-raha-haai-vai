import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import CategoryBackground from './components/CategoryBackground';
import CategoryHeader from './components/CategoryHeader';
import CategoryList from './components/CategoryList';
import CategoryDoneButton from './components/CategoryDoneButton';
import { CATEGORIES_DATA, CategoryItemData } from './types';

interface CategoryScreenProps {
  initialCategoryId?: string;
  onSelectCategory: (category: CategoryItemData) => void;
  onBack: () => void;
}

export default function CategoryScreen({
  initialCategoryId = 'food',
  onSelectCategory,
  onBack,
}: CategoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItemData>(() => {
    const found = CATEGORIES_DATA.find((c) => c.id === initialCategoryId);
    return found || CATEGORIES_DATA[0];
  });

  const handleDone = () => {
    onSelectCategory(selectedCategory);
    onBack();
  };

  return (
    <CategoryBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header with back chevron and centered title */}
          <CategoryHeader onBackPress={onBack} />

          {/* List of 9 categories */}
          <CategoryList
            categories={CATEGORIES_DATA}
            selectedCategoryId={selectedCategory.id}
            onSelectCategory={setSelectedCategory}
          />

          {/* Bottom Action Button: Done */}
          <CategoryDoneButton onPress={handleDone} />
        </View>
      </SafeAreaView>
    </CategoryBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
