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
      bg: 'bg-white/60',
      border: 'border-blue-500/60',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
    disclaimer: {
      bg: 'bg-white/60',
      border: 'border-yellow-500/60',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
    safety: {
      bg: 'bg-white/60',
      border: 'border-green-500/60',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      titleText: 'text-slate-900',
      contentText: 'text-slate-700',
    },
  };
  
  const theme = variants[variant];

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden p-6 border-l-4 ${theme.border} ${theme.bg} backdrop-blur-xl`}>
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