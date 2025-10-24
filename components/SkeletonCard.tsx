import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-6 bg-white comic-border border-slate-300 relative overflow-hidden">
        <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-200"></div>
            <div className="flex-grow h-6 w-4/6 rounded-md bg-slate-200"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 w-full rounded-md bg-slate-200"></div>
            <div className="h-4 w-5/6 rounded-md bg-slate-200"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
    </div>
  );
};