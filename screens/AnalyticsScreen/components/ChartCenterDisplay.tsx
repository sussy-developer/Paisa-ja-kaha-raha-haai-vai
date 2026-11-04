import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, View } from 'react-native';
import { CategoryBreakdownItem } from '../types';

interface ChartCenterDisplayProps {
  totalAmount: string;
  numericTotal: number;
  selectedCategory: CategoryBreakdownItem | null;
  sweepProgress: number; // 0 to 1
  onClearSelection: () => void;
}

export default function ChartCenterDisplay({
  totalAmount,
  numericTotal,
  selectedCategory,
  sweepProgress,
  onClearSelection,
}: ChartCenterDisplayProps) {
  const popAnim = useRef(new Animated.Value(1)).current;

  // Pop animation whenever selection changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(popAnim, {
        toValue: 0.92,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(popAnim, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selectedCategory, popAnim]);

  // Compute animated rolling amount string during the entry sweep
  const getDisplayAmount = (): string => {
    if (selectedCategory) {
      return selectedCategory.amount;
    }

    if (sweepProgress >= 0.99) {
      return totalAmount;
    }

    // Ease-out quartic curve for fast start and smooth deceleration
    const eased = 1 - Math.pow(1 - sweepProgress, 4);
    const rollingVal = numericTotal * eased;

    return `₹${rollingVal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const isSelected = selectedCategory != null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: popAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchArea}
        onPress={isSelected ? onClearSelection : undefined}
        activeOpacity={0.8}
        disabled={!isSelected}
      >
        {/* Top Header Label */}
        <View style={styles.labelRow}>
          {isSelected && (
            <View
              style={[
                styles.categoryDot,
                { backgroundColor: selectedCategory.dotColor },
              ]}
            />
          )}
          <Text style={[styles.label, isSelected && styles.selectedLabel]}>
            {isSelected ? selectedCategory.name : 'Total'}
          </Text>
        </View>

        {/* Dynamic / Animated Amount */}
        <Text
          style={[
            styles.amount,
            isSelected && { color: selectedCategory.chartColor },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {getDisplayAmount()}
        </Text>

        {/* Subtitle / Contextual Helper */}
        <Text style={styles.subtitle}>
          {isSelected
            ? `${selectedCategory.percentage}% of expenses`
            : sweepProgress < 1
            ? 'Analyzing...'
            : 'tap slice to inspect'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  touchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  label: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },
  selectedLabel: {
    color: '#E5E7EB',
    fontWeight: '700',
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginVertical: 2,
    textAlign: 'center',
  },
  subtitle: {
    color: '#71717A',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: -0.1,
    marginTop: 2,
  },
});
