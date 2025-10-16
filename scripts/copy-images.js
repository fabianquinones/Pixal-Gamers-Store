const fs = require('fs');
const path = require('path');
const src = path.join('C:', 'Users', 'fabia', 'Desktop', 'Pixal-Gamers-Store-main', 'Images');
const dest = path.join('C:', 'Users', 'fabia', 'Desktop', 'pixelstore', 'public', 'images');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
fs.readdirSync(src).forEach(f => {
  const s = path.join(src, f);
  const d = path.join(dest, f);
  try {
    fs.copyFileSync(s, d);
    console.log('copied', f);
  } catch (e) {
    console.error('fail', f, e.message);
  }
});
console.log('done');
