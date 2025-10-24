import React from 'react';

const SHAPES_COUNT = 15;
const COLORS = ['--primary-blue', '--accent-yellow', '--accent-pink', '--accent-green', '--accent-purple', '--accent-teal', '--accent-orange'];
const EASING_FUNCTIONS = [
  'ease-in-out',
  'ease-out',
  'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
];

const BackgroundShape: React.FC<{ index: number }> = ({ index }) => {
  const duration = Math.random() * 25 + 20; // 20s to 45s
  const delay = Math.random() * 20; // 0s to 20s delay
  const size = Math.random() * 60 + 20; // 20px to 80px
  const left = Math.random() * 100; // 0% to 100%
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const borderRadius = Math.random() > 0.5 ? '50%' : '10%';
  const easing = EASING_FUNCTIONS[Math.floor(Math.random() * EASING_FUNCTIONS.length)];
  const xDrift = Math.random() * 200 - 100; // -100px to +100px

  // FIX: Add CSS custom property '--x-drift' to the type definition for the style object.
  // React.CSSProperties does not include custom properties by default.
  const style: React.CSSProperties & { '--x-drift': string } = {
    position: 'absolute',
    bottom: `-${size + 10}px`,
    left: `${left}vw`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `var(${color})`,
    borderRadius,
    animation: `float-up-organic ${duration}s ${easing} ${delay}s infinite`,
    '--x-drift': `${xDrift}px`,
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
