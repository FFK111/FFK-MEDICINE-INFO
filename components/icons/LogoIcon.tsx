import React from 'react';

export const LogoIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--primary-blue)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--accent-pink)' }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
    <path
      d="M50 25 V 75 M25 50 H 75"
      stroke="white"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);