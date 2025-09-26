import React from 'react';
import { MedicineInfo } from '../types';
import { InfoCard } from './InfoCard';
import { PillIcon } from './icons/PillIcon';
import { UsesIcon } from './icons/UsesIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { SafetyIcon } from './icons/SafetyIcon';

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  medicineInfo: MedicineInfo | null;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, error, medicineInfo }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 font-semibold">Fetching information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-md">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!medicineInfo) {
    return (
      <div className="text-center p-8 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg shadow-inner">
        <h3 className="font-semibold text-lg">Welcome!</h3>
        <p>Enter a medicine name or upload a photo to get started.</p>
      </div>
    );
  }

  // Fix: Explicitly type the `cards` array to allow for different variants ('default', 'safety', 'disclaimer').
  // This resolves the TypeScript error where the array type was being inferred too narrowly from its initial values.
  const cards: {
      title: string;
      content: string;
      icon: React.ReactNode;
      key: string;
      variant: 'default' | 'disclaimer' | 'safety';
  }[] = [
      { title: "Composition", content: medicineInfo.composition, icon: <PillIcon />, key: "composition", variant: 'default' },
      { title: "Uses", content: medicineInfo.uses, icon: <UsesIcon />, key: "uses", variant: 'default' },
      { title: "Major Side Effects", content: medicineInfo.sideEffects, icon: <WarningIcon />, key: "sideEffects", variant: 'default' },
      { title: "Recommended Time to Take", content: medicineInfo.timeToTake, icon: <ClockIcon />, key: "timeToTake", variant: 'default' },
  ];

  if (medicineInfo.safetyInCondition && medicineInfo.conditionContext) {
      cards.push({
          title: `Safety in ${medicineInfo.conditionContext}`,
          content: medicineInfo.safetyInCondition,
          icon: <SafetyIcon />,
          key: "safety",
          variant: 'safety',
      });
  }

  cards.push({
      title: "Disclaimer",
      content: medicineInfo.disclaimer,
      icon: <ShieldIcon />,
      key: "disclaimer",
      variant: 'disclaimer',
  });

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div key={card.key} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <InfoCard 
                title={card.title} 
                content={card.content} 
                icon={card.icon} 
                variant={card.variant}
            />
        </div>
      ))}
    </div>
  );
};
