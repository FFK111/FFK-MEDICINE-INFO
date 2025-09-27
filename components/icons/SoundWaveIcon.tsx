import React from 'react';

export const SoundWaveIcon: React.FC = () => (
    <div className="flex items-end justify-center w-full h-full gap-0.5">
        <span
            className="w-1 bg-current rounded-full"
            style={{ animation: 'speak-wave 1.2s ease-in-out infinite', animationDelay: '0s', transformOrigin: 'bottom' }}
        />
        <span
            className="w-1 bg-current rounded-full"
            style={{ animation: 'speak-wave 1.2s ease-in-out infinite', animationDelay: '0.2s', transformOrigin: 'bottom' }}
        />
        <span
            className="w-1 bg-current rounded-full"
            style={{ animation: 'speak-wave 1.2s ease-in-out infinite', animationDelay: '0.4s', transformOrigin: 'bottom' }}
        />
    </div>
);