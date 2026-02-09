import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 3 seconds total duration
    const duration = 3000; 
    const updateInterval = 50; // Update every 50ms
    const totalSteps = duration / updateInterval; // 200 steps
    const increment = 100 / totalSteps; // 0.5 increment

    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Calculate liquid level: from 160 (low) to 30 (high/full)
  // Text is centered around y=100. Text height is approx 100px.
  // 30 leaves room for the wave crest to cover the top.
  const liquidY = 160 - (percent / 100) * 130;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
      exit={{ 
        scale: 30, 
        opacity: 0,
        transition: { duration: 1.5, ease: "easeInOut" }
      }}
    >
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4">
        {/* SVG Container for the Text Fill Effect */}
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto font-bold tracking-tighter mix-font-loader"
        >
          <defs>
            {/* The Text Mask: Defines the shape of the liquid */}
            <mask id="textMask">
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dy=".35em" 
                fill="white" 
                className="text-8xl md:text-9xl font-black"
              >
                ProdUX
              </text>
            </mask>
          </defs>

          {/* 1. Base Text (Gray) */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            className="text-8xl md:text-9xl font-black fill-[#333333]"
          >
            ProdUX
          </text>

          {/* 2. Liquid Fill Layer (Orange, Masked by Text) */}
          <g mask="url(#textMask)">
            <motion.path
              fill="#EA912D"
              // Wave path: Standard sine wave using Q and T commands for smoothness
              d="M 0 0 Q 75 25 150 0 T 300 0 T 450 0 T 600 0 T 750 0 T 900 0 T 1050 0 T 1200 0 V 300 H 0 Z"
              initial={{ y: 200, x: 0 }}
              animate={{ 
                y: liquidY,
                x: [-600, 0] // Move 2 cycles (300 * 2) left to right
              }}
              transition={{
                y: { duration: 0.2, ease: "linear" },
                x: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop" 
                }
              }}
              // Ensure the path covers the width
              style={{ width: "100%", height: "100%" }}
            />
          </g>
        </svg>

        <div className="mt-8 font-mono text-xs text-white/30 tracking-[0.5em] uppercase">
          Initializing // {Math.floor(percent)}%
        </div>
      </div>
    </motion.div>
  );
}
