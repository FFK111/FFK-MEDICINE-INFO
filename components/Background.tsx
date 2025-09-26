import React from 'react';
import { BackgroundCapsuleIcon } from './icons/BackgroundCapsuleIcon';
import { BackgroundDnaIcon } from './icons/BackgroundDnaIcon';
import { BackgroundPlusIcon } from './icons/BackgroundPlusIcon';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-200"></div>
      
      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20 animate-float">
        <BackgroundDnaIcon />
      </div>
      <div className="absolute top-10 right-1/4 w-24 h-24 opacity-25 animate-float" style={{ animationDelay: '2s' }}>
        <BackgroundCapsuleIcon />
      </div>
       <div className="absolute bottom-10 left-1/3 w-20 h-20 opacity-15 animate-float" style={{ animationDelay: '4s' }}>
        <BackgroundPlusIcon />
      </div>
       <div className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <BackgroundCapsuleIcon />
      </div>
      <div className="absolute bottom-1/2 left-10 w-28 h-28 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
        <BackgroundDnaIcon />
      </div>
       <div className="absolute top-1/2 right-10 w-20 h-20 opacity-15 animate-float" style={{ animationDelay: '5s' }}>
        <BackgroundPlusIcon />
      </div>

    </div>
  );
};