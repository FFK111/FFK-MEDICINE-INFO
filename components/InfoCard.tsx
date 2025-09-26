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
      border: 'border-blue-400/80',
      iconBg: 'bg-blue-500/20',
      iconText: 'text-blue-600',
      titleText: 'text-slate-800',
      contentText: 'text-slate-700',
    },
    disclaimer: {
      border: 'border-yellow-400/80',
      iconBg: 'bg-yellow-500/20',
      iconText: 'text-yellow-700',
      titleText: 'text-yellow-900',
      contentText: 'text-yellow-800',
    },
    safety: {
      border: 'border-green-400/80',
      iconBg: 'bg-green-500/20',
      iconText: 'text-green-600',
      titleText: 'text-green-900',
      contentText: 'text-green-800',
    },
  };
  
  const theme = variants[variant];

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden p-6 border-l-4 ${theme.border} bg-green-50/20 backdrop-blur-xl`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${theme.iconBg}`}>
          <div className={theme.iconText}>
            {icon}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className={`text-lg font-extrabold uppercase tracking-wider ${theme.titleText}`}>
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