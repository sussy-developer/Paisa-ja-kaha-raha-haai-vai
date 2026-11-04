import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import BlurredCard from './BlurredCard';
import AnimatedRollingAmount from './AnimatedRollingAmount';

interface SummaryCardProps {
  title: string;
  amount: string;
  trend: string;
  trendColor?: string;
}

export default function SummaryCard({
  title,
  amount,
  trend,
  trendColor = '#10B981',
}: SummaryCardProps) {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.97,
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
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ scale: cardScale }] },
        ]}
      >
        <BlurredCard
          blurType="dark"
          blurAmount={50}
          overlayColor="rgba(24, 24, 27, 0.65)"
          style={styles.card}
        >
          <Text style={styles.title}>{title}</Text>

          {/* Animated Rolling Counter */}
          <AnimatedRollingAmount
            amount={amount}
            style={styles.amount}
            duration={1000}
            delay={250}
          />

          <View style={styles.trendRow}>
            <View
              style={[
                styles.trendBadge,
                {
                  backgroundColor: `${trendColor}1A`,
                  borderColor: `${trendColor}33`,
                },
              ]}
            >
              <Text style={[styles.trendText, { color: trendColor }]}>
                ↑ {trend}
              </Text>
            </View>
          </View>
        </BlurredCard>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    color: '#8E8E96',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
