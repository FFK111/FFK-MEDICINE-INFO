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
      shadow: 'hover:shadow-[0_0_25px_var(--glow-color-blue)]',
      iconBg: 'bg-gradient-to-br from-slate-700/80 to-slate-800/50',
      iconText: 'text-[var(--brand-electric-blue)]',
      titleText: 'text-slate-100',
      contentText: 'text-slate-300 font-semibold',
      speakingAnimation: 'animate-pulse-glow-multi'
    },
    disclaimer: {
      shadow: 'hover:shadow-[0_0_25px_var(--glow-color-amber)]',
      iconBg: 'bg-gradient-to-br from-slate-700/80 to-slate-800/50',
      iconText: 'text-amber-400',
      titleText: 'text-slate-100',
      contentText: 'text-slate-400',
      speakingAnimation: 'animate-pulse-glow-multi'
    },
    safety: {
      shadow: 'hover:shadow-[0_0_25px_var(--glow-color-emerald)]',
      iconBg: 'bg-gradient-to-br from-slate-700/80 to-slate-800/50',
      iconText: 'text-emerald-400',
      titleText: 'text-slate-100',
      contentText: 'text-slate-300 font-semibold',
      speakingAnimation: 'animate-pulse-glow-multi'
    },
  };
  
  const theme = variants[variant];
  const isDisclaimer = variant === 'disclaimer';
  const showSpeakButton = !isDisclaimer && onToggleSpeak;
  const contentFontSize = isDisclaimer ? 'text-sm' : 'text-lg';

  const speakingAnimation = isSpeaking ? theme.speakingAnimation : '';

  return (
    <div
      className={`
        group relative rounded-2xl p-5 shadow-lg
        bg-slate-900/50 backdrop-blur-md glow-border
        transition-all duration-300 ease-out
        transform hover:-translate-y-1 hover:scale-[1.02]
        ${theme.shadow} ${speakingAnimation}
      `}
    >
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${theme.iconBg} border border-white/5`}>
            <div className={`${theme.iconText} w-6 h-6`}>
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
              className={`group p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-electric-blue)] focus:ring-offset-slate-900 transform hover:scale-110 active:scale-95 border hover:shadow-[0_0_15px_var(--glow-color-blue)] ${
                isSpeaking
                  ? 'bg-[var(--brand-electric-blue)]/70 backdrop-blur-xl border-white/20 text-white'
                  : 'bg-slate-700/60 backdrop-blur-xl border-white/10 text-slate-200 hover:bg-slate-700'
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
    </div>
  );
};
