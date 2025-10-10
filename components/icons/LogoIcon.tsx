import React from 'react';

export const LogoIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--brand-electric-blue)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand-magenta)', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#logoGradient)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H8v-2h3V7h2v4h3v2h-3v4h-2z" />
  </svg>
);
