import React from 'react';

/**
 * A serene, multi-layered mountain landscape background.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-sky-200 via-purple-300 to-indigo-400">
      {/* Frosted glass effect overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      {/* Mountain Layers Container */}
      <div className="absolute bottom-0 left-0 w-full h-2/3">
        {/* Furthest mountain layer */}
        <div 
          className="absolute bottom-0 w-full h-full bg-indigo-300/60"
          style={{
            clipPath: 'polygon(0% 70%, 15% 55%, 30% 75%, 45% 60%, 60% 80%, 75% 50%, 90% 75%, 100% 65%, 100% 100%, 0% 100%)'
          }}
        ></div>

        {/* Middle mountain layer */}
        <div 
          className="absolute bottom-0 w-full h-full bg-purple-400/60"
          style={{
            clipPath: 'polygon(0% 85%, 20% 70%, 40% 88%, 55% 72%, 70% 90%, 85% 65%, 100% 80%, 100% 100%, 0% 100%)'
          }}
        ></div>
        
        {/* Closest mountain layer */}
        <div 
          className="absolute bottom-0 w-full h-full bg-indigo-500/60"
          style={{
            clipPath: 'polygon(0% 100%, 25% 80%, 50% 95%, 75% 82%, 100% 100%)'
          }}
        ></div>
      </div>
    </div>
  );
};
