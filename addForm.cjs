const fs = require('fs');
let content = fs.readFileSync('src/data/products.js', 'utf8');

// Accurate regex to add form: 'Gummies', to id 10
content = content.replace(
  /slug: 'melatonin-sleep-gummies',\s*name: 'Melatonin 5mg Sleep Support Gummies Berry',/g,
  "slug: 'melatonin-sleep-gummies',\n    form: 'Gummies',\n    name: 'Melatonin 5mg Sleep Support Gummies Berry',"
);

fs.writeFileSync('src/data/products.js', content, 'utf8');
