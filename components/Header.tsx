import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/30 backdrop-blur-lg shadow-lg border-b border-black/10 py-4">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide uppercase">
        💊 FFK Medicine Info
      </h1>
    </header>
  );
};