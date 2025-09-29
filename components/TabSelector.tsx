import React from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';

export type AppTab = 'info' | 'dosage';

interface TabSelectorProps {
    activeTab: AppTab;
    onTabChange: (tab: AppTab) => void;
}

const tabs: { id: AppTab; name: string; icon: React.ReactNode }[] = [
    { id: 'info', name: 'Medicine Info', icon: <InfoIcon /> },
    { id: 'dosage', name: 'Dosage Calculator', icon: <CalculatorIcon /> },
];

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-full max-w-md mx-auto mb-6 p-1.5 bg-white/15 backdrop-blur-3xl rounded-xl shadow-lg flex items-center space-x-2 border border-white/20">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-100 border ${
                        activeTab === tab.id
                            ? 'bg-red-500/60 backdrop-blur-2xl text-white shadow-md border-white/30'
                            : 'bg-white/40 backdrop-blur-2xl text-slate-700 hover:bg-white/50 border-white/20'
                    }`}
                >
                    <div className="w-5 h-5">{tab.icon}</div>
                    <span>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};