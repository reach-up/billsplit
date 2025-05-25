"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't apply any theme-specific styles until client-side hydration is complete
  const backgroundColor = mounted ? (isDarkMode ? '#111827' : 'transparent') : 'transparent';
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: backgroundColor,
      backgroundImage: isDarkMode 
        ? 'none' 
        : 'linear-gradient(to bottom right, #E4D3FB, white, #B5F5E0)',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-color 0.3s ease, background-image 0.3s ease'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("/pattern.svg")',
        opacity: isDarkMode ? 0.03 : 0.05,
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
        transition: 'opacity 0.3s ease'
      }}></div>
      <div style={{
        position: 'relative',
        margin: '0 auto',
        maxWidth: '28rem',
        padding: '1rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <main style={{
          flex: 1,
          marginTop: '1.5rem',
          paddingBottom: '2rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '28rem',
            backgroundColor: isDarkMode ? '#1F2937' : 'white',
            borderRadius: '0.75rem',
            boxShadow: isDarkMode 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: isDarkMode ? '1px solid #374151' : '1px solid #E4D3FB',
            padding: '1.5rem 2rem',
            transition: 'background-color 0.3s, border 0.3s, box-shadow 0.3s'
          }}>
            {children}
          </div>
          {/* Footer is used instead of this */}
        </main>
      </div>
    </div>
  );
}
