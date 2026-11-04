import React from 'react';
import { Circle } from 'react-native-svg';

interface DonutSegmentProps {
  id: string;
  center: number;
  radius: number;
  baseStrokeWidth: number;
  color: string;
  circumference: number;
  strokeLength: number;
  offset: number;
  progress: number; // 0 to 1
  isSelected: boolean;
  isDimmed: boolean;
  onPress?: () => void;
}

export default function DonutSegment({
  center,
  radius,
  baseStrokeWidth,
  color,
  circumference,
  strokeLength,
  offset,
  progress,
  isSelected,
  isDimmed,
  onPress,
}: DonutSegmentProps) {
  // If progress is zero or negligible, skip drawing
  if (progress <= 0.005) {
    return null;
  }

  // Calculate animated length based on liquid sweep progress
  const currentLength = strokeLength * progress;

  // Add a 3px micro-gap when near full length for luxurious separation
  const gap = progress >= 0.95 ? 3 : 0;
  const visibleLength = Math.max(1, currentLength - gap);

  // Main Segment Arc
  const strokeWidth = isSelected ? baseStrokeWidth + 6 : baseStrokeWidth;
  const opacity = isDimmed ? 0.28 : 1.0;

  return (
    <>
      {/* Outer subtle halo ring when selected */}
      {isSelected && (
        <Circle
          cx={center}
          cy={center}
          r={radius + 5}
          stroke={color}
          strokeWidth={3}
          strokeDasharray={`${visibleLength} ${circumference}`}
          strokeDashoffset={-offset}
          fill="transparent"
          opacity={0.5}
        />
      )}

      {/* Main Segment Arc */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${visibleLength} ${circumference}`}
        strokeDashoffset={-offset}
        fill="transparent"
        opacity={opacity}
        strokeLinecap="butt"
        onPress={onPress}
      />
    </>
  );
}
