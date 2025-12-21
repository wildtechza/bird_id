import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read birds.json
const birdsPath = path.join(__dirname, '../public/birds/rsa/data/birds.json');
const birdsData = JSON.parse(fs.readFileSync(birdsPath, 'utf8'));

// Get sounds directory
const soundsDir = path.join(__dirname, '../public/birds/rsa/sounds');
const soundFiles = fs.readdirSync(soundsDir);

console.log(`Found ${soundFiles.length} sound files\n`);

// Create a map of sabap2 -> sound file path
const soundMap = new Map();
soundFiles.forEach(filename => {
    const match = filename.match(/^(\d+)_/);
    if (match) {
        const sabap2 = parseInt(match[1]);
        const soundPath = `/birds/rsa/sounds/${filename}`;
        soundMap.set(sabap2, soundPath);
        console.log(`Mapped sabap2 ${sabap2} → ${soundPath}`);
    }
});

// Add sound property to matching birds
let matchedCount = 0;

birdsData.data.forEach(bird => {
    if (soundMap.has(bird.sabap2)) {
        bird.sound = soundMap.get(bird.sabap2);
        matchedCount++;
    }
});

// Write the updated birds.json
fs.writeFileSync(birdsPath, JSON.stringify(birdsData, null, 2));

console.log(`\n✓ Successfully added sounds to ${matchedCount} birds`);
console.log(`Total birds: ${birdsData.data.length}`);
console.log(`Total sound files: ${soundFiles.length}`);
