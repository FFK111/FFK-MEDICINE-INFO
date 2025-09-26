
import React from 'react';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  isDisclaimer?: boolean;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, isDisclaimer = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden p-6 border-l-4 ${isDisclaimer ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500'}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 p-2 rounded-full ${isDisclaimer ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isDisclaimer ? 'text-yellow-800' : 'text-gray-800'}`}>{title}</h3>
          <p className={`mt-1 text-base ${isDisclaimer ? 'text-yellow-700' : 'text-gray-600'}`}>{content}</p>
        </div>
      </div>
    </div>
  );
};
