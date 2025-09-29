import React from 'react';

const Shape: React.FC<{ className: string, style: React.CSSProperties }> = ({ className, style }) => (
  <div
    className={`absolute rounded-full ${className}`}
    style={style}
  />
);

/**
 * A light, Material Design-inspired background with floating geometric shapes.
 */
export const Background: React.FC = () => {
  const shapes = [
    {
      className: 'bg-red-200/50',
      style: {
        width: '150px',
        height: '150px',
        top: '10%',
        left: '15%',
        animation: 'float-subtle 20s ease-in-out infinite alternate',
      },
    },
    {
      className: 'bg-blue-200/50',
      style: {
        width: '200px',
        height: '200px',
        bottom: '5%',
        right: '10%',
        animation: 'float-subtle-reverse 25s ease-in-out infinite alternate',
      },
    },
    {
        className: 'bg-yellow-200/40',
        style: {
            width: '100px',
            height: '100px',
            top: '25%',
            right: '20%',
            animation: 'float-subtle 22s ease-in-out infinite alternate',
        },
    },
    {
        className: 'bg-green-200/40',
        style: {
            width: '180px',
            height: '180px',
            bottom: '20%',
            left: '5%',
            animation: 'float-subtle-reverse 18s ease-in-out infinite alternate',
        },
    },
  ];

  return (
    <div className="fixed inset-0 z-0 bg-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,220,255,0.3),rgba(255,255,255,0))]"></div>
      {shapes.map((shape, index) => (
        <Shape key={index} className={shape.className} style={shape.style} />
      ))}
    </div>
  );
};