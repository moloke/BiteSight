// TypeScript type definitions for Scans
export interface Scan {
    scanId: string;
    userId?: string;
    timestamp: number;
    source: 'camera' | 'imageUpload';
    imageUrl?: string;
    regionMetadata?: RegionMetadata;
    itemIds: string[];
    status?: 'processing' | 'completed' | 'failed';
}

export interface RegionMetadata {
    lat: number;
    lng: number;
    country?: string;
    city?: string;
}

export interface ParsedScan {
    scanId: string;
    items: ParsedItem[];
}

export interface ParsedItem {
    itemId: string;
    rawText: string;
    boundingBox?: BoundingBox;
    language: string;
    confidence: number;
}

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
