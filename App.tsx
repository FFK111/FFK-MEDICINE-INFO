import React, { useState, useCallback } from 'react';
import { Language, MedicineInfo } from './types';
import { getMedicineInfo } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseDisplay } from './components/ResponseDisplay';
import { Background } from './components/Background';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string, imageFile: File | null, condition: string) => {
    if (!query && !imageFile) {
      setError('Please enter a medicine name or upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMedicineInfo(null);

    try {
      const result = await getMedicineInfo(query, language, imageFile, condition);
      if (result.safetyInCondition && condition) {
          result.conditionContext = condition;
      }
      setMedicineInfo(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [language]);


  return (
    <div className="relative min-h-screen font-sans text-gray-200">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
          <div className="w-full max-w-3xl">
            <p className="text-center text-gray-300 mb-6 text-base md:text-lg">
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