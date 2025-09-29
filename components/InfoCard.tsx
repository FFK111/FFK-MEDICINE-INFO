import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';
import { SoundWaveIcon } from './icons/SoundWaveIcon';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  variant?: 'default' | 'disclaimer' | 'safety';
  onToggleSpeak?: () => void;
  isSpeaking: boolean;
  highlightForAutoplay?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, variant = 'default', onToggleSpeak, isSpeaking, highlightForAutoplay = false }) => {
  const variants = {
    default: {
      border: 'border-red-500',
      iconBg: 'bg-red-100/50',
      iconText: 'text-red-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700 font-semibold',
    },
    disclaimer: {
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100/50',
      iconText: 'text-yellow-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-600',
    },
    safety: {
      border: 'border-green-500',
      iconBg: 'bg-green-100/50',
      iconText: 'text-green-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700 font-semibold',
    },
  };
  
  const theme = variants[variant];
  const isDisclaimer = variant === 'disclaimer';
  const showSpeakButton = !isDisclaimer && onToggleSpeak;
  const contentFontSize = isDisclaimer ? 'text-sm' : 'text-lg';

  const glowAnimationClasses = {
    default: 'animate-pulse-glow-red',
    safety: 'animate-pulse-glow-green',
    disclaimer: 'animate-pulse-glow-yellow',
  };

  const speakingAnimation = isSpeaking ? glowAnimationClasses[variant] : '';

  return (
    <div className={`
      group relative overflow-hidden
      rounded-2xl p-6 shadow-xl
      bg-white/15 backdrop-blur-3xl
      border border-white/20
      border-t-4 ${theme.border}
      transition-all duration-500 ease-out
      transform
      hover:[transform:rotateX(7deg)_scale(1.03)] hover:shadow-2xl
      ${speakingAnimation}
    `}>
      <div className="card-glare"></div>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${theme.iconBg}`}>
          <div className={`${theme.iconText} w-5 h-5`}>
            {icon}
          </div>
        </div>
        <h3 className={`flex-grow text-xl font-extrabold uppercase tracking-wider ${theme.titleText}`}>
          {title}
        </h3>
        {showSpeakButton && (
          <button
            onClick={onToggleSpeak}
            aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
            className={`group p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-white transform hover:scale-110 active:scale-95 ${
              isSpeaking
                ? 'bg-red-200 text-red-700 hover:bg-red-300'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            } ${highlightForAutoplay ? 'animate-pulse-button-glow' : ''}`}
          >
            <div className="w-6 h-6">
              {isSpeaking ? (
                <>
                  <div className="hidden group-hover:block">
                    <StopIcon />
                  </div>
                  <div className="block group-hover:hidden">
                    <SoundWaveIcon />
                  </div>
                </>
              ) : (
                <SpeakerIcon />
              )}
            </div>
          </button>
        )}
      </div>
      <p className={`${contentFontSize} whitespace-pre-wrap ${theme.contentText}`}>
        {content}
      </p>
    </div>
  );
};