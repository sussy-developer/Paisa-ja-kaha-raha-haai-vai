import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LiquidGlassCard from './LiquidGlassCard';
import { FilterCategory } from '../types';

interface CategoryFilterBarProps {
  categories: FilterCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryFilterBar({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoryFilterBarProps) {
  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LiquidGlassCard style={styles.capsuleContainer}>
          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.pill, isActive && styles.activePill]}
                onPress={() => onSelectCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.pillText, isActive && styles.activePillText]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </LiquidGlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  capsuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignSelf: 'flex-start',
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  activePill: {
    backgroundColor: '#FF5E1E',
  },
  pillText: {
    color: '#8E8E96',
    fontSize: 14,
    fontWeight: '500',
  },
  activePillText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
