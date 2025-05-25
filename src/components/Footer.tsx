"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="w-full flex justify-center items-center py-4 mt-auto transition-colors duration-300">
      <p className="text-xs font-medium text-center">
        <span className={`${theme === 'dark' ? 'text-neutral-500' : 'text-[#99a1af]'} transition-colors duration-300`}>Powered by </span>
        <a
          href="https://gemini.google.com/"
          target="_blank"
          className={`${theme === 'dark' ? 'text-neutral-300' : 'text-[#4a5565]'} underline transition-colors duration-300`}
        >
          Google Gemini
        </a>
      </p>
    </footer>
  );
}
