import React, { useEffect, useRef, useCallback, useState } from 'react';
import { MedicineInfo, Language } from '../types';
import { InfoCard } from './InfoCard';
import { WarningIcon } from './icons/WarningIcon';
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
  const [autoplayFailed, setAutoplayFailed] = useState(false);

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
            if (name.includes('google')) score += 10;
            if (name.includes('female') || name.includes('girl') || name.includes('woman')) score += 20;
            if (['samantha', 'susan', 'zira', 'lekha', 'fiona', 'veena'].some(n => name.includes(n))) score += 5;
            if (voice.default) score += 2;
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
    setAutoplayFailed(false); // Reset on new results
    if (medicineInfo && spokenMedicineInfo.current !== medicineInfo) {
      const textToSpeak = medicineInfo.uses; // ONLY read the uses
      setPendingSpeech({ text: textToSpeak, lang: language });
      spokenMedicineInfo.current = medicineInfo;
    }
    if (!medicineInfo) {
        spokenMedicineInfo.current = null;
    }
  }, [medicineInfo, language, cancel]);

  // Effect to execute the queued speech once a voice is selected
  useEffect(() => {
    if (pendingSpeech && selectedVoice) {
      const speechToPlay = pendingSpeech;
      const fullText = `What It Does: ${speechToPlay.text}`;
      setPendingSpeech(null); // Clear state immediately to prevent re-triggering

      const promise = speak({
        text: fullText,
        lang: speechToPlay.lang,
        voice: selectedVoice,
      });

      promise.catch(() => {
        console.warn("Autoplay was likely blocked by the browser.");
        if (spokenMedicineInfo.current) {
          setAutoplayFailed(true);
        }
      });
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
      <div className="text-center p-8 bg-accent-pink/20 comic-border border-accent-pink text-red-700 rounded-2xl animate-pop-in-bounce">
        <h3 className="font-heading font-bold text-2xl text-red-800">Whoops!</h3>
        <p className="font-semibold mt-2">{error}</p>
      </div>
    );
  }

  if (!medicineInfo) {
    return (
      <div className="text-center p-8 bg-primary-blue/10 comic-border border-primary-blue text-slate-700 rounded-2xl">
        <h3 className="font-heading font-semibold text-2xl text-slate-800">Ready to help!</h3>
        <p className="mt-1">What medicine are you curious about today?</p>
      </div>
    );
  }
  
  const handleToggleSpeak = (text: string, title: string) => {
    const fullText = `${title}: ${text}`;
    if (!selectedVoice) return;
    
    if (autoplayFailed) {
        setAutoplayFailed(false);
    }

    if (isSpeaking && speakingText === fullText) {
      cancel();
    } else {
      speak({ text: fullText, lang: language, voice: selectedVoice });
    }
  };
  
  const hasSpeechSupport = !!selectedVoice;

  const safetyCard = medicineInfo.safetyInCondition && medicineInfo.conditionContext ? [{
      title: `Safety for ${medicineInfo.conditionContext}`,
      content: medicineInfo.safetyInCondition,
      key: "safety",
      variant: 'safety' as const,
  }] : [];

  const cards = [
      { title: "It's For...", content: medicineInfo.medicineFor, key: "medicineFor", variant: 'purple' as const },
      { title: "What It Does", content: medicineInfo.uses, key: "uses", variant: 'teal' as const },
      ...safetyCard,
      { title: "Ingredients", content: medicineInfo.composition, key: "composition", variant: 'default' as const },
      { title: "Side Effects", content: medicineInfo.sideEffects, key: "sideEffects", variant: 'warning' as const },
      { title: "When to Take It", content: medicineInfo.timeToTake, key: "timeToTake", variant: 'orange' as const },
      {
          title: "Heads Up!",
          content: medicineInfo.disclaimer,
          key: "disclaimer",
          variant: 'disclaimer' as const,
      },
  ];
  
  return (
    <div className="space-y-4">
      {autoplayFailed && (
        <div 
          className="bg-accent-yellow/30 border-2 border-amber-500 text-amber-800 text-center p-4 rounded-2xl animate-pop-in-bounce flex flex-col items-center comic-border border-amber-600"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 text-amber-700"><WarningIcon /></div>
            <p className="font-bold font-heading text-base text-amber-900">Audio Paused!</p>
          </div>
          <p className="text-sm mt-2 font-semibold">
            Tap the speaker on the 'What It Does' card to start listening!
          </p>
        </div>
      )}

      {cards.map((card, index) => (
        <div key={card.key} className="animate-card-entry" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
            <InfoCard 
                title={card.title} 
                content={card.content} 
                variant={card.variant}
                onToggleSpeak={card.key !== 'disclaimer' && hasSpeechSupport ? () => handleToggleSpeak(card.content, card.title) : undefined}
                isSpeaking={isSpeaking && speakingText === `${card.title}: ${card.content}`}
                highlightForAutoplay={autoplayFailed && card.key === 'uses'}
            />
        </div>
      ))}
    </div>
  );
};