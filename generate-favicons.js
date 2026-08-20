#!/usr/bin/env node
const fs = require('fs');
const { createCanvas } = require('canvas');

// Color palette
const colors = {
  gold: '#c8a24a',
  cream: '#fffdf7',
  sage: 'rgba(76, 107, 90, 0.08)'
};

function generateFavicon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Calculate scaled dimensions
  const center = size / 2;
  const radius = (size / 2) - 4;
  const innerRadius = radius - (size * 0.15);

  // Fill background with cream
  ctx.fillStyle = colors.cream;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw inset shadow (inner circle)
  ctx.strokeStyle = colors.sage;
  ctx.lineWidth = size * 0.15;
  ctx.beginPath();
  ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw gold border
  ctx.strokeStyle = colors.gold;
  ctx.lineWidth = Math.max(2, size * 0.016);
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Draw emojis
  ctx.font = `${size * 0.4}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💧🌿', center, center + (size * 0.02));

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename} (${size}x${size})`);
}

// Generate different sizes
try {
  generateFavicon(16, 'assets/images/favicon-16x16.png');
  generateFavicon(32, 'assets/images/favicon-32x32.png');
  generateFavicon(180, 'assets/images/apple-touch-icon.png');
  console.log('\n✓ All favicons generated successfully!');
} catch (error) {
  console.error('Error generating favicons:', error.message);
  console.log('\nNote: This script requires the "canvas" package.');
  console.log('Install it with: npm install canvas');
  process.exit(1);
}
