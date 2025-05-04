'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-50" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full relative overflow-hidden"
    >
      <div className="relative w-[1.2rem] h-[1.2rem]">
        <Sun
          className={`h-[1.2rem] w-[1.2rem] absolute inset-0 transition-transform duration-300 ease-in-out ${
            theme === 'dark'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        />
        <Moon
          className={`h-[1.2rem] w-[1.2rem] absolute inset-0 transition-transform duration-300 ease-in-out ${
            theme === 'dark'
              ? '-translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
