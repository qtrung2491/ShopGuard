import React from 'react';

interface SliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export const Slider: React.FC<SliderProps> = ({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 5,
  helpText,
}) => {
  const getLabelDescription = (val: number) => {
    if (val === 0) return 'Mất/hỏng hoàn toàn (0% hồi phục)';
    if (val === 100) return 'Tốt, bán mới 100%';
    if (val <= 30) return `Hỏng nặng (${val}% hồi phục giá trị)`;
    if (val <= 70) return `Mẫu/Xả hàng (${val}% hồi phục giá trị)`;
    return `Khá tốt (${val}% hồi phục giá trị)`;
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-neutral-950/60 border border-neutral-800/80 p-3.5" id={`slider-container-${id}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-neutral-300">
          {label}
        </label>
        <span className="text-xs font-mono font-bold text-lime-400 bg-lime-950/40 border border-lime-800/40 px-2 py-0.5 rounded">
          {value}%
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-800 accent-lime-400 focus:outline-none"
      />

      <div className="flex items-center justify-between text-[11px] text-neutral-400">
        <span>0% (Hỏng hoàn toàn)</span>
        <span className="text-neutral-300 font-medium">{getLabelDescription(value)}</span>
        <span>100% (Bán mới)</span>
      </div>

      {helpText && <p className="text-[11px] text-neutral-500 mt-0.5">{helpText}</p>}
    </div>
  );
};
