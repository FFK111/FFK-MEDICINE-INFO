import React from 'react';

const SHAPES_COUNT = 15;
const COLORS = ['--primary-blue', '--accent-yellow', '--accent-pink', '--accent-green', '--accent-purple', '--accent-teal', '--accent-orange'];

const BackgroundShape: React.FC<{ index: number }> = ({ index }) => {
  const duration = Math.random() * 15 + 10; // 10s to 25s
  const delay = Math.random() * 15; // 0s to 15s delay
  const size = Math.random() * 60 + 20; // 20px to 80px
  const left = Math.random() * 100; // 0% to 100%
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const borderRadius = Math.random() > 0.5 ? '50%' : '10%'; // circle or square

  const style: React.CSSProperties = {
    position: 'absolute',
    bottom: `-${size + 10}px`,
    left: `${left}vw`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `var(${color})`,
    borderRadius,
    animation: `float-up ${duration}s linear ${delay}s infinite`,
    opacity: 0,
    filter: 'blur(5px)',
  };

  return <span style={style}></span>;
};

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-cream">
      {Array.from({ length: SHAPES_COUNT }).map((_, i) => (
        <BackgroundShape key={i} index={i} />
      ))}
    </div>
  );
};
