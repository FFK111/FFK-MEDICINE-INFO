import React from 'react';

const mountainImageUrl = 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop';

/**
 * A beautiful and serene background featuring a blurred mountain landscape.
 */
export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mountainImageUrl})` }}
      />
      <div className="absolute inset-0 bg-slate-950/60" /> {/* Dark overlay for contrast */}
    </div>
  );
};