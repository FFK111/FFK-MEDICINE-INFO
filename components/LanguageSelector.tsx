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
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-100 transform hover:scale-105 active:scale-95 ${
            selectedLanguage === lang.id
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/70 text-slate-700 hover:bg-slate-200/70 shadow-sm'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};