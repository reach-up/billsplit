"use client";

import Link from "next/link";
import { theme } from "../lib/theme";

export default function Header() {
  return (
    <header style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.25rem',
      borderBottom: '1px solid #E4D3FB',
      marginBottom: '1.5rem',
      position: 'sticky',
      top: 0,
      background: 'linear-gradient(to right, white, #F8F0FF)',
      backdropFilter: 'blur(8px)',
      zIndex: 10,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    }}>
      <Link href="/" style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none'
      }}>
        <div style={{
          position: 'relative',
          height: '2.75rem',
          width: '2.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #6D28D9, #0E9F6E)',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5H22M6 16.5H8M10.5 16.5H16M6 12.5H10M12.5 12.5H18M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </Link>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <a
          href="https://github.com/nutlope/billsplit"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            color: '#4B5563',
            backgroundColor: 'transparent',
            transition: 'all 0.2s',
            fontSize: '0.875rem',
            fontWeight: '500',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#F8F0FF';
            e.currentTarget.style.color = '#6D28D9';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4B5563';
          }}
          aria-label="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span id="github-text" style={{
            display: 'none'
          }}>GitHub</span>
          <style jsx>{`
            @media (min-width: 640px) {
              #github-text {
                display: inline !important;
              }
            }
          `}</style>
        </a>
        
        <button 
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            color: '#4B5563',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#F8F0FF';
            e.currentTarget.style.color = '#6D28D9';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#4B5563';
          }}
          aria-label="Toggle theme"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
