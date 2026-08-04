"use client";

import React, { useState, useEffect } from 'react';

interface CountdownLoaderProps {
  text?: string;
  className?: string;
  circleColor?: string;
  textColor?: string;
}

export default function CountdownLoader({
  text = "Loading Content... Please wait",
  className = "min-h-screen bg-slate-50 flex items-center justify-center",
  circleColor = "#dca12f",
  textColor = "text-slate-500"
}: CountdownLoaderProps) {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Static background circle */}
          <div
            className="absolute inset-0 border-4 rounded-full"
            style={{ borderColor: `${circleColor}20` }}
          ></div>
          {/* Animated spinning circle */}
          <div
            className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style={{ borderTopColor: circleColor }}
          ></div>
          {/* Countdown text */}
          <span
            className="text-3xl font-bold"
            style={{ color: circleColor }}
          >
            {countdown}
          </span>
        </div>
        <p className={`font-medium ${textColor}`}>{text}</p>
      </div>
    </div>
  );
}
