import React, { useState, useEffect, useRef } from 'react';
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
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
        const activeTabElement = tabsRef.current[activeIndex];
        if (activeTabElement) {
            setIndicatorStyle({
                left: activeTabElement.offsetLeft,
                width: activeTabElement.offsetWidth,
            });
        }
    }, [activeTab]);

    return (
        <div className="relative w-full flex p-1 bg-slate-800 rounded-full border border-slate-700">
            <span
                className="absolute top-1 bottom-1 bg-gradient-to-r from-[var(--brand-electric-blue)] to-[var(--brand-magenta)] rounded-full transition-all duration-300 ease-in-out"
                style={indicatorStyle}
            ></span>
            {tabs.map((tab, index) => (
                <button
                    ref={el => { tabsRef.current[index] = el; }}
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative z-10 w-full flex items-center justify-center space-x-3 px-2 sm:px-4 py-2.5 font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 text-sm sm:text-base rounded-full ${
                        activeTab === tab.id
                            ? 'text-white'
                            : 'text-slate-300 hover:text-white'
                    }`}
                >
                    <div className="w-5 h-5 flex-shrink-0">{tab.icon}</div>
                    <span>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};
