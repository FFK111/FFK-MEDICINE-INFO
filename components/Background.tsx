import React from 'react';
import { BackgroundCapsuleIcon } from './icons/BackgroundCapsuleIcon';
import { BackgroundDnaIcon } from './icons/BackgroundDnaIcon';
import { BackgroundPillIcon } from './icons/BackgroundPillIcon';
import { BackgroundPlusIcon } from './icons/BackgroundPlusIcon';
import { BackgroundStethoscopeIcon } from './icons/BackgroundStethoscopeIcon';

/**
 * A modern, materialistic background with a soft gradient and animated scenic shapes.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-sky-100">
        {/* Blurred colored shapes for a soft, materialistic effect */}
        <div 
            className="absolute -top-24 -left-24 w-72 h-72 lg:w-96 lg:h-96 bg-rose-200/60 rounded-full filter blur-3xl animate-float opacity-50"
            style={{animationDelay: '0s', animationDuration: '15s'}}
        ></div>
        <div 
            className="absolute -bottom-24 -right-12 w-72 h-72 lg:w-96 lg:h-96 bg-sky-200/60 rounded-full filter blur-3xl animate-float opacity-50" 
            style={{animationDelay: '3s', animationDuration: '17s'}}
        ></div>
        <div 
            className="absolute top-1/2 -right-24 w-64 h-64 lg:w-80 lg:h-80 bg-violet-200/50 rounded-full filter blur-3xl animate-float opacity-40" 
            style={{animationDelay: '6s', animationDuration: '19s'}}
        ></div>
        <div 
            className="absolute bottom-1/4 -left-24 w-64 h-64 lg:w-80 lg:h-80 bg-teal-100/60 rounded-full filter blur-3xl animate-float opacity-50" 
            style={{animationDelay: '1s', animationDuration: '21s'}}
        ></div>

        {/* Frosted glass overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />
      
        {/* Decorative icons, toned down for the new background */}
        <div className="absolute -top-10 -left-10 w-48 h-48 opacity-5 transform-gpu rotate-12 text-slate-900/50">
            <BackgroundPillIcon />
        </div>
        <div className="absolute -bottom-16 -right-10 w-64 h-64 opacity-5 transform-gpu -rotate-12 text-slate-900/50">
            <BackgroundStethoscopeIcon />
        </div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 opacity-5 transform-gpu -translate-y-1/2 text-slate-900/50">
            <BackgroundCapsuleIcon />
        </div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-5 transform-gpu rotate-45 text-slate-900/50">
            <BackgroundDnaIcon />
        </div>
        <div className="absolute bottom-1/4 left-1/8 w-20 h-20 opacity-5 transform-gpu -rotate-45 text-slate-900/50">
            <BackgroundPlusIcon />
        </div>
    </div>
  );
};