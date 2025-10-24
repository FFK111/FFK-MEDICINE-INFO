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
        <div className="relative w-full flex p-1 bg-slate-100 rounded-full border-2 border-border-dark">
            <span
                className="absolute top-1 bottom-1 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-pink)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={indicatorStyle}
            ></span>
            {tabs.map((tab, index) => (
                <button
                    ref={el => { tabsRef.current[index] = el; }}
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative z-10 w-full flex items-center justify-center space-x-3 px-2 sm:px-4 py-2.5 font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-yellow text-sm sm:text-base rounded-full font-heading ${
                        activeTab === tab.id
                            ? 'text-white'
                            : 'text-text-dark hover:text-primary-blue'
                    }`}
                >
                    <div className="w-5 h-5 flex-shrink-0">{tab.icon}</div>
                    <span>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};