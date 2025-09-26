import React from 'react';

export const Background: React.FC = () => {
  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(rgba(11, 15, 25, 0.85), rgba(11, 15, 25, 0.85)),
      url('https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=80&w=2070&auto=format&fit=crop')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <div 
      className="fixed inset-0 -z-10 h-full w-full"
      style={backgroundStyle}
    >
    </div>
  );
};
