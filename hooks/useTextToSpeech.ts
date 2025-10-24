import { useState, useEffect, useCallback } from 'react';

interface SpeakParams {
  text: string;
  lang: string;
  voice: SpeechSynthesisVoice | null;
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(({ text, lang, voice }: SpeakParams): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(text);
        resolve();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText(null);
      };

      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsSpeaking(false);
        setSpeakingText(null);
        reject(event);
      };
      
      // A small delay before speaking can help in some browsers
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 100);
    });
  }, []);

  const cancel = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingText(null);
  }, []);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return { speak, cancel, isSpeaking, speakingText, voices };
};