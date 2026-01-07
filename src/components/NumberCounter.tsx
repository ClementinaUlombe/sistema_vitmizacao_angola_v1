"use client";

import React, { useState, useEffect, useRef } from "react";

interface NumberCounterProps {
  targetValue: number;
  duration?: number; // in milliseconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  targetValue,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrentValue(0); // Reset when targetValue changes

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const progress = (currentTime - startTimeRef.current) / duration;

      if (progress < 1) {
        const easedProgress = easeOutQuad(progress);
        const newValue = targetValue * easedProgress;
        setCurrentValue(parseFloat(newValue.toFixed(decimals)));
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        cancelAnimationFrame(animationFrameRef.current!);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration, decimals]);

  // Easing function for a smoother animation
  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <>
      {prefix}
      {currentValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
};

export default NumberCounter;
