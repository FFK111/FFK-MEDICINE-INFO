import React, { useState } from 'react';
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
                <div className="mt-8 text-center p-8 bg-red-500/10 backdrop-blur-3xl border border-red-500/30 text-red-800 rounded-2xl shadow-lg animate-card-entry">
                    <h3 className="font-bold text-lg text-red-900">Error</h3>
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
        <div className="w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="bg-white/15 backdrop-blur-3xl rounded-2xl shadow-xl p-4 mb-8 border border-white/20 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="text"
                        value={medicine}
                        onChange={e => setMedicine(e.target.value)}
                        placeholder="Medicine Name"
                        className="h-12 px-4 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder-slate-500 transition-shadow"
                        disabled={isLoading}
                    />
                    <input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        placeholder="Age (years)"
                        className="h-12 px-4 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder-slate-500 transition-shadow"
                        disabled={isLoading}
                        min="0"
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        placeholder="Weight (kg)"
                        className="h-12 px-4 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder-slate-500 transition-shadow"
                        disabled={isLoading}
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !medicine || !age || !weight}
                    className="mt-4 w-full h-14 p-3 rounded-lg bg-gradient-to-r from-red-500/50 to-rose-500/50 backdrop-blur-xl border border-white/20 text-white font-bold transition-all duration-200 disabled:from-red-500/20 disabled:to-rose-500/20 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105 active:scale-95 shadow-md disabled:shadow-none"
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
            {renderResult()}
        </div>
    );
};