import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import DateSelectorBackground from './components/DateSelectorBackground';
import DateSelectorHeader from './components/DateSelectorHeader';
import CalendarMonthHeader from './components/CalendarMonthHeader';
import CalendarWeekdayHeader from './components/CalendarWeekdayHeader';
import CalendarGrid from './components/CalendarGrid';
import SelectedDatePreview from './components/SelectedDatePreview';
import DateDoneButton from './components/DateDoneButton';
import { formatDisplayDate } from './types';

interface DateSelectorScreenProps {
  initialDate?: Date;
  onSelectDate: (formattedDate: string, rawDate: Date) => void;
  onBack: () => void;
}

export default function DateSelectorScreen({
  initialDate = new Date(),
  onSelectDate,
  onBack,
}: DateSelectorScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [displayMonth, setDisplayMonth] = useState<number>(initialDate.getMonth());
  const [displayYear, setDisplayYear] = useState<number>(initialDate.getFullYear());

  const handlePreviousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // If user clicked a day from prev/next month in the grid, jump to that month
    if (date.getMonth() !== displayMonth || date.getFullYear() !== displayYear) {
      setDisplayMonth(date.getMonth());
      setDisplayYear(date.getFullYear());
    }
  };

  const handleDone = () => {
    onSelectDate(formatDisplayDate(selectedDate), selectedDate);
    onBack();
  };

  return (
    <DateSelectorBackground>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0C" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header with back button */}
          <DateSelectorHeader onBackPress={onBack} />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Month & Year Header with Prev/Next Controls */}
            <CalendarMonthHeader
              currentMonth={displayMonth}
              currentYear={displayYear}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />

            {/* Weekday Labels: Su, Mo, Tu, We, Th, Fr, Sa */}
            <CalendarWeekdayHeader />

            {/* 7-column Calendar Day Grid */}
            <CalendarGrid
              year={displayYear}
              month={displayMonth}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />

            {/* Selected Date Card with Quick Today/Yesterday Chips */}
            <SelectedDatePreview
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />

            {/* Done Action Button */}
            <DateDoneButton onPress={handleDone} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </DateSelectorBackground>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
