import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import AnalyticsBackground from './components/AnalyticsBackground';
import AnalyticsHeader from './components/AnalyticsHeader';
import TimeRangeSelector from './components/TimeRangeSelector';
import MonthNavigator from './components/MonthNavigator';
import DonutChart from './components/DonutChart';
import CategoryBreakdownList from './components/CategoryBreakdownList';
import BottomNavigationBar from '../HomeScreen/components/BottomNavigationBar';
import { TabKey } from '../HomeScreen/types';
import {
  CategoryBreakdownItem,
  TimeRange,
  computeAnalyticsBreakdown,
  formatCurrentMonthTitle,
} from './types';

interface AnalyticsScreenProps {
  expenses?: { category: string; amount: string }[];
  onTabChange?: (tab: TabKey) => void;
}

export default function AnalyticsScreen({
  expenses = [],
  onTabChange,
}: AnalyticsScreenProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('monthly');
  const [currentPeriod, setCurrentPeriod] = useState(formatCurrentMonthTitle());
  const [selectedCategory, setSelectedCategory] = useState<CategoryBreakdownItem | null>(null);

  // Compute live real analytics from user's expenses
  const analyticsData = useMemo(() => {
    return computeAnalyticsBreakdown(expenses);
  }, [expenses]);

  const handleRangeChange = (range: TimeRange) => {
    setSelectedRange(range);
    setSelectedCategory(null);
  };

  const handlePreviousPeriod = () => {
    Alert.alert('Previous Period', 'Navigating to previous period.');
  };

  const handleNextPeriod = () => {
    Alert.alert('Next Period', 'Navigating to next period.');
  };

  const handleCategoryPress = (item: CategoryBreakdownItem) => {
    setSelectedCategory((prev) => (prev?.id === item.id ? null : item));
  };

  return (
    <AnalyticsBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Title: Analytics */}
            <AnalyticsHeader title="Analytics" />

            {/* Time Range Selector Capsule: Monthly, Yearly, All Time */}
            <TimeRangeSelector
              selectedRange={selectedRange}
              onSelectRange={handleRangeChange}
            />

            {/* Month Navigator: < Current Month > */}
            <MonthNavigator
              currentPeriod={currentPeriod}
              onPrevious={handlePreviousPeriod}
              onNext={handleNextPeriod}
            />

            {/* Groundbreaking Donut Chart with synchronized liquid sweep & rolling counter */}
            <DonutChart
              key={selectedRange}
              categories={analyticsData.categories}
              totalAmount={analyticsData.totalAmount}
              selectedCategoryId={selectedCategory?.id}
              onSelectCategory={setSelectedCategory}
            />

            {/* Category Breakdown Table or Empty View */}
            <CategoryBreakdownList
              categories={analyticsData.categories}
              selectedCategoryId={selectedCategory?.id}
              onItemPress={handleCategoryPress}
            />
          </ScrollView>

          {/* Bottom Navigation Bar with "Analytics" active */}
          <BottomNavigationBar
            activeTab="analytics"
            onTabChange={(tab) => {
              if (onTabChange) {
                onTabChange(tab);
              }
            }}
          />
        </View>
      </SafeAreaView>
    </AnalyticsBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
