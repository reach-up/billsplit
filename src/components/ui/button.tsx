"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger' | 'highlight';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    // Define base styles with direct colors
    const baseStyles = 'inline-flex items-center justify-center gap-3 font-semibold rounded-lg transition-colors';
    
    // Size variants with explicit sizing
    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-md',
      md: 'text-sm px-4 py-2.5 rounded-lg',
      lg: 'text-base px-5 py-3 rounded-lg',
      xl: 'text-lg px-6 py-4 rounded-xl',
    };
    
    // Color variants with explicit hex colors and dark mode support
    const variantStyles = {
      primary: isDarkMode
        ? 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white border border-[#5B21B6] shadow-md'
        : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white border border-[#5B21B6] shadow-sm',
      secondary: isDarkMode
        ? 'bg-[#0E9F6E] hover:bg-[#057A55] text-white border border-[#057A55] shadow-md'
        : 'bg-[#0E9F6E] hover:bg-[#057A55] text-white border border-[#057A55] shadow-sm',
      outline: isDarkMode
        ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-2 border-neutral-600'
        : 'bg-white hover:bg-[#F8F0FF] text-[#4C1D95] border-2 border-[#C9A9F4]',
      ghost: isDarkMode
        ? 'bg-transparent hover:bg-neutral-800 text-neutral-200'
        : 'bg-transparent hover:bg-[#F3F4F6] text-[#1F2937]',
      link: isDarkMode
        ? 'bg-transparent text-[#C9A9F4] hover:text-[#E4D3FB] hover:underline p-0 underline-offset-4'
        : 'bg-transparent text-[#6D28D9] hover:text-[#5B21B6] hover:underline p-0 underline-offset-4',
      danger: isDarkMode
        ? 'bg-[#EF4444] hover:bg-[#B91C1C] text-white border border-[#B91C1C] shadow-md'
        : 'bg-[#EF4444] hover:bg-[#B91C1C] text-white border border-[#B91C1C] shadow-sm',
      highlight: isDarkMode
        ? 'bg-[#F97316] hover:bg-[#EA580C] text-white border border-[#EA580C] shadow-lg'
        : 'bg-[#F97316] hover:bg-[#EA580C] text-white border border-[#EA580C] shadow-md',
    };
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';
    
    // Combine all styles
    const buttonClasses = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      widthStyle,
      className
    );
    
    // Use style prop to ensure text is visible with dark mode support
    const getTextStyle = () => {
      switch(variant) {
        case 'primary':
        case 'secondary':
        case 'danger':
        case 'highlight':
          return { color: 'white', fontWeight: 'bold' };
        case 'outline':
          return { 
            color: isDarkMode ? '#E4D3FB' : '#4C1D95', 
            fontWeight: 'bold' 
          };
        case 'ghost':
          return { 
            color: isDarkMode ? '#E4D3FB' : '#1F2937', 
            fontWeight: 'bold' 
          };
        case 'link':
          return { 
            color: isDarkMode ? '#C9A9F4' : '#6D28D9', 
            fontWeight: 'bold' 
          };
        default:
          return { color: 'white', fontWeight: 'bold' };
      }
    };
    
    return (
      <button 
        className={buttonClasses} 
        ref={ref} 
        style={getTextStyle()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

