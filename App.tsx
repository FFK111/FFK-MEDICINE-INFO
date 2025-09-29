import React, { useState, useCallback } from 'react';
import { Language, MedicineInfo } from './types';
import { getMedicineInfo } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { LanguageSelector } from './components/LanguageSelector';
import { ResponseDisplay } from './components/ResponseDisplay';
import { Background } from './components/Background';
import { TabSelector, AppTab } from './components/TabSelector';
import { DosageCalculator } from './components/DosageCalculator';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [medicineResult, setMedicineResult] = useState<{info: MedicineInfo, lang: Language} | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>('info');

  const handleSearch = useCallback(async (query: string, imageFile: File | null, condition: string) => {
    if (!query && !imageFile) {
      setError('Please enter a medicine name or upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMedicineResult(null);

    try {
      const langForSearch = language; // Capture language at the time of search
      const result = await getMedicineInfo(query, langForSearch, imageFile, condition);
      if (result.safetyInCondition && condition) {
          result.conditionContext = condition;
      }
      setMedicineResult({ info: result, lang: langForSearch });
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const renderInfoTab = () => (
    <>
      <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <ResponseDisplay
        isLoading={isLoading}
        error={error}
        medicineInfo={medicineResult?.info ?? null}
        language={medicineResult?.lang ?? language}
      />
    </>
  );

  return (
    <div className="relative min-h-screen font-sans text-slate-800">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
            <p className="text-center text-slate-600 mb-6 text-base md:text-lg">
              Your trusted source for comprehensive medicine information
            </p>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'info' && (
              <div className="w-full max-w-3xl">
                {renderInfoTab()}
              </div>
            )}
            
            {activeTab === 'dosage' && <DosageCalculator />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;