const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // TopBar
  { regex: /#1c716b/gi, replacement: '#073b45' }, // dark teal
  // Navbar purple banner
  { regex: /bg-\[#9e2a7b\]/gi, replacement: 'bg-primary' },
  { regex: /text-\[#9e2a7b\]/gi, replacement: 'text-primary' },
  // Navbar prescription button (was blue)
  { regex: /border-blue-500/gi, replacement: 'border-primary' },
  { regex: /text-blue-500/gi, replacement: 'text-primary' },
  { regex: /hover:bg-blue-50/gi, replacement: 'hover:bg-primary-light' },
  // Feedback button
  { regex: /bg-\[#1b4e8f\]/gi, replacement: 'bg-primary' },
  { regex: /hover:bg-\[#153e72\]/gi, replacement: 'hover:bg-primary-dark' },
  // Floating Chat colors
  { regex: /#0A2540/gi, replacement: '#073b45' },
  { regex: /#1a3a5c/gi, replacement: '#073b45' },
  { regex: /#A0E2D9/gi, replacement: '#0fafb8' }, // change the chat button to primary teal
  // Replace old green highlights if any missed
  { regex: /text-green-100/gi, replacement: 'text-primary-light' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;

      for (const { regex, replacement } of replacements) {
        newContent = newContent.replace(regex, replacement);
      }

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log("Done updating all theme colors.");
