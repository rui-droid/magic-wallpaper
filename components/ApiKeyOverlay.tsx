
import React from 'react';

interface ApiKeyOverlayProps {
  onKeySelected: () => void;
}

const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onKeySelected }) => {
  const handleOpenSelector = async () => {
    try {
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
        onKeySelected();
      }
    } catch (error) {
      console.error("Failed to open key selector", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl bg-indigo-600/20 p-4 ring-1 ring-indigo-500/50">
            <svg className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-white">VibeWall</h1>
        <p className="mb-8 text-sm text-zinc-400">
          To generate ultra-high quality 4K wallpapers using Gemini 3 Pro, you need to select a billing-enabled API key.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleOpenSelector}
            className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition-all active:scale-95 hover:bg-indigo-500"
          >
            Select API Key
          </button>
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs font-medium text-zinc-500 underline decoration-zinc-700 underline-offset-4"
          >
            Learn about billing for Gemini API
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyOverlay;
