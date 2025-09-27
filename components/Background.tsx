import React from 'react';

/**
 * A simple, stable background component to ensure the application renders.
 * This replaces a previously corrupted version that was causing a crash.
 */
export const Background: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-0 bg-slate-100"
    />
  );
};
