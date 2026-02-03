
import React from 'react';
import { AspectRatio, GenerationSettings } from '../types';

interface SettingsBarProps {
  settings: GenerationSettings;
  onUpdate: (settings: GenerationSettings) => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({ settings, onUpdate }) => {
  const ratios: AspectRatio[] = ["1:1", "9:16", "16:9"];

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      <label className="text-[14px] font-bold text-slate-500 ml-1">Pick a shape:</label>
      <div className="flex gap-3 pb-1">
        {ratios.map((r) => (
          <button
            key={r}
            onClick={() => onUpdate({ ...settings, aspectRatio: r })}
            className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold transition-all bouncy-hover ${
              settings.aspectRatio === r
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 ring-4 ring-sky-100'
                : 'bg-white text-slate-400 hover:bg-slate-50 ring-1 ring-slate-200'
            }`}
          >
            {r === "9:16" ? "📱 Phone" : r === "1:1" ? "⬜ Square" : "📺 TV"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsBar;
