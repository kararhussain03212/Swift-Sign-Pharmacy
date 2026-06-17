const fs = require('fs');

const catContent = fs.readFileSync('src/data/categories.js', 'utf8');
const detContent = fs.readFileSync('src/data/diseaseDetails.js', 'utf8');

// Parse diseaseDetails.js to get a mapping from title to key
const titleToSlug = new Map();
const detRegex = /^  '?([a-z0-9-]+)'?: \{\s*title:\s*"([^"]+)",/gm;
let match;
while ((match = detRegex.exec(detContent)) !== null) {
  const key = match[1];
  const title = match[2];
  titleToSlug.set(title.toLowerCase().trim(), key);
}

// Also handle single quotes for title in diseaseDetails.js
const detRegex2 = /^  '?([a-z0-9-]+)'?: \{\s*title:\s*'([^']+)',/gm;
while ((match = detRegex2.exec(detContent)) !== null) {
  const key = match[1];
  const title = match[2];
  titleToSlug.set(title.toLowerCase().trim(), key);
}

// Fallback for missing or weirdly formatted titles: 
// we will also map the old slug without hyphens to the correct slug
const cleanToSlug = new Map();
const allKeysRegex = /^  '?([a-z0-9-]+)'?: \{/gm;
while ((match = allKeysRegex.exec(detContent)) !== null) {
  const key = match[1];
  cleanToSlug.set(key.replace(/[-s]/g, ''), key);
}

let fixedCatContent = catContent.replace(/\{\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)"\s*\}/g, (match, name, slug) => {
  let correctSlug = slug;
  const nameLower = name.toLowerCase().trim();
  
  if (titleToSlug.has(nameLower)) {
    correctSlug = titleToSlug.get(nameLower);
  } else {
    // fallback clean match
    const cleanSlug = slug.replace(/[-s]/g, '');
    if (cleanToSlug.has(cleanSlug)) {
      correctSlug = cleanToSlug.get(cleanSlug);
    }
  }

  return `{\n    "name": "${name}",\n    "slug": "${correctSlug}"\n  }`;
});

// Also handle single quote categories if any (though looking at the file they use double quotes mostly, except at the top)
fixedCatContent = fixedCatContent.replace(/\{\s*name:\s*'([^']+)',\s*slug:\s*'([^']+)'\s*\}/g, (match, name, slug) => {
  let correctSlug = slug;
  const nameLower = name.toLowerCase().trim();
  if (titleToSlug.has(nameLower)) {
    correctSlug = titleToSlug.get(nameLower);
  } else {
    const cleanSlug = slug.replace(/[-s]/g, '');
    if (cleanToSlug.has(cleanSlug)) {
      correctSlug = cleanToSlug.get(cleanSlug);
    }
  }
  return `{ name: '${name}', slug: '${correctSlug}' }`;
});

fs.writeFileSync('src/data/categories.js', fixedCatContent, 'utf8');
console.log('Fixed categories.js');
