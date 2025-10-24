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
      <div className="flex p-1 bg-cream-100 rounded-full border-2 border-border-dark">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelectLanguage(lang.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)] focus:ring-offset-white ${
              selectedLanguage === lang.id
                ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-pink)] text-white shadow-md comic-shadow-sm'
                : 'text-text-dark hover:bg-yellow-200/50'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};