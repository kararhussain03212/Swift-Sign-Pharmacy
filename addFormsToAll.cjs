const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// We will look for lines like `    name: '...',`
content = content.replace(/(\s+)name:\s*'([^']+)',/g, (match, space, name) => {
  let form = 'Tablets';
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('gummies')) form = 'Gummies';
  else if (lowerName.includes('cream')) form = 'Cream';
  else if (lowerName.includes('softgels')) form = 'Softgels';
  else if (lowerName.includes('capsules') || lowerName.includes('caps')) form = 'Capsules';
  else if (lowerName.includes('drops')) form = 'Drops';
  else if (lowerName.includes('serum')) form = 'Serum';
  else if (lowerName.includes('powder') || lowerName.includes('whey')) form = 'Powder';
  else if (lowerName.includes('lotion')) form = 'Lotion';
  else if (lowerName.includes('tabs') || lowerName.includes('tablet')) form = 'Tablets';
  else if (lowerName.includes('sunscreen') || lowerName.includes('shield')) form = 'Cream';
  else if (lowerName.includes('oil')) form = 'Oil';
  else if (lowerName.includes('complex')) form = 'Capsules';
  else form = 'Tablets';

  return `${match}${space}form: '${form}',`;
});

// Since the user already added form: 'Gummies' to melatonin, we might have a duplicate
// Let's remove any pre-existing form lines before doing the replace, or just clean up duplicates.
let lines = content.split('\n');
let newLines = [];
let skipNextForm = false;

// Actually simpler: just remove all `form: '...',` lines first, then add them.
let cleanContent = fs.readFileSync('src/data/products.js', 'utf8').replace(/\s+form:\s*'[^']+',/g, '');

let finalContent = cleanContent.replace(/(\s+)name:\s*'([^']+)',/g, (match, space, name) => {
  let form = 'Tablets';
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('gummies')) form = 'Gummies';
  else if (lowerName.includes('cream')) form = 'Cream';
  else if (lowerName.includes('softgels')) form = 'Softgels';
  else if (lowerName.includes('capsules') || lowerName.includes('caps')) form = 'Capsules';
  else if (lowerName.includes('drops')) form = 'Drops';
  else if (lowerName.includes('serum')) form = 'Serum';
  else if (lowerName.includes('powder') || lowerName.includes('whey') || lowerName.includes('creatine')) form = 'Powder';
  else if (lowerName.includes('lotion')) form = 'Lotion';
  else if (lowerName.includes('tabs') || lowerName.includes('tablet')) form = 'Tablets';
  else if (lowerName.includes('sunscreen') || lowerName.includes('shield')) form = 'Cream';
  else if (lowerName.includes('oil')) form = 'Oil';
  else if (lowerName.includes('complex')) form = 'Capsules';
  else form = 'Tablets';

  return `${match}${space}form: '${form}',`;
});

fs.writeFileSync('src/data/products.js', finalContent, 'utf8');
console.log('Forms added successfully!');
