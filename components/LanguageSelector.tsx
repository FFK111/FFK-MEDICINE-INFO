import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = [
    { id: Language.ENGLISH, name: 'English' },
    { id: Language.HINDI, name: 'Hindi' },
    { id: Language.URDU, name: 'Urdu' },
  ];

  return (
    <div className="flex flex-wrap justify-center space-x-2 mb-6">
      {languages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelectLanguage(lang.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-950 transform hover:scale-105 active:scale-95 border hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] ${
            selectedLanguage === lang.id
              ? 'bg-cyan-600/70 backdrop-blur-xl text-white shadow-lg border-white/20'
              : 'bg-slate-800/40 backdrop-blur-xl text-slate-200 hover:bg-slate-700/50 shadow-sm border-white/10'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};