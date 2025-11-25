import { GroupedMenuItem } from './OCR';

// TypeScript type definitions for Scans
export interface Scan {
    id: string;
    userId: string;
    items: GroupedMenuItem[];
    imageUrl?: string;
    timestamp: string;
    itemCount: number;
    location?: {
        latitude: number;
        longitude: number;
        name?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ScanInput {
    items: GroupedMenuItem[];
    timestamp: string;
    itemCount: number;
    location?: {
        latitude: number;
        longitude: number;
        name?: string;
    };
}

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
