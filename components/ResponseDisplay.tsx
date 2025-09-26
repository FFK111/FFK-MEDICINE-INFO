import React from 'react';
import { MedicineInfo } from '../types';
import { InfoCard } from './InfoCard';
import { PillIcon } from './icons/PillIcon';
import { UsesIcon } from './icons/UsesIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { SafetyIcon } from './icons/SafetyIcon';
import { SkeletonCard } from './SkeletonCard';

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  medicineInfo: MedicineInfo | null;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, error, medicineInfo }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-500/20 backdrop-blur-lg border border-red-500/30 text-red-900 rounded-2xl shadow-lg animate-fade-in-slide-up">
        <h3 className="font-bold text-lg">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!medicineInfo) {
    return (
      <div className="text-center p-8 bg-white/20 backdrop-blur-lg border border-white/20 text-slate-700 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg text-slate-800">Welcome!</h3>
        <p>Enter a medicine name or upload a photo to get started.</p>
      </div>
    );
  }
  
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
        <div key={card.key} className="animate-fade-in-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
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