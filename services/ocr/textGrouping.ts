import { OCRResult, TextBlock, GroupedMenuItem } from '@/types/OCR';
import { BoundingBox } from '@/types/Scan';

/**
 * Group text blocks into logical menu items
 */
export function groupTextBlocks(ocrResult: OCRResult): GroupedMenuItem[] {
    if (ocrResult.blocks.length === 0) {
        return [];
    }

    // Step 1: Sort blocks by Y-coordinate (top to bottom)
    const sortedBlocks = [...ocrResult.blocks].sort((a, b) =>
        a.boundingBox.y - b.boundingBox.y
    );

    // Step 2: Group blocks into lines (same Y-coordinate range)
    const lines = groupIntoLines(sortedBlocks);

    // Step 3: Detect prices to identify item boundaries
    const priceIndices = detectPrices(lines);

    // Step 4: Group lines into menu items
    const menuItems = groupLinesIntoItems(lines, priceIndices);

    return menuItems;
}

/**
 * Group text blocks into lines based on Y-coordinate proximity
 */
function groupIntoLines(blocks: TextBlock[]): TextBlock[][] {
    const lines: TextBlock[][] = [];
    const LINE_THRESHOLD = 15; // pixels - blocks within this Y distance are on same line

    let currentLine: TextBlock[] = [];
    let currentY = blocks[0].boundingBox.y;

    for (const block of blocks) {
        const blockY = block.boundingBox.y;

        if (Math.abs(blockY - currentY) <= LINE_THRESHOLD) {
            // Same line
            currentLine.push(block);
        } else {
            // New line
            if (currentLine.length > 0) {
                // Sort current line by X-coordinate (left to right)
                currentLine.sort((a, b) => a.boundingBox.x - b.boundingBox.x);
                lines.push(currentLine);
            }
            currentLine = [block];
            currentY = blockY;
        }
    }

    // Add last line
    if (currentLine.length > 0) {
        currentLine.sort((a, b) => a.boundingBox.x - b.boundingBox.x);
        lines.push(currentLine);
    }

    return lines;
}

/**
 * Detect which lines contain prices
 */
function detectPrices(lines: TextBlock[][]): Set<number> {
    const priceIndices = new Set<number>();
    const PRICE_PATTERN = /[$€£¥₹]\s*\d+([.,]\d{2})?|\d+([.,]\d{2})?\s*[$€£¥₹]/;

    lines.forEach((line, index) => {
        const lineText = line.map(b => b.text).join(' ');
        if (PRICE_PATTERN.test(lineText)) {
            priceIndices.add(index);
        }
    });

    return priceIndices;
}

/**
 * Group lines into menu items based on price locations
 */
function groupLinesIntoItems(
    lines: TextBlock[][],
    priceIndices: Set<number>
): GroupedMenuItem[] {
    const items: GroupedMenuItem[] = [];
    let currentItemLines: TextBlock[][] = [];
    let currentItemIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        currentItemLines.push(lines[i]);

        // If this line has a price, it's likely the end of an item
        if (priceIndices.has(i)) {
            const item = createMenuItem(currentItemLines, currentItemIndex);
            if (item) {
                items.push(item);
                currentItemIndex++;
            }
            currentItemLines = [];
        }
    }

    // Handle remaining lines (items without detected prices)
    if (currentItemLines.length > 0) {
        const item = createMenuItem(currentItemLines, currentItemIndex);
        if (item) {
            items.push(item);
        }
    }

    return items;
}

/**
 * Create a menu item from grouped lines
 */
function createMenuItem(
    lines: TextBlock[][],
    index: number
): GroupedMenuItem | null {
    if (lines.length === 0) {
        return null;
    }

    // Flatten all blocks
    const allBlocks = lines.flat();

    // Combine text
    const text = lines.map(line =>
        line.map(b => b.text).join(' ')
    ).join('\n');

    // Calculate bounding box that encompasses all blocks
    const boundingBox = calculateBoundingBox(allBlocks);

    // Calculate average confidence
    const confidence = allBlocks.reduce((sum, b) => sum + b.confidence, 0) / allBlocks.length;

    // Try to extract price
    const price = extractPrice(text);

    return {
        id: `item-${index}`,
        text,
        boundingBox,
        confidence,
        price,
    };
}

/**
 * Calculate bounding box that encompasses all text blocks
 */
function calculateBoundingBox(blocks: TextBlock[]): BoundingBox {
    const minX = Math.min(...blocks.map(b => b.boundingBox.x));
    const minY = Math.min(...blocks.map(b => b.boundingBox.y));
    const maxX = Math.max(...blocks.map(b => b.boundingBox.x + b.boundingBox.width));
    const maxY = Math.max(...blocks.map(b => b.boundingBox.y + b.boundingBox.height));

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}

/**
 * Extract price from text
 */
function extractPrice(text: string): string | undefined {
    const PRICE_PATTERN = /[$€£¥₹]\s*(\d+(?:[.,]\d{2})?)|(\d+(?:[.,]\d{2})?)\s*[$€£¥₹]/;
    const match = text.match(PRICE_PATTERN);

    if (match) {
        return match[0].trim();
    }

    return undefined;
}

/**
 * Detect menu structure patterns (columns, sections, etc.)
 */
export function detectMenuStructure(blocks: TextBlock[]): {
    hasColumns: boolean;
    columnCount: number;
    sections: string[];
} {
    // Simple heuristic: check if blocks are distributed across multiple X ranges
    const xPositions = blocks.map(b => b.boundingBox.x);
    const minX = Math.min(...xPositions);
    const maxX = Math.max(...xPositions);
    const range = maxX - minX;

    // If blocks span a wide range, likely multiple columns
    const hasColumns = range > 500; // pixels
    const columnCount = hasColumns ? 2 : 1;

    return {
        hasColumns,
        columnCount,
        sections: [], // TODO: Implement section detection
    };
}

/**
 * Cluster blocks by spatial proximity
 */
export function clusterByProximity(
    blocks: TextBlock[],
    maxDistance: number = 50
): TextBlock[][] {
    const clusters: TextBlock[][] = [];
    const visited = new Set<number>();

    for (let i = 0; i < blocks.length; i++) {
        if (visited.has(i)) continue;

        const cluster: TextBlock[] = [blocks[i]];
        visited.add(i);

        // Find all blocks within maxDistance
        for (let j = i + 1; j < blocks.length; j++) {
            if (visited.has(j)) continue;

            const distance = calculateDistance(
                blocks[i].boundingBox,
                blocks[j].boundingBox
            );

            if (distance <= maxDistance) {
                cluster.push(blocks[j]);
                visited.add(j);
            }
        }

        clusters.push(cluster);
    }

    return clusters;
}

/**
 * Calculate distance between two bounding boxes
 */
function calculateDistance(box1: BoundingBox, box2: BoundingBox): number {
    const center1X = box1.x + box1.width / 2;
    const center1Y = box1.y + box1.height / 2;
    const center2X = box2.x + box2.width / 2;
    const center2Y = box2.y + box2.height / 2;

    return Math.sqrt(
        Math.pow(center2X - center1X, 2) + Math.pow(center2Y - center1Y, 2)
    );
}
