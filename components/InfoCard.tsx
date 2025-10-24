import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';
import { SoundWaveIcon } from './icons/SoundWaveIcon';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  variant?: 'default' | 'disclaimer' | 'safety' | 'warning';
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
  };
  
  const theme = variants[variant] || variants.default;
  const isDisclaimer = variant === 'disclaimer';
  const showSpeakButton = !isDisclaimer && onToggleSpeak;
  const contentFontSize = isDisclaimer ? 'text-sm' : 'text-base';
  const contentFontWeight = 'font-semibold';

  const speakingAnimation = isSpeaking ? 'animate-pulse-glow-multi' : '';

  return (
    <div
      className={`
        group relative rounded-2xl p-5
        bg-white comic-border comic-shadow
        transition-all duration-200 ease-in-out
        transform hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_var(--border-dark)]
        ${theme.border} ${speakingAnimation}
      `}
    >
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${theme.iconBg} comic-border border-border-dark transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
            <div className={`${theme.iconText} w-7 h-7`}>
              {icon}
            </div>
          </div>
          <h3 className={`flex-grow text-2xl font-bold font-heading ${theme.titleText}`}>
            {title}
          </h3>
          {showSpeakButton && (
            <button
              onClick={onToggleSpeak}
              aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
              className={`group p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)] focus:ring-offset-white transform hover:scale-110 active:scale-95 comic-border border-border-dark comic-shadow-sm ${
                isSpeaking
                  ? 'bg-accent-pink text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
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
        <p className={`${contentFontSize} ${contentFontWeight} whitespace-pre-wrap ${theme.contentText}`}>
          {content}
        </p>
      </div>
    </div>
  );
};