import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';
import { SoundWaveIcon } from './icons/SoundWaveIcon';

interface InfoCardProps {
  title: string;
  content: string;
  variant?: 'default' | 'disclaimer' | 'safety' | 'warning' | 'teal' | 'purple' | 'orange';
  onToggleSpeak?: () => void;
  isSpeaking: boolean;
  highlightForAutoplay?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, variant = 'default', onToggleSpeak, isSpeaking, highlightForAutoplay = false }) => {

  const variants = {
    default: {
      border: 'border-primary-blue',
      background: 'bg-primary-blue/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
    warning: {
      border: 'border-accent-pink',
      background: 'bg-accent-pink/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
    disclaimer: {
      border: 'border-accent-yellow',
      background: 'bg-accent-yellow/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    safety: {
      border: 'border-accent-green',
      background: 'bg-accent-green/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
    teal: {
      border: 'border-accent-teal',
      background: 'bg-accent-teal/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
    purple: {
      border: 'border-accent-purple',
      background: 'bg-accent-purple/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
    orange: {
      border: 'border-accent-orange',
      background: 'bg-accent-orange/10',
      titleText: 'text-text-dark',
      contentText: 'text-slate-700',
    },
  };
  
  const theme = variants[variant] || variants.default;
  const showSpeakButton = !!onToggleSpeak;
  const isDisclaimer = variant === 'disclaimer';
  const contentFontSize = isDisclaimer ? 'text-base' : 'text-lg';

  const cardClasses = `relative w-full p-4 sm:p-5 rounded-2xl comic-border comic-shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:comic-shadow ${theme.border} ${theme.background} backdrop-blur-lg ${highlightForAutoplay ? 'animate-pulse-glow-multi' : ''}`;

  return (
    <div className={cardClasses}>
      <div className="flex items-center">
        <h3 className={`flex-grow font-heading font-bold text-lg sm:text-xl ${theme.titleText}`}>
          {title}
        </h3>
        {showSpeakButton && (
            <button
              onClick={onToggleSpeak}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-blue ${
                isSpeaking ? 'bg-accent-pink text-white' : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200/70'
              }`}
              aria-label={isSpeaking ? 'Stop speaking' : 'Speak content'}
            >
                <div className="w-6 h-6">
                    {isSpeaking ? <SoundWaveIcon /> : <SpeakerIcon />}
                </div>
            </button>
        )}
      </div>
      <p className={`mt-4 font-semibold ${theme.contentText} ${contentFontSize}`}>
        {content}
      </p>
    </div>
  );
};