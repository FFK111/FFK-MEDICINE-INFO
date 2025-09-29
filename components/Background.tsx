import React from 'react';

/**
 * A professional and elegant abstract night sky background with slowly flowing particle streams.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
      <div className="abstract-night-sky-bg">
        <div className="particle-stream-1"></div>
        <div className="particle-stream-2"></div>
        <div className="particle-stream-3"></div>
      </div>
    </div>
  );
};
