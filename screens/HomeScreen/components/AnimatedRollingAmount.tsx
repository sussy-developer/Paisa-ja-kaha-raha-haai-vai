import React, { useState, useEffect, useRef } from 'react';
import { Text, TextStyle } from 'react-native';

interface AnimatedRollingAmountProps {
  amount: string;
  style?: TextStyle;
  duration?: number;
  delay?: number;
  prefix?: string;
}

/**
 * High-precision rolling number counter with ease-out quartic deceleration.
 * Smoothly counts from 0 to the target amount at 60/120fps.
 */
export default function AnimatedRollingAmount({
  amount,
  style,
  duration = 1100,
  delay = 100,
  prefix = '₹',
}: AnimatedRollingAmountProps) {
  // Parse target number from amount string
  const cleanNumeric = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const isNegative = amount.includes('-');

  const [displayValue, setDisplayValue] = useState<string>(
    cleanNumeric === 0
      ? `${isNegative ? '-' : ''}${prefix}0.00`
      : `${isNegative ? '-' : ''}${prefix}0.00`
  );

  useEffect(() => {
    let animFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    if (cleanNumeric === 0) {
      setDisplayValue(`${isNegative ? '-' : ''}${prefix}0.00`);
      return;
    }

    timeoutId = setTimeout(() => {
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);

        // Ease-out quartic curve: rapid initial rise, buttery smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        const currentVal = cleanNumeric * eased;

        const formatted = currentVal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setDisplayValue(`${isNegative ? '-' : ''}${prefix}${formatted}`);

        if (progress < 1) {
          animFrameId = requestAnimationFrame(tick);
        } else {
          // Lock to exact final string
          const finalFormatted = cleanNumeric.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setDisplayValue(`${isNegative ? '-' : ''}${prefix}${finalFormatted}`);
        }
      };

      animFrameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [amount, cleanNumeric, duration, delay, isNegative, prefix]);

  return (
    <Text style={style} numberOfLines={1} adjustsFontSizeToFit>
      {displayValue}
    </Text>
  );
}
