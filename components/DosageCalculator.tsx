import React, { useState, useRef, useEffect } from 'react';
import { getDosageInfo } from '../services/geminiService';
import { DosageInfo } from '../types';
import { SkeletonCard } from './SkeletonCard';
import { BeakerIcon } from './icons/BeakerIcon';
import { InfoCard } from './InfoCard';
import { CalculatorIcon } from './icons/CalculatorIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { UsesIcon } from './icons/UsesIcon';

export const DosageCalculator: React.FC = () => {
    const [medicine, setMedicine] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<DosageInfo | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!medicine || !age || !weight) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const dosageResult = await getDosageInfo(medicine, parseInt(age), parseInt(weight));
            setResult(dosageResult);
        } catch (err) {
            console.error(err);
            setError('Could not calculate dosage. The AI may not have information for this medicine, or an error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading && (result || error)) {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isLoading, result, error]);

    const renderResult = () => {
        if (isLoading) {
            return (
                <div className="space-y-4 mt-8">
                    <div className="animate-card-entry"><SkeletonCard /></div>
                    <div className="animate-card-entry" style={{ animationDelay: '100ms' }}><SkeletonCard /></div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="mt-8 text-center p-8 bg-red-900/40 backdrop-blur-xl border border-red-500/50 text-red-200 rounded-2xl shadow-lg animate-card-entry">
                    <h3 className="font-bold text-lg text-red-100">Error</h3>
                    <p>{error}</p>
                </div>
            );
        }
        if (result) {
            return (
                <div className="space-y-4 mt-8">
                    <div className="animate-card-entry">
                        <InfoCard
                            title="Dosage Suggestion"
                            content={result.dosageSuggestion}
                            icon={<BeakerIcon />}
                            variant="safety"
                            isSpeaking={false}
                        />
                    </div>
                     <div className="animate-card-entry" style={{ animationDelay: '100ms' }}>
                        <InfoCard
                            title="Reasoning"
                            content={result.reasoning}
                            icon={<UsesIcon />}
                            isSpeaking={false}
                        />
                    </div>
                     <div className="animate-card-entry" style={{ animationDelay: '200ms' }}>
                        <InfoCard
                            title="Important Notes"
                            content={result.importantNotes}
                            icon={<WarningIcon />}
                            isSpeaking={false}
                        />
                    </div>
                     <div className="animate-card-entry" style={{ animationDelay: '300ms' }}>
                        <InfoCard
                            title="CRITICAL DISCLAIMER"
                            content={result.disclaimer}
                            icon={<ShieldIcon />}
                            variant="disclaimer"
                            isSpeaking={false}
                        />
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={medicine}
                        onChange={e => setMedicine(e.target.value)}
                        placeholder="Medicine Name"
                        className="h-12 px-4 bg-slate-800/70 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-electric-blue)] focus:border-[var(--brand-electric-blue)] text-slate-100 placeholder-slate-400 transition-all"
                        disabled={isLoading}
                    />
                    <input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        placeholder="Age (years)"
                        className="h-12 px-4 bg-slate-800/70 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-electric-blue)] focus:border-[var(--brand-electric-blue)] text-slate-100 placeholder-slate-400 transition-all"
                        disabled={isLoading}
                        min="0"
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="Weight (kg)"
                        className="h-12 px-4 bg-slate-800/70 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-electric-blue)] focus:border-[var(--brand-electric-blue)] text-slate-100 placeholder-slate-400 transition-all"
                        disabled={isLoading}
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !medicine || !age || !weight}
                    className="w-full h-14 p-3 rounded-full bg-gradient-to-r from-[var(--brand-electric-blue)] to-[var(--brand-magenta)] text-white font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 shadow-lg shadow-[var(--glow-color-blue)]/50 hover:shadow-[var(--glow-color-blue)] disabled:shadow-none"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                        <>
                            <div className="w-7 h-7"><CalculatorIcon /></div>
                            <span className="ml-2 text-lg">Calculate Dosage</span>
                        </>
                    )}
                </button>
            </form>
            <div ref={resultsRef}>
              {renderResult()}
            </div>
        </div>
    );
};
