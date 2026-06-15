const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // Tailwind Arbitrary Value Replacements
  { regex: /\[#1A9E6E\]/gi, replacement: 'primary' },
  { regex: /\[#1A9e6e\]/gi, replacement: 'primary' },
  { regex: /\[#157A56\]/gi, replacement: 'primary-dark' },
  { regex: /\[#0D3D2B\]/gi, replacement: 'primary-dark' },
  { regex: /\[#E8F5F0\]/gi, replacement: 'primary-light' },
  { regex: /\[#e8f5f0\]/gi, replacement: 'primary-light' },
  
  // Inline Styles or raw hex Replacements (with CSS variables)
  // We use lookaround or just replace the hex with the new hex to be safe.
  // Actually, since the user wants the new colors, just replacing the raw hex is safest for inline styles like background: 'linear-gradient(...)'
  { regex: /#1A9E6E/gi, replacement: '#0FAFB8' },
  { regex: /#157A56/gi, replacement: '#073B45' },
  { regex: /#0D3D2B/gi, replacement: '#073B45' },
  { regex: /#E8F5F0/gi, replacement: '#EAFBFC' },
  
  // Also Feedback widget used green hover
  { regex: /bg-\[#00b289\]/gi, replacement: 'bg-primary' },
  { regex: /hover:bg-\[#009673\]/gi, replacement: 'hover:bg-primary-dark' },
  { regex: /focus:border-\[#1A9E6E\]/gi, replacement: 'focus:border-primary' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;

      for (const { regex, replacement } of replacements) {
        newContent = newContent.replace(regex, replacement);
      }

      // Special cases where `-primary` might result in `text--primary`
      // Wait, text-[#1A9E6E] -> text-primary (the '[' and ']' are captured and replaced!)
      // My regex was `\[#1A9E6E\]` replacing with `primary`.
      // So `text-[#1A9E6E]` becomes `text-primary`. That's correct!
      // `hover:text-[#1A9E6E]` becomes `hover:text-primary`. Correct!
      // `bg-[#1A9E6E]` becomes `bg-primary`. Correct!
      // `border-[#1A9E6E]` becomes `border-primary`. Correct!

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
console.log("Done updating colors.");
