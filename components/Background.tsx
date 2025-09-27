import React from 'react';
import { BackgroundCapsuleIcon } from './icons/BackgroundCapsuleIcon';
import { BackgroundDnaIcon } from './icons/BackgroundDnaIcon';
import { BackgroundPillIcon } from './icons/BackgroundPillIcon';
import { BackgroundPlusIcon } from './icons/BackgroundPlusIcon';
import { BackgroundStethoscopeIcon } from './icons/BackgroundStethoscopeIcon';

/**
 * A modern, materialistic background with a soft gradient and animated shapes.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-100 to-violet-100">
        {/* Blurred colored shapes for a soft, materialistic effect */}
        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 lg:w-1/2 lg:h-1/2 bg-cyan-300/40 rounded-full filter blur-3xl animate-pulse opacity-50"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 lg:w-1/2 lg:h-1/2 bg-blue-300/40 rounded-full filter blur-3xl animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute -top-1/4 -right-1/4 w-72 h-72 lg:w-1/3 lg:h-1/3 bg-violet-300/30 rounded-full filter blur-3xl animate-pulse opacity-50" style={{animationDelay: '4s'}}></div>

        {/* The main content will sit on top of this, but below the UI, so a subtle blur on top of the background can be nice. */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
        {/* Decorative icons, toned down for the new background */}
        <div className="absolute -top-10 -left-10 w-48 h-48 opacity-10 transform-gpu rotate-12 text-blue-900/40">
            <BackgroundPillIcon />
        </div>
        <div className="absolute -bottom-16 -right-10 w-64 h-64 opacity-10 transform-gpu -rotate-12 text-blue-900/40">
            <BackgroundStethoscopeIcon />
        </div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-5 transform-gpu -translate-y-1/2 text-blue-900/40">
            <BackgroundCapsuleIcon />
        </div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-5 transform-gpu rotate-45 text-blue-900/40">
            <BackgroundDnaIcon />
        </div>
        <div className="absolute bottom-1/4 left-1/8 w-20 h-20 opacity-10 transform-gpu -rotate-45 text-blue-900/40">
            <BackgroundPlusIcon />
        </div>
    </div>
  );
};
