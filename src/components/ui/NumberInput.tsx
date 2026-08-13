import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
  placeholder?: string;
  helpText?: string;
  step?: number;
  min?: number;
  max?: number;
  isPercent?: boolean;
  quickStep?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  suffix = 'đ',
  placeholder = '0',
  helpText,
  min = 0,
  max,
  isPercent = false,
  quickStep,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('');

  useEffect(() => {
    if (value === 0 && displayValue === '') return;
    if (isPercent) {
      setDisplayValue(value ? value.toString() : '0');
    } else {
      setDisplayValue(value ? value.toLocaleString('vi-VN') : '0');
    }
  }, [value, isPercent]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    
    // Extract numbers
    if (isPercent) {
      const cleaned = raw.replace(',', '.').replace(/[^\d.]/g, '');
      const parsed = parseFloat(cleaned);
      const val = isNaN(parsed) ? 0 : parsed;
      setDisplayValue(raw);
      onChange(Math.max(min, max !== undefined ? Math.min(max, val) : val));
    } else {
      const cleaned = raw.replace(/[^\d]/g, '');
      const val = parseInt(cleaned, 10);
      const numericVal = isNaN(val) ? 0 : val;
      setDisplayValue(numericVal === 0 ? '' : numericVal.toLocaleString('vi-VN'));
      onChange(Math.max(min, numericVal));
    }
  };

  const handleBlur = () => {
    if (isPercent) {
      setDisplayValue(value ? value.toString() : '0');
    } else {
      setDisplayValue(value ? value.toLocaleString('vi-VN') : '0');
    }
  };

  const handleAddQuick = (amount: number) => {
    const newVal = Math.max(min, (value || 0) + amount);
    onChange(newVal);
  };

  return (
    <div className="flex flex-col gap-1.5" id={`input-container-${id}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-neutral-300 flex items-center gap-1">
          {label}
        </label>
        {helpText && <span className="text-[11px] text-neutral-500">{helpText}</span>}
      </div>

      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          inputMode={isPercent ? 'decimal' : 'numeric'}
          value={displayValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-3.5 py-2.5 text-sm font-mono text-neutral-100 placeholder-neutral-600 transition-colors focus:border-lime-400 focus:bg-neutral-900 focus:outline-none"
        />
        <div className="absolute right-3 flex items-center gap-1 pointer-events-none text-neutral-400 text-xs font-semibold">
          {suffix}
        </div>
      </div>

      {quickStep && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <button
            type="button"
            onClick={() => handleAddQuick(quickStep)}
            className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
          >
            +{isPercent ? `${quickStep}%` : `${(quickStep / 1000).toLocaleString()}k`}
          </button>
          <button
            type="button"
            onClick={() => handleAddQuick(quickStep * 5)}
            className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
          >
            +{isPercent ? `${quickStep * 5}%` : `${((quickStep * 5) / 1000).toLocaleString()}k`}
          </button>
          <button
            type="button"
            onClick={() => onChange(0)}
            className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 ml-auto transition-colors"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
};
