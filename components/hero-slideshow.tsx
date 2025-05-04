'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// You'll need to add actual image URLs here
const heroImages = [
  '/images/kansas-city-international-airport-new-terminal-skidmore-owings-and-merrill_1.jpg',
  '/images/kansas-city-international-airport-new-terminal-skidmore-owings-and-merrill_2.jpg',
  '/images/kansas-city-international-airport-new-terminal-skidmore-owings-and-merrill_3.jpg',
];

interface HeroSlideshowProps {
  children: React.ReactNode;
  interval?: number;
}

export function HeroSlideshow({
  children,
  interval = 5000,
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {/* Temporary colored background until images are added */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentIndex]})`,
              backgroundColor: ['#1a365d', '#2a4365', '#1e3a8a'][
                currentIndex % 3
              ],
            }}
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
