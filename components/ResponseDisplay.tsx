import React, { useEffect, useRef, useCallback, useState } from 'react';
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
  const [pendingSpeech, setPendingSpeech] = useState<{ text: string; lang: Language } | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Effect to automatically select the best available female voice
  useEffect(() => {
    if (voices.length > 0) {
        const langVoices = voices.filter(v => v.lang.startsWith(language));
        if (langVoices.length === 0) {
            setSelectedVoice(null);
            return;
        }

        const priorityVoices: { [key in Language]?: string[] } = {
            [Language.ENGLISH]: ['samantha', 'fiona', 'google us english', 'zira', 'susan'],
            [Language.HINDI]: ['google हिन्दी', 'lekha'],
        };

        const currentPriority = priorityVoices[language] || [];
        for (const priorityName of currentPriority) {
            const foundVoice = langVoices.find(v => v.name.toLowerCase().includes(priorityName));
            if (foundVoice) {
                setSelectedVoice(foundVoice);
                return; // Found a priority voice, we're done
            }
        }

        // If no priority voice was found, fall back to scoring
        const getVoiceScore = (voice: SpeechSynthesisVoice): number => {
            const name = voice.name.toLowerCase();
            let score = 0;

            // High-quality voices get a boost
            if (name.includes('google')) score += 10;

            // Explicit gender keywords
            if (name.includes('female') || name.includes('girl') || name.includes('woman')) score += 20;

            // Common female voice names
            if (['samantha', 'susan', 'zira', 'lekha', 'fiona', 'veena'].some(n => name.includes(n))) score += 5;
            
            if (voice.default) score += 2;

            // Penalize male voices
            if (name.includes('male') || name.includes('boy') || name.includes('man')) score -= 20;

            return score;
        };

        const sortedVoices = [...langVoices].sort((a, b) => getVoiceScore(b) - getVoiceScore(a));
        setSelectedVoice(sortedVoices[0] || null);
    }
  }, [language, voices]);


  // Effect to queue the initial speech when new results arrive
  useEffect(() => {
    cancel(); 
    if (medicineInfo && spokenMedicineInfo.current !== medicineInfo) {
      setPendingSpeech({ text: `Uses: ${medicineInfo.uses}`, lang: language });
      spokenMedicineInfo.current = medicineInfo;
    }
    if (!medicineInfo) {
        spokenMedicineInfo.current = null;
    }
  }, [medicineInfo, language, cancel]);

  // Effect to execute the queued speech once a voice is selected
  useEffect(() => {
    if (pendingSpeech && selectedVoice) {
      speak({
        text: pendingSpeech.text,
        lang: pendingSpeech.lang,
        voice: selectedVoice,
      });
      setPendingSpeech(null);
    }
  }, [pendingSpeech, selectedVoice, speak]);


  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-card-entry" style={{ animationDelay: `${index * 100}ms` }}>
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100/80 backdrop-blur-lg border border-red-300 text-red-800 rounded-2xl shadow-lg animate-card-entry">
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
    if (!selectedVoice) return;

    if (isSpeaking && speakingText === fullText) {
      cancel();
    } else {
      speak({ text: fullText, lang: language, voice: selectedVoice });
    }
  };
  
  const hasSpeechSupport = !!selectedVoice;

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
        <div key={card.key} className="animate-card-entry" style={{ animationDelay: `${index * 100}ms` }}>
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