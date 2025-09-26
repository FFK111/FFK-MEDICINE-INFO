import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/20 backdrop-blur-lg shadow-lg border-b border-white/20 py-4">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-wide uppercase">
        FFK Medicine Info
      </h1>
    </header>
  );
};