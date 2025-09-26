
import React from 'react';
import { MedicineInfo } from '../types';
import { InfoCard } from './InfoCard';
import { PillIcon } from './icons/PillIcon';
import { UsesIcon } from './icons/UsesIcon';
import { WarningIcon } from './icons/WarningIcon';
import { ClockIcon } from './icons/ClockIcon';
import { ShieldIcon } from './icons/ShieldIcon';

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

  return (
    <div className="space-y-4 animate-fade-in">
      <InfoCard title="Composition" content={medicineInfo.composition} icon={<PillIcon />} />
      <InfoCard title="Uses" content={medicineInfo.uses} icon={<UsesIcon />} />
      <InfoCard title="Major Side Effects" content={medicineInfo.sideEffects} icon={<WarningIcon />} />
      <InfoCard title="Recommended Time to Take" content={medicineInfo.timeToTake} icon={<ClockIcon />} />
      <InfoCard title="Disclaimer" content={medicineInfo.disclaimer} icon={<ShieldIcon />} isDisclaimer />
    </div>
  );
};
