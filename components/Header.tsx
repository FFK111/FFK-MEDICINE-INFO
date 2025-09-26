import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/30 backdrop-blur-lg shadow-lg border-b border-slate-100/10 py-4">
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-wide uppercase">
        FFK Medicine Info
      </h1>
    </header>
  );
};