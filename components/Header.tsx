import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-lg border-b-4 border-border-dark py-3 sticky top-0 z-20 animate-pop-in-bounce">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-10 h-10">
            <LogoIcon />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient font-heading tracking-tighter">
            FFK Medscan pro
          </h1>
        </div>
      </div>
    </header>
  );
};