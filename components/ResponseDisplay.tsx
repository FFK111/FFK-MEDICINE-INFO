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
      <div className="text-center p-8 bg-red-900/30 backdrop-blur-lg border border-red-500/50 text-red-200 rounded-2xl shadow-lg animate-fade-in-slide-up">
        <h3 className="font-bold text-lg text-red-100">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!medicineInfo) {
    return (
      <div className="text-center p-8 bg-slate-800/30 backdrop-blur-lg border border-slate-100/10 text-slate-300 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg text-slate-100">Welcome!</h3>
        <p>Enter a medicine name or upload a photo to get started.</p>
      </div>
    );
  }
  
  // Build the list of cards to display in a declarative way.
  const cards = [
      { title: "Composition", content: medicineInfo.composition, icon: <PillIcon />, key: "composition", variant: 'default' },
      { title: "Uses", content: medicineInfo.uses, icon: <UsesIcon />, key: "uses", variant: 'default' },
      { title: "Major Side Effects", content: medicineInfo.sideEffects, icon: <WarningIcon />, key: "sideEffects", variant: 'default' },
      { title: "Recommended Time to Take", content: medicineInfo.timeToTake, icon: <ClockIcon />, key: "timeToTake", variant: 'default' },
      // Conditionally add the safety card if relevant information exists.
      ...(medicineInfo.safetyInCondition && medicineInfo.conditionContext ? [{
          title: `Safety in ${medicineInfo.conditionContext}`,
          content: medicineInfo.safetyInCondition,
          icon: <SafetyIcon />,
          key: "safety",
          variant: 'safety' as const,
      }] : []),
      // The disclaimer is always last.
      {
          title: "Disclaimer",
          content: medicineInfo.disclaimer,
          icon: <ShieldIcon />,
          key: "disclaimer",
          variant: 'disclaimer' as const,
      },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        // The animation delay is reviewed and confirmed to increase consistently by 100ms for each card,
        // starting from 0ms for the first one, ensuring a smooth, staggered entrance.
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