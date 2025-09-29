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
      border: 'border-cyan-500',
      iconBg: 'bg-cyan-900/40',
      iconText: 'text-cyan-400',
      titleText: 'text-slate-100',
      contentText: 'text-slate-300 font-semibold',
      glowColor: 'shadow-cyan-500/30'
    },
    disclaimer: {
      border: 'border-amber-500',
      iconBg: 'bg-amber-900/40',
      iconText: 'text-amber-400',
      titleText: 'text-slate-100',
      contentText: 'text-slate-400',
      glowColor: 'shadow-amber-500/30'
    },
    safety: {
      border: 'border-emerald-500',
      iconBg: 'bg-emerald-900/40',
      iconText: 'text-emerald-400',
      titleText: 'text-slate-100',
      contentText: 'text-slate-300 font-semibold',
      glowColor: 'shadow-emerald-500/30'
    },
  };
  
  const theme = variants[variant];
  const isDisclaimer = variant === 'disclaimer';
  const showSpeakButton = !isDisclaimer && onToggleSpeak;
  const contentFontSize = isDisclaimer ? 'text-sm' : 'text-lg';

  const glowAnimationClasses = {
    default: 'animate-pulse-glow-cyan',
    safety: 'animate-pulse-glow-emerald',
    disclaimer: 'animate-pulse-glow-amber',
  };

  const speakingAnimation = isSpeaking ? glowAnimationClasses[variant] : '';

  return (
    <div className={`
      group relative overflow-hidden
      rounded-2xl p-6 shadow-xl
      bg-slate-900/50 backdrop-blur-xl
      border border-white/10
      border-t-4 ${theme.border}
      transition-all duration-300 ease-out
      transform
      hover:[transform:translateY(-4px)_scale(1.02)] hover:shadow-2xl hover:${theme.glowColor}
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
            className={`group p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-950 transform hover:scale-110 active:scale-95 border hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] ${
              isSpeaking
                ? 'bg-cyan-600/70 backdrop-blur-xl border-white/20 text-white'
                : 'bg-slate-800/40 backdrop-blur-xl border-white/10 text-slate-200 hover:bg-slate-700/50'
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