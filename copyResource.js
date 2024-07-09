const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'resource', 'ranked_authors.json');
const destPath = path.join(__dirname, 'dist', 'resource', 'ranked_authors.json');

fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.copyFileSync(srcPath, destPath);

console.log(`Copied ${srcPath} to ${destPath}`);
