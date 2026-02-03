
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageModalProps {
  image: GeneratedImage;
  onClose: () => void;
  onDownload: (image: GeneratedImage) => void;
  onRemix: (image: GeneratedImage) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose, onDownload, onRemix }) => {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white/95 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 bouncy-hover active:bg-slate-200"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-lg font-bold text-slate-800">Your Magic Art!</p>
        </div>
        <div className="w-12" />
      </div>

      <div className="flex flex-1 items-center justify-center p-6 pt-0">
        <div className="relative max-h-full w-full overflow-hidden rounded-[3rem] shadow-2xl shadow-sky-200 border-8 border-white bg-white">
          <img
            src={image.url}
            alt={image.prompt}
            className="h-full w-full object-contain rounded-[2.5rem]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 pt-0 pb-12">
        <button
          onClick={() => onDownload(image)}
          className="flex items-center justify-center gap-3 rounded-3xl bg-pink-500 py-5 font-bold text-white shadow-lg shadow-pink-200 bouncy-hover"
        >
          <span className="text-xl">💾</span>
          Save it!
        </button>
        <button
          onClick={() => onRemix(image)}
          className="flex items-center justify-center gap-3 rounded-3xl bg-sky-500 py-5 font-bold text-white shadow-lg shadow-sky-200 bouncy-hover"
        >
          <span className="text-xl">🪄</span>
          Magic Wand
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
