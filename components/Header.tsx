import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-sm shadow-md py-4">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-blue-600 tracking-wide uppercase">
        FFK Medicine Info
      </h1>
    </header>
  );
};