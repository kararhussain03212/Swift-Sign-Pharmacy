const fs = require('fs');
let content = fs.readFileSync('src/data/categories.js', 'utf8');

const insertText = `  },
  {
    id: 9,
    name: 'Obesity',
    slug: 'obesity',
    showInNav: true,
    image: '/jellybee_gummies.png',
    subCategories: []
  },
  {
    id: 10,
    name: 'Performance and Wellness',
    slug: 'performance-and-wellness',
    showInNav: true,
    image: '/jellybee_gummies.png',
    subCategories: []
  }
]

export const diseasesList = [`;

// Regex to find the end of categories array and beginning of diseasesList
content = content.replace(/\s*\}\s*\]\s*export\s+const\s+diseasesList\s*=\s*\[/, '\n' + insertText);

fs.writeFileSync('src/data/categories.js', content, 'utf8');
