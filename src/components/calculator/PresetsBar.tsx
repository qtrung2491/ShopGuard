import React from 'react';
import { PRESETS, Preset } from '../../features/return-loss/presets';
import { OrderInput } from '../../features/return-loss/types';
import { Sparkles } from 'lucide-react';

interface PresetsBarProps {
  onSelectPreset: (presetInput: OrderInput) => void;
  activePresetId?: string;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({ onSelectPreset }) => {
  return (
    <div className="w-full flex flex-col gap-2 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
        <Sparkles className="w-4 h-4 text-lime-400" />
        <span>Thử ngay các Kịch bản Kế toán Mẫu (Presets):</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESETS.map((preset: Preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelectPreset(preset.input)}
            className="flex flex-col text-left p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-lime-500/50 hover:bg-neutral-900/90 transition-all duration-150 group"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors">
                {preset.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                {preset.input.platform}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1 leading-tight">
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
