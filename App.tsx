
import React, { useState } from 'react';
import { AppState, GeneratedImage, GenerationSettings } from './types';
import { generateWallpaper } from './services/geminiService';
import Header from './components/Header';
import SettingsBar from './components/SettingsBar';
import VibeInput from './components/VibeInput';
import ImageGallery from './components/ImageGallery';
import ImageModal from './components/ImageModal';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isGenerating: false,
    images: [],
    selectedImage: null,
    currentPrompt: '',
    referenceImage: null,
    settings: {
      aspectRatio: "9:16"
    }
  });

  const [error, setError] = useState<string | null>(null);

  const handleUpdateSettings = (settings: GenerationSettings) => {
    setState(prev => ({ ...prev, settings }));
  };

  const handleGenerate = async (vibe: string) => {
    setError(null);
    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      currentPrompt: vibe,
      images: [] 
    }));

    try {
      const generationPromises = Array(4).fill(null).map((_, i) => 
        generateWallpaper(
          `${vibe}, bright colors, child friendly, cartoon style, cute, masterpiece, 8k resolution`,
          state.settings.aspectRatio,
          state.referenceImage
        )
      );

      const results = await Promise.all(generationPromises);
      
      const newImages: GeneratedImage[] = results.map((url, i) => ({
        id: `${Date.now()}-${i}`,
        url,
        base64: url,
        prompt: vibe
      }));

      setState(prev => ({
        ...prev,
        isGenerating: false,
        images: newImages,
        referenceImage: null 
      }));
    } catch (err: any) {
      console.error("Magic failed:", err);
      setError("Oops! The magic got stuck. Try a different idea!");
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `magic-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemix = (image: GeneratedImage) => {
    setState(prev => ({
      ...prev,
      referenceImage: image.base64,
      selectedImage: null
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 selection:bg-sky-200">
      <Header />
      
      <main className="mx-auto max-w-lg">
        <div className="sticky top-0 z-40 bg-white/80 pb-2 backdrop-blur-xl border-b-2 border-slate-100">
          <SettingsBar 
            settings={state.settings} 
            onUpdate={handleUpdateSettings} 
          />
          <VibeInput 
            onGenerate={handleGenerate} 
            disabled={state.isGenerating}
            referenceImage={state.referenceImage}
            onClearReference={() => setState(prev => ({ ...prev, referenceImage: null }))}
          />
        </div>

        {error && (
          <div className="mx-4 mt-6 rounded-3xl bg-rose-50 p-5 ring-2 ring-rose-200 shadow-lg shadow-rose-100 animate-in bounce-in">
            <p className="text-center font-bold text-rose-600">{error}</p>
          </div>
        )}

        <ImageGallery 
          images={state.images} 
          isGenerating={state.isGenerating} 
          onSelect={(img) => setState(prev => ({ ...prev, selectedImage: img }))}
          aspectRatio={state.settings.aspectRatio}
        />
        
        {state.isGenerating && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="text-4xl animate-spin duration-[3000ms] mb-4">🌀</div>
            <p className="text-lg font-bold text-sky-500 animate-pulse">
              Sprinkling magic dust...
            </p>
          </div>
        )}
      </main>

      {state.selectedImage && (
        <ImageModal
          image={state.selectedImage}
          onClose={() => setState(prev => ({ ...prev, selectedImage: null }))}
          onDownload={handleDownload}
          onRemix={handleRemix}
        />
      )}

      {!state.selectedImage && !state.isGenerating && state.images.length > 0 && (
        <footer className="fixed bottom-6 left-0 right-0 z-30 px-6 pointer-events-none flex justify-center">
          <div className="rounded-[2rem] bg-indigo-600 p-4 text-center shadow-2xl ring-4 ring-indigo-200 pointer-events-auto">
            <p className="text-sm font-bold text-white">
              Tap a picture to save it or use the magic wand! 🪄
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
