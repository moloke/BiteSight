import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Config } from '@/constants/Config';
import { OCRResult, TextBlock, BoundingBox } from '@/types/OCR';

/**
 * Convert image URI to base64
 */
async function imageToBase64(imageUri: string): Promise<string> {
    if (Platform.OS === 'web') {
        // On web, fetch the blob and convert to base64
        const response = await fetch(imageUri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = (reader.result as string).split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } else {
        // On native, use FileSystem
        return await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
    }
}

/**
 * Detect text in an image using Google Cloud Vision API
 */
export async function detectText(imageUri: string): Promise<OCRResult> {
    try {
        // Convert image to base64
        const base64Image = await imageToBase64(imageUri);

        // Call Google Cloud Vision API
        const response = await fetch(
            `${Config.GOOGLE_CLOUD_VISION.ENDPOINT}?key=${Config.GOOGLE_CLOUD_VISION.API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requests: [
                        {
                            image: {
                                content: base64Image,
                            },
                            features: [
                                {
                                    type: 'TEXT_DETECTION',
                                    maxResults: 50,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Cloud Vision API error: ${response.status}`);
        }

        const data = await response.json();

        if (data.responses[0].error) {
            throw new Error(data.responses[0].error.message);
        }

        // Parse response into our OCRResult format
        return parseCloudVisionResponse(data.responses[0]);
    } catch (error) {
        console.error('Text detection error:', error);
        throw error;
    }
}

/**
 * Parse Google Cloud Vision API response into our OCRResult format
 */
function parseCloudVisionResponse(response: any): OCRResult {
    const textAnnotations = response.textAnnotations || [];

    if (textAnnotations.length === 0) {
        return {
            fullText: '',
            blocks: [],
            confidence: 0,
        };
    }

    // First annotation is the full text
    const fullText = textAnnotations[0].description || '';

    // Remaining annotations are individual words/blocks
    const blocks: TextBlock[] = textAnnotations.slice(1).map((annotation: any) => {
        const vertices = annotation.boundingPoly.vertices;

        return {
            text: annotation.description,
            boundingBox: {
                x: vertices[0].x || 0,
                y: vertices[0].y || 0,
                width: (vertices[1].x || 0) - (vertices[0].x || 0),
                height: (vertices[2].y || 0) - (vertices[0].y || 0),
            },
            confidence: annotation.confidence || 0.9, // Cloud Vision doesn't always provide confidence
        };
    });

    // Calculate average confidence
    const avgConfidence = blocks.reduce((sum, block) => sum + block.confidence, 0) / blocks.length;

    return {
        fullText,
        blocks,
        confidence: avgConfidence,
    };
}

/**
 * Extract bounding boxes from OCR result
 */
export function extractBoundingBoxes(result: OCRResult): BoundingBox[] {
    return result.blocks.map(block => block.boundingBox);
}

/**
 * Calculate overall confidence score
 */
export function calculateConfidence(result: OCRResult): number {
    return result.confidence;
}

/**
 * Filter low-confidence text blocks
 */
export function filterLowConfidence(
    result: OCRResult,
    minConfidence: number = Config.OCR.MIN_CONFIDENCE
): OCRResult {
    return {
        ...result,
        blocks: result.blocks.filter(block => block.confidence >= minConfidence),
    };
}
