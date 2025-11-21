// TypeScript type definitions for OCR
export interface OCRResult {
    text: string;
    boundingBox: BoundingBox;
    confidence: number;
    language: string;
    blockIndex?: number;
}

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface TextBlock {
    lines: OCRResult[];
    boundingBox: BoundingBox;
    averageConfidence: number;
}

export interface GroupedMenuItem {
    text: string;
    lines: OCRResult[];
    boundingBox: BoundingBox;
    confidence: number;
}
