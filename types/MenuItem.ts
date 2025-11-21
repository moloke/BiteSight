// TypeScript type definitions for Menu Items
export interface MenuItem {
  itemId: string;
  scanId: string;
  rawText: string;
  language: string;
  normalizedName: string;
  modifiers: string[];
  ingredients: string[];
  cooking?: string;
  confidence: number;
  translations: Record<string, string>;
  imageCandidates: ImageCandidate[];
  selectedImage?: SelectedImage;
  userFeedback?: UserFeedback;
  allergens?: string[];
  createdAt?: number;
}

export interface ImageCandidate {
  source: 'unsplash' | 'pexels' | 'generated';
  url: string;
  thumbnailUrl?: string;
  score: number;
  attribution?: string;
  photographer?: string;
  photographerUrl?: string;
}

export interface SelectedImage {
  url: string;
  thumbnailUrl?: string;
  source: 'unsplash' | 'pexels' | 'generated';
  licenseId?: string;
  attribution?: string;
}

export interface UserFeedback {
  likes: number;
  dislikes: number;
}

export interface NormalizedItem {
  name: string;
  modifiers: string[];
  ingredients: string[];
  cooking?: string;
  notes?: string;
  allergens?: string[];
}
