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
      bg: 'bg-gray-800/50',
      border: 'border-blue-400',
      iconBg: 'bg-blue-900/60',
      iconText: 'text-blue-300',
      titleText: 'text-gray-100',
      contentText: 'text-gray-300',
    },
    disclaimer: {
      bg: 'bg-gray-800/50',
      border: 'border-yellow-400',
      iconBg: 'bg-yellow-900/60',
      iconText: 'text-yellow-300',
      titleText: 'text-gray-100',
      contentText: 'text-gray-300',
    },
    safety: {
      bg: 'bg-gray-800/50',
      border: 'border-green-400',
      iconBg: 'bg-green-900/60',
      iconText: 'text-green-300',
      titleText: 'text-gray-100',
      contentText: 'text-gray-300',
    },
  };
  
  const theme = variants[variant];

  return (
    <div className={`rounded-2xl shadow-lg overflow-hidden p-6 border-l-4 ${theme.border} ${theme.bg} backdrop-blur-xl border-white/5`}>
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