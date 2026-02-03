
import React, { useState } from 'react';

interface VibeInputProps {
  onGenerate: (vibe: string) => void;
  disabled: boolean;
  referenceImage: string | null;
  onClearReference: () => void;
}

const VibeInput: React.FC<VibeInputProps> = ({ onGenerate, disabled, referenceImage, onClearReference }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onGenerate(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full p-4">
      {referenceImage && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-amber-50 p-3 ring-2 ring-amber-200 animate-in slide-in-from-top-2">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-sm">
            <img src={referenceImage} className="h-full w-full object-cover" alt="Ref" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-amber-700">Using your favorite picture! 🌟</p>
          </div>
          <button 
            type="button" 
            onClick={onClearReference}
            className="rounded-full bg-amber-200 p-2 text-amber-700 hover:bg-amber-300 bouncy-hover"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <div className="relative flex flex-col gap-3">
        <label className="text-[14px] font-bold text-slate-500 ml-1">What should we draw?</label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="A fluffy pink dragon eating ice cream..."
            disabled={disabled}
            className="w-full rounded-3xl bg-white border-2 border-slate-100 py-5 pl-6 pr-20 text-lg text-slate-800 placeholder-slate-300 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-50 shadow-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="absolute right-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-lg transition-all bouncy-hover disabled:from-slate-200 disabled:to-slate-300"
          >
            <span className="text-2xl">✨</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default VibeInput;
