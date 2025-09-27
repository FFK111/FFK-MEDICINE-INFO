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
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, variant = 'default', onToggleSpeak, isSpeaking }) => {
  const variants = {
    default: {
      bg: 'bg-white/60',
      border: 'border-blue-500',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
    disclaimer: {
      bg: 'bg-white/60',
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
    safety: {
      bg: 'bg-white/60',
      border: 'border-green-500',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
  };
  
  const theme = variants[variant];
  const isDisclaimer = variant === 'disclaimer';
  const showSpeakButton = !isDisclaimer && onToggleSpeak;

  const glowAnimationClasses = {
    default: 'animate-pulse-glow-blue',
    safety: 'animate-pulse-glow-green',
    disclaimer: 'animate-pulse-glow-yellow',
  };

  const speakingAnimation = isSpeaking ? glowAnimationClasses[variant] : '';

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden p-6 border-l-4 ${theme.border} ${theme.bg} backdrop-blur-xl border-black/5 ${speakingAnimation}`}>
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
            className={`group p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100 transform hover:scale-110 active:scale-95 ${
              isSpeaking
                ? 'bg-blue-100 text-blue-600 hover:bg-red-100 hover:text-red-700'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
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
      <p className={`text-lg whitespace-pre-wrap ${theme.contentText}`}>
        {content}
      </p>
    </div>
  );
};