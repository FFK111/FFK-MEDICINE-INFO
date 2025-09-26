
import React, { useState, useCallback } from 'react';
import { Language, MedicineInfo } from './types';
import { getMedicineInfo } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseDisplay } from './components/ResponseDisplay';
import { BackgroundPillIcon } from './components/icons/BackgroundPillIcon';
import { BackgroundStethoscopeIcon } from './components/icons/BackgroundStethoscopeIcon';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string, imageFile: File | null) => {
    if (!query && !imageFile) {
      setError('Please enter a medicine name or upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMedicineInfo(null);

    try {
      const result = await getMedicineInfo(query, language, imageFile);
      setMedicineInfo(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-blue-100 font-sans text-gray-800 overflow-hidden">
      <div className="absolute top-1/4 left-10 opacity-10 -z-0">
          <BackgroundPillIcon />
      </div>
      <div className="absolute top-1/2 right-10 opacity-10 -z-0">
          <BackgroundStethoscopeIcon />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
          <div className="w-full max-w-3xl">
            <p className="text-center text-gray-600 mb-6 text-lg">
              Your AI-powered guide for clear and simple medicine information.
            </p>
            <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <ResponseDisplay
              isLoading={isLoading}
              error={error}
              medicineInfo={medicineInfo}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
