import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { CategoryBreakdownItem } from '../types';
import ChartGlowHalo from './ChartGlowHalo';
import ChartTrack from './ChartTrack';
import DonutSegment from './DonutSegment';
import ChartCenterDisplay from './ChartCenterDisplay';

interface DonutChartProps {
  categories: CategoryBreakdownItem[];
  totalAmount?: string;
  selectedCategoryId?: string | null;
  onSelectCategory?: (category: CategoryBreakdownItem | null) => void;
}

export default function DonutChart({
  categories,
  totalAmount = '₹0.00',
  selectedCategoryId,
  onSelectCategory,
}: DonutChartProps) {
  const [sweepProgress, setSweepProgress] = useState(0);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);

  // Synchronized active selection (controlled or uncontrolled)
  const activeSelectedId =
    selectedCategoryId !== undefined ? selectedCategoryId : internalSelectedId;

  const selectedCategory = useMemo(() => {
    if (!activeSelectedId) return null;
    return categories.find((c) => c.id === activeSelectedId) || null;
  }, [categories, activeSelectedId]);

  // Clean numeric total for animated rolling counter
  const numericTotal = useMemo(() => {
    const clean = totalAmount.replace(/[^0-9.]/g, '');
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  }, [totalAmount]);

  // Dimensions
  const size = 224;
  const strokeWidth = 36;
  const radius = (size - strokeWidth) / 2; // 94
  const center = size / 2; // 112
  const circumference = 2 * Math.PI * radius; // ~590.6

  // Native driver entrance animations
  const scaleAnim = useRef(new Animated.Value(0.82)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.2)).current;

  // Trigger grand entrance whenever categories or time range changes
  useEffect(() => {
    setSweepProgress(0);

    scaleAnim.setValue(0.82);
    spinAnim.setValue(0);
    opacityAnim.setValue(0.2);

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6.5,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();

    // 60/120fps synchronized liquid sweep loop
    let animFrameId: number;
    const startTime = Date.now();
    const duration = 1250;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setSweepProgress(progress);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(tick);
      }
    };

    animFrameId = requestAnimationFrame(tick);

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [categories, totalAmount, scaleAnim, spinAnim, opacityAnim]);

  // Calculate arc offsets and staggered timing for each segment
  let accumulatedOffset = 0;
  let accumulatedPercent = 0;
  const segments = categories.map((cat) => {
    const strokeLength = (cat.percentage / 100) * circumference;
    const offset = accumulatedOffset;
    const startPct = accumulatedPercent;
    accumulatedOffset += strokeLength;
    accumulatedPercent += cat.percentage;

    // Sequential timing window for liquid stream
    const startFraction = (startPct / 100) * 0.65;
    const endFraction = Math.min(1.0, (accumulatedPercent / 100) * 0.65 + 0.35);

    // Compute segment's individual progress from master sweep progress
    let segProgress = 0;
    if (sweepProgress > startFraction) {
      const span = Math.max(0.001, endFraction - startFraction);
      const raw = Math.min(1, (sweepProgress - startFraction) / span);
      // Ease-out cubic for smooth lock-in
      segProgress = 1 - Math.pow(1 - raw, 3);
    }

    return {
      category: cat,
      color: cat.chartColor,
      strokeLength,
      offset,
      progress: segProgress,
    };
  });

  const handleToggleCategory = (cat: CategoryBreakdownItem) => {
    const next = activeSelectedId === cat.id ? null : cat;
    if (selectedCategoryId === undefined) {
      setInternalSelectedId(next ? next.id : null);
    }
    onSelectCategory?.(next);
  };

  const handleClearSelection = () => {
    if (selectedCategoryId === undefined) {
      setInternalSelectedId(null);
    }
    onSelectCategory?.(null);
  };

  // Interpolate entrance rotation: -60deg -> 0deg
  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-60deg', '0deg'],
  });

  const glowColor =
    selectedCategory?.chartColor || categories[0]?.chartColor || '#FF5E1E';

  return (
    <View style={styles.container}>
      {/* Dimensional Ambient Breathing Glow */}
      <ChartGlowHalo size={size} glowColor={glowColor} />

      <View style={[styles.chartWrapper, { width: size, height: size }]}>
        {/* Animated Rotating Donut Wheel */}
        <Animated.View
          style={[
            styles.animatedWheel,
            {
              transform: [
                { scale: scaleAnim },
                { rotate: spinInterpolate },
              ],
              opacity: opacityAnim,
            },
          ]}
        >
          <Svg width={size} height={size}>
            <G rotation="-90" origin={`${center}, ${center}`}>
              {/* Luxury Track Groove & Guidelines */}
              <ChartTrack
                center={center}
                radius={radius}
                strokeWidth={strokeWidth}
              />

              {/* Liquid Sweeping Colored Segments */}
              {segments.map((seg) => {
                const isSelected = activeSelectedId === seg.category.id;
                const isDimmed =
                  activeSelectedId != null && activeSelectedId !== seg.category.id;

                return (
                  <DonutSegment
                    key={seg.category.id}
                    id={seg.category.id}
                    center={center}
                    radius={radius}
                    baseStrokeWidth={strokeWidth}
                    color={seg.color}
                    circumference={circumference}
                    strokeLength={seg.strokeLength}
                    offset={seg.offset}
                    progress={seg.progress}
                    isSelected={isSelected}
                    isDimmed={isDimmed}
                    onPress={() => handleToggleCategory(seg.category)}
                  />
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        {/* Center Display: Interactive Rolling Counter & Label */}
        <ChartCenterDisplay
          totalAmount={totalAmount}
          numericTotal={numericTotal}
          selectedCategory={selectedCategory}
          sweepProgress={sweepProgress}
          onClearSelection={handleClearSelection}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'relative',
  },
  chartWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedWheel: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
