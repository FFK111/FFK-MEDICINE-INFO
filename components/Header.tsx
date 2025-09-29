import React from 'react';

const MedicalCrossIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 1 18 0a9 9 0 1 1 -18 0" />
    <path d="M12 8l0 8" />
    <path d="M8 12l8 0" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/15 backdrop-blur-3xl shadow-md border-b border-white/20 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-9 h-9 text-red-500">
            <MedicalCrossIcon />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent tracking-tight">
            FFK Medicine Info
          </h1>
        </div>
      </div>
    </header>
  );
};