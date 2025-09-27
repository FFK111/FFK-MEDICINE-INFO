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
  if (voices.length === 0) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedURI = event.target.value;
    const voice = voices.find((v) => v.voiceURI === selectedURI);
    if (voice) {
      onSelectVoice(voice);
    }
  };

  return (
    <div className="mb-4 animate-fade-in">
      <label htmlFor="voice-select" className="block text-sm font-medium text-slate-700 mb-1">
        Select a Voice:
      </label>
      <select
        id="voice-select"
        value={selectedVoice?.voiceURI || ''}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full p-2 bg-white/60 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800 transition-shadow"
      >
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
    </div>
  );
};
