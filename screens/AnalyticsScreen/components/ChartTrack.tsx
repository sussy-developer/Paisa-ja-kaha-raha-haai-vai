import React from 'react';
import { Circle } from 'react-native-svg';

interface ChartTrackProps {
  center: number;
  radius: number;
  strokeWidth: number;
}

/**
 * High-precision background track with subtle precision guidelines.
 * Gives the donut chart a luxury automotive/watch instrument aesthetic.
 */
export default function ChartTrack({
  center,
  radius,
  strokeWidth,
}: ChartTrackProps) {
  const halfStroke = strokeWidth / 2;
  const innerGuideRadius = Math.max(10, radius - halfStroke);
  const outerGuideRadius = radius + halfStroke;

  return (
    <>
      {/* Precision outer edge guide */}
      <Circle
        cx={center}
        cy={center}
        r={outerGuideRadius}
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth={1}
        fill="transparent"
      />

      {/* Main recessed track groove */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#151518"
        strokeWidth={strokeWidth}
        fill="transparent"
      />

      {/* Precision inner edge guide */}
      <Circle
        cx={center}
        cy={center}
        r={innerGuideRadius}
        stroke="rgba(255, 255, 255, 0.04)"
        strokeWidth={1}
        fill="transparent"
      />
    </>
  );
}
