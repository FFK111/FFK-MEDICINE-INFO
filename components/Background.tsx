import React from 'react';

const SHAPES_COUNT = 25; // A good number for an ambient effect
const COLORS = ['--primary-blue', '--accent-yellow', '--accent-pink', '--accent-green', '--accent-purple', '--accent-teal', '--accent-orange'];
const EASING_FUNCTIONS = [
  'ease-in-out',
  'ease-out',
  'linear',
  'cubic-bezier(0.25, 0.1, 0.25, 1)'
];

const BackgroundShape: React.FC<{ index: number }> = ({ index }) => {
  const duration = Math.random() * 10 + 8; // 8s to 18s, shorter for fade effect
  const delay = Math.random() * 1; // Staggered start over 1 second, much faster
  const size = Math.random() * 80 + 30; // 30px to 110px
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const borderRadius = Math.random() > 0.5 ? '50%' : '10%';
  const easing = EASING_FUNCTIONS[Math.floor(Math.random() * EASING_FUNCTIONS.length)];
  const xDrift = Math.random() * 60 - 30; // -30px to +30px
  const yDrift = Math.random() * 60 - 30; // -30px to +30px

  const style: React.CSSProperties & { '--x-drift': string; '--y-drift': string } = {
    position: 'absolute',
    top: `${top}vh`,
    left: `${left}vw`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `var(${color})`,
    borderRadius,
    animation: `fade-in-out-drift ${duration}s ${easing} ${delay}s infinite`,
    '--x-drift': `${xDrift}px`,
    '--y-drift': `${yDrift}px`,
    opacity: 0,
    filter: 'blur(12px)', // A bit more blur for a softer effect
    transform: 'translate(-50%, -50%)', // Center the shape on its coordinates
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