import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { AnalysisWarning } from '../../features/return-loss/types';

interface WarningBannerProps {
  warning: AnalysisWarning;
}

export const WarningBanner: React.FC<WarningBannerProps> = ({ warning }) => {
  const isCritical = warning.severity === 'critical';
  const isWarning = warning.severity === 'warning';

  const containerStyle = isCritical
    ? 'bg-red-950/40 border-red-800/60 text-red-200'
    : isWarning
    ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
    : 'bg-neutral-800/60 border-neutral-700 text-neutral-200';

  const iconColor = isCritical ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-neutral-400';

  const IconComponent = isCritical ? AlertTriangle : isWarning ? AlertCircle : Info;

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3.5 ${containerStyle}`}>
      <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
      <div className="flex flex-col gap-0.5 text-xs">
        <span className="font-bold">{warning.title}</span>
        <span className="opacity-90 leading-relaxed">{warning.message}</span>
      </div>
    </div>
  );
};
