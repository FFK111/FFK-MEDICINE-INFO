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
    <div className="flex justify-center my-6">
      <div className="flex p-1 bg-slate-800 rounded-full border border-slate-700">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelectLanguage(lang.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-electric-blue)] focus:ring-offset-slate-900 ${
              selectedLanguage === lang.id
                ? 'bg-gradient-to-r from-[var(--brand-electric-blue)] to-[var(--brand-magenta)] text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};
