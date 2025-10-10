import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-950/60 backdrop-blur-lg shadow-lg border-b border-white/5 py-3 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-9 h-9">
            <LogoIcon />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gradient tracking-wider font-orbitron" style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.3)' }}>
            FFK MEDICINE INFO
          </h1>
        </div>
      </div>
    </header>
  );
};
