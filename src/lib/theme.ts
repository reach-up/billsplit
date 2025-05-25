/**
 * BillSplit App Theme
 * Centralized color and styling definitions
 */

export const theme = {
  colors: {
    // Primary palette - Vibrant purple
    primary: {
      50: '#F8F0FF',
      100: '#F4E8FF',
      200: '#E4D3FB',
      300: '#C9A9F4',
      400: '#9E77ED',
      500: '#7C3AED',  // Primary brand color - more vibrant purple
      600: '#6D28D9',  // Brighter, more saturated
      700: '#5B21B6',
      800: '#4C1D95',
      900: '#2E1065',
    },
    
    // Secondary accent color - Teal
    accent: {
      50: '#EFFCF6',
      100: '#DEFDF0',
      200: '#B5F5E0',
      300: '#84E1BC',
      400: '#31C48D',
      500: '#0E9F6E',  // Secondary brand color
      600: '#057A55',
      700: '#046C4E',
      800: '#03543F',
      900: '#014737',
    },
    
    // Highlight color - Orange for contrast
    highlight: {
      50: '#FFF8F1',
      100: '#FEECDC',
      200: '#FCD9BD',
      300: '#FDBA8C',
      400: '#FF8A4C',
      500: '#F97316',  // Highlight for CTAs and important elements
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
    
    // Neutral colors
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    
    // Accent colors for success, warning, error states
    success: {
      50: '#ECFDF5',
      500: '#10B981',
      700: '#047857',
    },
    warning: {
      50: '#FFFBEB',
      500: '#F59E0B',
      700: '#B45309',
    },
    error: {
      50: '#FEF2F2',
      500: '#EF4444',
      700: '#B91C1C',
    },
    
    // Background colors
    background: {
      app: '#F8FAFC',  // Very light blue-ish white
      card: '#FFFFFF',
      highlight: '#F8F0FF',
      subtle: '#F1F5F9',  // Light blue-gray
      dark: '#0F172A',     // Deep blue-gray for dark mode
    },
  },
  
  // Font sizes following a consistent scale
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  
  // Spacing values for consistent layout
  spacing: {
    '0': '0',
    '1': '0.25rem', // 4px
    '2': '0.5rem',  // 8px
    '3': '0.75rem', // 12px
    '4': '1rem',    // 16px
    '5': '1.25rem', // 20px
    '6': '1.5rem',  // 24px
    '8': '2rem',    // 32px
    '10': '2.5rem', // 40px
    '12': '3rem',   // 48px
    '16': '4rem',   // 64px
  },
  
  // Standardized border radius values
  borderRadius: {
    'none': '0',
    'sm': '0.125rem',   // 2px
    'md': '0.375rem',   // 6px
    'lg': '0.5rem',     // 8px
    'xl': '0.75rem',    // 12px
    '2xl': '1rem',      // 16px
    'full': '9999px',
  },
  
  // Drop shadows
  boxShadow: {
    'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  
  // Animation durations
  animation: {
    'fast': '150ms',
    'normal': '300ms',
    'slow': '500ms',
  },
};

export default theme;
