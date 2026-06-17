const fs = require('fs');

const catContent = fs.readFileSync('src/data/categories.js', 'utf8');

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/'s\b/g, 's') // Alzheimer's -> alzheimers
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric to hyphen
    .replace(/^-+|-+$/g, ''); // trim hyphens
};

const fixedCatContent = catContent.replace(/\{\s*"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)"\s*\}/g, (match, name, oldSlug) => {
  const newSlug = generateSlug(name);
  return `{\n    "name": "${name}",\n    "slug": "${newSlug}"\n  }`;
});

fs.writeFileSync('src/data/categories.js', fixedCatContent, 'utf8');
console.log('Fixed categories.js based on names');
