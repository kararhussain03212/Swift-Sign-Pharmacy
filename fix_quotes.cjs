const fs = require('fs');
let c = fs.readFileSync('c:/xampp/htdocs/Pharmacy-3/src/data/products.js', 'utf8');

c = c.replace(/subCategory:\s*'Men's Health'/g, 'subCategory: "Men\'s Health"');
c = c.replace(/subCategory:\s*'Women's Health'/g, 'subCategory: "Women\'s Health"');
c = c.replace(/diseaseCategory:\s*'Men's Health'/g, 'diseaseCategory: "Men\'s Health"');
c = c.replace(/diseaseCategory:\s*'Women's Health'/g, 'diseaseCategory: "Women\'s Health"');

fs.writeFileSync('c:/xampp/htdocs/Pharmacy-3/src/data/products.js', c);
console.log('Fixed quotes');
