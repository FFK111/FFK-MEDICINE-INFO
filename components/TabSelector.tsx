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
        <div className="w-full max-w-md mx-auto mb-6 p-1.5 bg-slate-900/50 backdrop-blur-xl rounded-xl shadow-lg flex items-center space-x-2 border border-white/10">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-2 sm:px-4 py-2.5 rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-950 border hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] whitespace-nowrap text-xs sm:text-sm ${
                        activeTab === tab.id
                            ? 'bg-cyan-600/70 backdrop-blur-xl text-white shadow-md border-white/20'
                            : 'bg-slate-800/40 backdrop-blur-xl text-slate-200 hover:bg-slate-700/50 border-white/10'
                    }`}
                >
                    <div className="w-5 h-5">{tab.icon}</div>
                    <span>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};