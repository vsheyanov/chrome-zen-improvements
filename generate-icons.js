#!/usr/bin/env node
/**
 * Icon generator for Tab Event Logger Chrome Extension
 * Creates 16x16, 48x48, and 128x128 PNG icons
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Clear canvas with transparent background
    ctx.clearRect(0, 0, size, size);

    // Calculate dimensions
    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 128; // Scale based on 128px base size

    // Background circle
    const radius = size / 2 - 2;
    ctx.fillStyle = '#4285F4'; // Chrome blue
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw tab rectangles
    const tabWidth = 40 * scale;
    const tabHeight = 25 * scale;
    const tabX = centerX - tabWidth / 2;
    const tabY = centerY - tabHeight / 2;

    // Main tab (white)
    ctx.fillStyle = 'white';
    ctx.fillRect(tabX, tabY, tabWidth, tabHeight);

    // Background tabs (semi-transparent white)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const backTabWidth = tabWidth * 0.8;
    const backTabOffset = 15 * scale;
    const backTabYOffset = 8 * scale;

    // Left background tab
    ctx.fillRect(tabX - backTabOffset, tabY - backTabYOffset, backTabWidth, tabHeight);

    // Right background tab
    ctx.fillRect(tabX + backTabOffset, tabY - backTabYOffset, backTabWidth, tabHeight);

    // Add "+" symbol for new tab
    ctx.strokeStyle = '#4285F4';
    ctx.lineWidth = Math.max(1, 3 * scale);
    ctx.lineCap = 'round';

    const plusSize = 8 * scale;
    const plusX = centerX + tabWidth / 2 + 10 * scale;
    const plusY = centerY;

    // Horizontal line of +
    ctx.beginPath();
    ctx.moveTo(plusX - plusSize / 2, plusY);
    ctx.lineTo(plusX + plusSize / 2, plusY);
    ctx.stroke();

    // Vertical line of +
    ctx.beginPath();
    ctx.moveTo(plusX, plusY - plusSize / 2);
    ctx.lineTo(plusX, plusY + plusSize / 2);
    ctx.stroke();

    return canvas;
}

async function main() {
    // Create icons directory if it doesn't exist
    const iconsDir = 'icons';
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir);
    }

    // Generate icons in required sizes
    const sizes = [16, 48, 128];

    console.log('🎨 Generating icons for Tab Event Logger...\n');

    for (const size of sizes) {
        console.log(`Generating ${size}x${size} icon...`);

        const canvas = createIcon(size);
        const buffer = canvas.toBuffer('image/png');
        const filename = `icon${size}.png`;
        const filepath = path.join(iconsDir, filename);

        fs.writeFileSync(filepath, buffer);
        console.log(`✅ Saved ${filepath}`);
    }

    console.log('\n🎉 All icons generated successfully!');
    console.log('Icons saved in the icons/ directory:');
    sizes.forEach(size => {
        console.log(`  - icons/icon${size}.png`);
    });
}

if (require.main === module) {
    main().catch(console.error);
}
