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

// Function to normalize name for matching (remove special chars, lowercase, replace spaces/hyphens with underscore)
function normalizeName(name) {
    return name
        .toLowerCase()
        .replace(/['']/g, '')
        .replace(/[\s-]+/g, '_')
        .replace(/[()]/g, '');
}

// Create a map of normalized fullName -> bird
const birdMap = new Map();
birdsData.data.forEach(bird => {
    const normalized = normalizeName(bird.fullName);
    birdMap.set(normalized, bird);
});

let matchedCount = 0;
let unmatchedFiles = [];

soundFiles.forEach(filename => {
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    
    // Skip if already has sabap2 prefix (starts with number_)
    if (/^\d+_/.test(nameWithoutExt)) {
        console.log(`⏭  Skipping (already prefixed): ${filename}`);
        return;
    }
    
    const normalized = normalizeName(nameWithoutExt);
    
    if (birdMap.has(normalized)) {
        const bird = birdMap.get(normalized);
        const newFilename = `${bird.sabap2}_${nameWithoutExt}${ext}`;
        const oldPath = path.join(soundsDir, filename);
        const newPath = path.join(soundsDir, newFilename);
        
        fs.renameSync(oldPath, newPath);
        console.log(`✓ Renamed: ${filename} → ${newFilename} (sabap2: ${bird.sabap2})`);
        matchedCount++;
    } else {
        unmatchedFiles.push(filename);
        console.log(`✗ No match: ${filename} (normalized: ${normalized})`);
    }
});

console.log(`\n✓ Successfully renamed ${matchedCount} files`);
if (unmatchedFiles.length > 0) {
    console.log(`⚠ ${unmatchedFiles.length} files could not be matched:`);
    unmatchedFiles.forEach(f => console.log(`  - ${f}`));
}
