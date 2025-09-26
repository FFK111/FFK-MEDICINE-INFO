import React from 'react';

export const Background: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-emerald-200 via-cyan-300 to-sky-500"
    >
      <div className="absolute inset-0 bg-white/10"></div>
    </div>
  );
};
