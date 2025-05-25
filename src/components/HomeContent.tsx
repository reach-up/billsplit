"use client";

import React, { useEffect, useState } from "react";
import ClearStorageLink from "@/components/ClearStorageLink";
import { useTheme } from "@/context/ThemeContext";

export default function HomeContent() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This useEffect ensures the component is mounted before rendering with theme
  // to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Force a document class update when theme changes
  useEffect(() => {
    if (mounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  }, [theme, mounted]);
  
  // If not mounted yet, render with a basic structure to avoid flicker
  if (!mounted) {
    return (
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 text-center gap-4 max-w-[300px] md:max-w-[388px]">
        <div className="invisible">{/* Content will be invisible until mounted */}</div>
      </main>
    );
  }
  
  return (
    <main className="flex flex-col items-center justify-center flex-grow w-full px-4 text-center gap-4 max-w-[300px] md:max-w-[388px] transition-colors duration-300">
      {/* Debug toggle */}
      <button 
        onClick={toggleTheme} 
        className="absolute top-2 right-2 text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-700 dark:text-neutral-200"
      >
        Theme: {theme === 'dark' ? 'Dark' : 'Light'}
      </button>
      <div className="flex flex-col items-center justify-center">
        <div className="w-20 h-20 mb-8 flex items-center justify-center bg-gradient-to-br from-[#6D28D9] to-[#0E9F6E] rounded-xl shadow-md">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M2 8.5H22M6 16.5H8M10.5 16.5H16M6 12.5H10M12.5 12.5H18M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-2 text-[#1e2939] dark:text-white transition-colors duration-300">
            Scan. Tap. Split.
          </h1>
          <p className="text-sm sm:text-base max-w-xs sm:max-w-sm text-[#4a5565] dark:text-neutral-300 transition-colors duration-300">
            Snap the receipt, tap your items, see who owes what. No sign-ups,
            no math, no drama.
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-3">
        <ClearStorageLink href="/app?mode=camera">
          <img src="/camera.svg" className="w-4 h-4" />
          <p className="text-base font-semibold">Scan Receipt</p>
        </ClearStorageLink>
        <ClearStorageLink href="/app?mode=manual" variant="secondary">
          <p className="text-base font-medium text-[#364153] dark:text-neutral-200 transition-colors duration-300">
            Enter Manually
          </p>
        </ClearStorageLink>
      </div>
    </main>
  );
}
