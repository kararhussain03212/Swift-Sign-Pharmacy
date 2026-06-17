const fs = require('fs');
const catContent = fs.readFileSync('src/data/categories.js', 'utf8');
const detailContent = fs.readFileSync('src/data/diseaseDetails.js', 'utf8');

const regex = /"slug":\s*"([^"]+)"/g;
let match;
const slugs = [];
while ((match = regex.exec(catContent)) !== null) {
  slugs.push(match[1]);
}

const missing = [];
for (const slug of slugs) {
  const keyRegex1 = new RegExp(`\\b'${slug}'\\s*:\\s*\\{`);
  const keyRegex2 = new RegExp(`\\b"${slug}"\\s*:\\s*\\{`);
  const keyRegex3 = new RegExp(`\\b${slug}\\s*:\\s*\\{`);
  if (!keyRegex1.test(detailContent) && !keyRegex2.test(detailContent) && !keyRegex3.test(detailContent)) {
    missing.push(slug);
  }
}

console.log(JSON.stringify([...new Set(missing)], null, 2));
