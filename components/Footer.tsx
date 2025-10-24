import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full text-center py-4 mt-auto bg-white/70 backdrop-blur-lg border-t-2 border-border-dark animate-pop-in-bounce"
      style={{ animationDelay: '300ms' }}
    >
      <p className="text-slate-600 text-sm font-semibold">© 2025 Faisal Firoz Khan</p>
    </footer>
  );
};