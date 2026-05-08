/*
Choosimple build-time affiliate link updater.
Run from the repo root after filling affiliate-links.js:
  node tools/apply-affiliate-links.js

This writes populated Geniuslink URLs directly into href attributes for links with data-affiliate-id.
*/
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registryText = fs.readFileSync(path.join(root, 'affiliate-links.js'), 'utf8');
const match = registryText.match(/window\.CS_AFFILIATE_LINKS\s*=\s*({[\s\S]*});?\s*$/);
if (!match) throw new Error('Could not read window.CS_AFFILIATE_LINKS from affiliate-links.js');
const registry = JSON.parse(match[1]);

const htmlFiles = fs.readdirSync(root).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  html = html.replace(/<a\b([^>]*?)data-affiliate-id="([^"]+)"([^>]*)>/g, (tag, before, id, after) => {
    const record = registry[id];
    const url = record && typeof record === 'object' ? record.url : record;
    if (!url) return tag;

    let updated = tag.replace(/href="[^"]*"/, `href="${url}"`);
    if (!/href="/.test(updated)) updated = updated.replace('<a ', `<a href="${url}" `);
    if (!/rel="/.test(updated)) updated = updated.replace('<a ', '<a rel="nofollow sponsored noopener" ');
    if (!/target="/.test(updated)) updated = updated.replace('<a ', '<a target="_blank" ');
    changed = true;
    return updated;
  });

  if (changed) fs.writeFileSync(fullPath, html);
}
console.log('Affiliate href update complete.');
