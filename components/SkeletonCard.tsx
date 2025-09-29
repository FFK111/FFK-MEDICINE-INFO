import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl shadow-lg p-6 bg-slate-900/50 backdrop-blur-xl border border-white/10 border-t-4 border-slate-700 relative overflow-hidden">
        <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800/70"></div>
            <div className="flex-grow h-5 w-4/6 rounded-md bg-slate-800/70"></div>
        </div>
        <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-slate-800/70"></div>
            <div className="h-4 w-5/6 rounded-md bg-slate-800/70"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
    </div>
  );
};