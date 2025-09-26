import React from 'react';

interface InfoCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  variant?: 'default' | 'disclaimer' | 'safety';
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, variant = 'default' }) => {
  const variants = {
    default: {
      border: 'border-blue-500',
      bg: 'bg-white',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      titleText: 'text-gray-800',
      contentText: 'text-gray-600',
    },
    disclaimer: {
      border: 'border-yellow-500',
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600',
      titleText: 'text-yellow-800',
      contentText: 'text-yellow-700',
    },
    safety: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      titleText: 'text-green-800',
      contentText: 'text-green-700',
    },
  };
  
  const theme = variants[variant];

  return (
    <div className={`rounded-xl shadow-md overflow-hidden p-6 border-l-4 ${theme.border} ${theme.bg}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${theme.iconBg}`}>
          <div className={theme.iconText}>
            {icon}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className={`text-lg font-bold uppercase tracking-wider ${theme.titleText}`}>
            {title}
          </h3>
          <p className={`mt-1 text-base whitespace-pre-wrap ${theme.contentText}`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
