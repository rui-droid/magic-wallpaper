
export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";

export interface GeneratedImage {
  id: string;
  url: string;
  base64: string;
  prompt: string;
}

export interface GenerationSettings {
  aspectRatio: AspectRatio;
}

export interface AppState {
  isGenerating: boolean;
  images: GeneratedImage[];
  selectedImage: GeneratedImage | null;
  currentPrompt: string;
  referenceImage: string | null;
  settings: GenerationSettings;
}
