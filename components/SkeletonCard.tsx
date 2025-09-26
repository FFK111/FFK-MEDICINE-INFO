import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl shadow-lg p-6 bg-gray-800/50 backdrop-blur-xl border-l-4 border-gray-600 relative overflow-hidden">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700/80"></div>
            <div className="flex-grow space-y-3">
                <div className="h-5 w-4/6 rounded-md bg-gray-700/80"></div>
                <div className="h-4 w-full rounded-md bg-gray-700/80"></div>
                <div className="h-4 w-5/6 rounded-md bg-gray-700/80"></div>
            </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-shimmer"></div>
    </div>
  );
};