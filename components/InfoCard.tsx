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
      bg: 'bg-sky-950/30',
      border: 'border-blue-400/60',
      iconBg: 'bg-blue-500/20',
      iconText: 'text-blue-300',
      titleText: 'text-slate-100',
      contentText: 'text-slate-300',
    },
    disclaimer: {
      bg: 'bg-amber-900/30',
      border: 'border-yellow-400/60',
      iconBg: 'bg-yellow-500/20',
      iconText: 'text-yellow-300',
      titleText: 'text-yellow-100',
      contentText: 'text-yellow-300',
    },
    safety: {
      bg: 'bg-teal-900/30',
      border: 'border-green-400/60',
      iconBg: 'bg-green-500/20',
      iconText: 'text-green-400',
      titleText: 'text-green-100',
      contentText: 'text-green-300',
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