import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl shadow-lg p-6 bg-white/30 backdrop-blur-xl border-l-4 border-gray-300/50 relative overflow-hidden">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200/50"></div>
            <div className="flex-grow space-y-3">
                <div className="h-5 w-4/6 rounded-md bg-gray-200/50"></div>
                <div className="h-4 w-full rounded-md bg-gray-200/50"></div>
                <div className="h-4 w-5/6 rounded-md bg-gray-200/50"></div>
            </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
    </div>
  );
};
