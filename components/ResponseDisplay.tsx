import React, { useEffect, useRef, useCallback } from 'react';
import { MedicineInfo, Language } from '../types';
import { InfoCard } from './InfoCard';
import { PillIcon } from './icons/PillIcon';
import { UsesIcon } from './icons/UsesIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { SafetyIcon } from './icons/SafetyIcon';
import { SkeletonCard } from './SkeletonCard';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  medicineInfo: MedicineInfo | null;
  language: Language;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, error, medicineInfo, language }) => {
  const { speak, cancel, isSpeaking, speakingText, voices } = useTextToSpeech();
  const spokenMedicineInfo = useRef<MedicineInfo | null>(null);

  const findBestVoice = useCallback((lang: Language): SpeechSynthesisVoice | null => {
    if (!voices.length) return null;

    const langVoices = voices.filter(v => v.lang.startsWith(lang));
    if (!langVoices.length) return null;

    // 1. Prefer a voice marked as default
    const defaultVoice = langVoices.find(v => v.default);
    if (defaultVoice) return defaultVoice;

    // 2. Prefer a "Google" voice as a high-quality fallback
    const googleVoice = langVoices.find(v => v.name.toLowerCase().includes('google'));
    if (googleVoice) return googleVoice;
    
    // 3. Otherwise, return the first available voice for the language
    return langVoices[0];
  }, [voices]);

  useEffect(() => {
    // Always cancel ongoing speech when new info or language is selected
    cancel();

    const bestVoice = findBestVoice(language);
    
    if (
      medicineInfo &&
      bestVoice &&
      spokenMedicineInfo.current !== medicineInfo
    ) {
      speak({ text: `Uses: ${medicineInfo.uses}`, lang: language, voice: bestVoice });
      spokenMedicineInfo.current = medicineInfo;
    }

    if (!medicineInfo) {
        spokenMedicineInfo.current = null;
    }

  }, [medicineInfo, language, voices, findBestVoice, speak, cancel]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100/80 backdrop-blur-lg border border-red-300 text-red-800 rounded-2xl shadow-lg animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-red-900">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!medicineInfo) {
    return (
      <div className="text-center p-8 bg-white/40 backdrop-blur-lg border border-black/5 text-slate-600 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg text-slate-800">Welcome!</h3>
        <p>Enter a medicine name or upload a photo to get started.</p>
      </div>
    );
  }
  
  const handleToggleSpeak = (text: string, title: string) => {
    const fullText = `${title}: ${text}`;
    const bestVoice = findBestVoice(language);

    if (!bestVoice) return; // Feature is disabled if no voice is found

    if (isSpeaking && speakingText === fullText) {
      cancel();
    } else {
      speak({ text: fullText, lang: language, voice: bestVoice });
    }
  };
  
  const hasSpeechSupport = findBestVoice(language) !== null;

  const cards = [
      { title: "Uses", content: medicineInfo.uses, icon: <UsesIcon />, key: "uses", variant: 'default' as const },
      { title: "Composition", content: medicineInfo.composition, icon: <PillIcon />, key: "composition", variant: 'default' as const },
      { title: "Major Side Effects", content: medicineInfo.sideEffects, icon: <WarningIcon />, key: "sideEffects", variant: 'default' as const },
      { title: "Recommended Time to Take", content: medicineInfo.timeToTake, icon: <ClockIcon />, key: "timeToTake", variant: 'default' as const },
      ...(medicineInfo.safetyInCondition && medicineInfo.conditionContext ? [{
          title: `Safety in ${medicineInfo.conditionContext}`,
          content: medicineInfo.safetyInCondition,
          icon: <SafetyIcon />,
          key: "safety",
          variant: 'safety' as const,
      }] : []),
      {
          title: "Disclaimer",
          content: medicineInfo.disclaimer,
          icon: <ShieldIcon />,
          key: "disclaimer",
          variant: 'disclaimer' as const,
      },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div key={card.key} className="animate-fade-in-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <InfoCard 
                title={card.title} 
                content={card.content} 
                icon={card.icon} 
                variant={card.variant}
                onToggleSpeak={hasSpeechSupport ? () => handleToggleSpeak(card.content, card.title) : undefined}
                isSpeaking={isSpeaking && speakingText === `${card.title}: ${card.content}`}
            />
        </div>
      ))}
    </div>
  );
};