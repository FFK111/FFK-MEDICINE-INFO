import React from 'react';

interface VoiceSelectorProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onSelectVoice: (voice: SpeechSynthesisVoice) => void;
  isDisabled: boolean;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voices,
  selectedVoice,
  onSelectVoice,
  isDisabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedURI = event.target.value;
    const voice = voices.find((v) => v.voiceURI === selectedURI);
    if (voice) {
      onSelectVoice(voice);
    }
  };

  return (
    <div className="p-4 bg-white/50 rounded-2xl comic-border border-slate-400 comic-shadow-sm">
      <label htmlFor="voice-select" className="block text-lg font-bold font-heading text-text-dark mb-2">
        Choose a Voice
      </label>
      <div className="relative">
        <select
          id="voice-select"
          value={selectedVoice?.voiceURI || ''}
          onChange={handleChange}
          disabled={isDisabled}
          className="w-full h-12 px-4 appearance-none bg-white comic-border rounded-lg focus:outline-none focus:ring-4 focus:ring-accent-yellow text-text-dark transition-all font-semibold disabled:opacity-70"
        >
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-dark">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
        </div>
      </div>
    </div>
  );
};