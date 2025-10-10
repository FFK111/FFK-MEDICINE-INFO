import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  const resultsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isLoading && (medicineResult || error)) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading, medicineResult, error]);

  const renderInfoTab = () => (
    <>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      <div ref={resultsRef} className="mt-8">
        <ResponseDisplay
          isLoading={isLoading}
          error={error}
          medicineInfo={medicineResult?.info ?? null}
          language={medicineResult?.lang ?? language}
        />
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen font-sans text-slate-200">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center w-full">
            <p className="text-center text-slate-400 mb-8 text-lg md:text-xl max-w-3xl text-gradient">
              Clarity in medicine. Your AI-powered guide for instant, easy-to-understand pharmaceutical information.
            </p>
            
            <div className="w-full max-w-4xl bg-slate-950/50 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 glow-border">
                <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
                
                <div className="mt-6 grid">
                    <div
                        className={`[grid-area:1/1] transition-opacity duration-500 ease-in-out ${
                        activeTab === 'info' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        {renderInfoTab()}
                    </div>
                    <div
                        className={`[grid-area:1/1] transition-opacity duration-500 ease-in-out ${
                        activeTab === 'dosage' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <DosageCalculator />
                    </div>
                </div>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
