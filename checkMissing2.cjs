const fs = require('fs');

const catContent = fs.readFileSync('src/data/categories.js', 'utf8');
const detContent = fs.readFileSync('src/data/diseaseDetails.js', 'utf8');

// Get all slugs from categories.js
const catSlugs = [];
const catRegex = /"slug":\s*"([^"]+)"/g;
let match;
while ((match = catRegex.exec(catContent)) !== null) {
  catSlugs.push(match[1]);
}

// Get all keys from diseaseDetails.js
const detKeys = [];
const detRegex = /^  '?([a-z0-9-]+)'?: \{/gm;
while ((match = detRegex.exec(detContent)) !== null) {
  detKeys.push(match[1]);
}

const missing = [];
const missingButFixed = [];

for (const slug of catSlugs) {
  if (!detKeys.includes(slug)) {
    // Check if adding '-s' somewhere helps, or maybe just look for a key without '-s'
    // Actually, check if the detKeys has a similar slug
    const similar = detKeys.find(k => k.replace(/-/g, '') === slug.replace(/-/g, '') || k.replace(/s/g, '') === slug.replace(/s/g, ''));
    if (similar) {
      missingButFixed.push(`${slug} -> ${similar}`);
    } else {
      missing.push(slug);
    }
  }
}

console.log("Total categories slugs:", catSlugs.length);
console.log("Total details keys:", detKeys.length);
console.log("\nTruly missing diseases:");
console.log(missing);
console.log("\nMissing due to typos:");
console.log(missingButFixed);