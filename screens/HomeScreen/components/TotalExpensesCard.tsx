import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import BlurredCard from './BlurredCard';
import GlassShimmerSweep from './GlassShimmerSweep';
import AnimatedRollingAmount from './AnimatedRollingAmount';
import AnimatedMiniBars from './AnimatedMiniBars';

interface TotalExpensesCardProps {
  label?: string;
  amount?: string;
  trend?: string;
  comparisonText?: string;
  isEmpty?: boolean;
}

export default function TotalExpensesCard({
  label = 'Total Expenses',
  amount = '₹0.00',
  trend = '+0%',
  comparisonText = 'vs last month',
  isEmpty = false,
}: TotalExpensesCardProps) {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.982,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(cardScale, {
      toValue: 1,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.animatedWrapper,
            { transform: [{ scale: cardScale }] },
          ]}
        >
          <BlurredCard
            blurType="dark"
            blurAmount={50}
            overlayColor="rgba(24, 24, 27, 0.65)"
            style={styles.card}
          >
            {/* Specular Diagonal Glass Sheen Sweep */}
            <GlassShimmerSweep delay={350} duration={1300} />

            <View style={styles.leftColumn}>
              <Text style={styles.label}>{label}</Text>

              {/* Dynamic 60/120fps Rolling Counter */}
              <AnimatedRollingAmount
                amount={amount}
                style={styles.amount}
                duration={1100}
                delay={150}
              />

              <View style={styles.trendRow}>
                <View
                  style={[
                    styles.trendBadge,
                    isEmpty ? styles.trendBadgeEmpty : styles.trendBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.trendText,
                      isEmpty && styles.trendEmptyText,
                    ]}
                  >
                    ↑ {trend}
                  </Text>
                </View>
                <Text style={styles.comparisonText}>{comparisonText}</Text>
              </View>
            </View>

            {/* Dynamic Financial Equalizer Waveform */}
            <View style={styles.rightColumn}>
              <AnimatedMiniBars color="#FF5E1E" isEmpty={isEmpty} />
            </View>
          </BlurredCard>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  animatedWrapper: {
    width: '100%',
  },
  card: {
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leftColumn: {
    flex: 1,
  },
  label: {
    color: '#9E9EA7',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  trendBadgeActive: {
    backgroundColor: 'rgba(255, 94, 30, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 94, 30, 0.3)',
  },
  trendBadgeEmpty: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  trendText: {
    color: '#FF6F1E',
    fontSize: 12,
    fontWeight: '700',
  },
  trendEmptyText: {
    color: '#8E8E96',
  },
  comparisonText: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '400',
  },
  rightColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
  },
});
