import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';
import { SoundWaveIcon } from './icons/SoundWaveIcon';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  variant?: 'default' | 'disclaimer' | 'safety' | 'warning' | 'teal' | 'purple' | 'orange';
  onToggleSpeak?: () => void;
  isSpeaking: boolean;
  highlightForAutoplay?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, variant = 'default', onToggleSpeak, isSpeaking, highlightForAutoplay = false }) => {

  const variants = {
    default: {
      border: 'border-primary-blue',
      iconBg: 'bg-primary-blue',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    warning: {
      border: 'border-accent-pink',
      iconBg: 'bg-accent-pink',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    disclaimer: {
      border: 'border-accent-yellow',
      iconBg: 'bg-accent-yellow',
      iconText: 'text-border-dark',
      titleText: 'text-text-dark',
      contentText: 'text-slate-500',
    },
    safety: {
      border: 'border-accent-green',
      iconBg: 'bg-accent-green',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    teal: {
      border: 'border-accent-teal',
      iconBg: 'bg-accent-teal',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    purple: {
      border: 'border-accent-purple',
      iconBg: 'bg-accent-purple',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
    orange: {
      border: 'border-accent-orange',
      iconBg: 'bg-accent-orange',
      iconText: 'text-white',
      titleText: 'text-text-dark',
      contentText: 'text-slate-600',
    },
  };
  
  const theme = variants[variant] || variants.default;
  const showSpeakButton = !!onToggleSpeak;
  const isDisclaimer = variant === 'disclaimer';
  const contentFontSize = isDisclaimer ? 'text-sm' : 'text-base';

  const cardClasses = `relative w-full bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl comic-border comic-shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:comic-shadow ${theme.border} ${highlightForAutoplay ? 'animate-pulse-glow-multi' : ''}`;

  return (
    <div className={cardClasses}>
      <div className="flex items-center space-x-4">
        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center p-2 ${theme.iconBg} ${theme.iconText} comic-shadow-sm`}>
          {icon}
        </div>
        <h3 className={`flex-grow font-heading font-bold text-lg sm:text-xl ${theme.titleText}`}>
          {title}
        </h3>
        {showSpeakButton && (
            <button
              onClick={onToggleSpeak}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-blue ${
                isSpeaking ? 'bg-accent-pink text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
              aria-label={isSpeaking ? 'Stop speaking' : 'Speak content'}
            >
                <div className="w-6 h-6">
                    {isSpeaking ? <SoundWaveIcon /> : <SpeakerIcon />}
                </div>
            </button>
        )}
      </div>
      <p className={`mt-3 pl-[56px] sm:pl-[64px] font-semibold ${theme.contentText} ${contentFontSize}`}>
        {content}
      </p>
    </div>
  );
};
