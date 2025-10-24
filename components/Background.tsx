import React from 'react';

// Inlined SVG for the background pattern
const MedicalPattern = () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
        <defs>
            <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' style={{stopColor: 'var(--primary-blue)', stopOpacity: 0.15}} />
                <stop offset='100%' style={{stopColor: 'var(--accent-pink)', stopOpacity: 0.15}} />
            </linearGradient>
        </defs>
        <path d='M10 10 L20 20 M20 10 L10 20' stroke='url(#grad1)' strokeWidth='2'/>
        <circle cx='50' cy='20' r='5' fill='url(#grad1)'/>
        <path d='M80 30 C 70 40, 70 50, 80 60' stroke='url(#grad1)' strokeWidth='2' fill='none'/>
        <path d='M20 70 L30 70 L30 80 L20 80 Z' fill='url(#grad1)'/>
        <circle cx='80' cy='80' r='8' stroke='url(#grad1)' strokeWidth='2' fill='none'/>
    </svg>
);

const dataUri = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'>
    <defs>
        <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' style='stop-color: rgba(0, 169, 255, 0.08)' />
            <stop offset='100%' style='stop-color: rgba(255, 102, 102, 0.08)' />
        </linearGradient>
    </defs>
    <path d='M10 10 L20 20 M20 10 L10 20' stroke='url(#grad1)' stroke-width='1.5' stroke-linecap='round'/>
    <circle cx='50' cy='20' r='4' fill='url(#grad1)'/>
    <path d='M80 30 C 70 40, 70 50, 80 60' stroke='url(#grad1)' stroke-width='1.5' fill='none' stroke-linecap='round'/>
    <rect x='15' y='65' width='10' height='10' rx='2' fill='url(#grad1)' />
    <circle cx='85' cy='85' r='6' stroke='url(#grad1)' stroke-width='1.5' fill='none'/>
    <path d='M45 75 L55 75 M50 70 L50 80' stroke='url(#grad1)' stroke-width='1.5' stroke-linecap='round'/>
  </svg>`
)}")`;


export const Background: React.FC = () => {
  return (
    <div 
        className="fixed inset-0 z-0 overflow-hidden bg-cream-100 animate-bg-pan"
        style={{
            backgroundImage: dataUri,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
        }}
    />
  );
};