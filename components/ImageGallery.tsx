
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGalleryProps {
  images: GeneratedImage[];
  isGenerating: boolean;
  onSelect: (image: GeneratedImage) => void;
  aspectRatio: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isGenerating, onSelect, aspectRatio }) => {
  const getAspectRatioClass = () => {
    switch(aspectRatio) {
      case "1:1": return "aspect-square";
      case "9:16": return "aspect-[9/16]";
      case "16:9": return "aspect-video";
      default: return "aspect-[9/16]";
    }
  };

  if (!isGenerating && images.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 rounded-full bg-white p-6 shadow-xl shadow-sky-100">
          <span className="text-5xl">🎨</span>
        </div>
        <p className="text-xl font-bold text-slate-700">Ready to make some art?</p>
        <p className="mt-2 text-sm text-slate-400 max-w-[200px]">Type anything you want to see in the box above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-32">
      {images.map((img) => (
        <button
          key={img.id}
          onClick={() => onSelect(img)}
          className={`relative overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-md ring-1 ring-slate-100 transition-all bouncy-hover active:scale-90 ${getAspectRatioClass()}`}
        >
          <img
            src={img.url}
            alt={img.prompt}
            className="h-full w-full object-cover rounded-[2rem]"
            loading="lazy"
          />
        </button>
      ))}
      
      {isGenerating && (
        <>
          {[...Array(4 - (images.length % 4 === 0 ? 0 : images.length % 4))].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className={`relative overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-sm ring-1 ring-slate-50 animate-pulse ${getAspectRatioClass()}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                 <div className="h-10 w-10 text-3xl animate-bounce">🖌️</div>
                 <div className="h-2 w-16 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ImageGallery;
