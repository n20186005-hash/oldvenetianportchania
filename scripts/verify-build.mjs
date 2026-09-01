import fs from 'node:fs';

const checks = [
  { file: '.next/server/app/zh.html', keys: ['FAQPage', 'id="faq"', 'id="sources"', 'Firkas 堡垒', '四通八达的航海贸易网络', '哈尼亚威尼斯旧港（哈尼亚）', '图片版权'] },
  { file: '.next/server/app/el.html', keys: ['FAQPage', 'id="faq"', 'id="sources"', 'Φρούριο Φιρκά', 'Θαλάσσιο Εμπορικό Δίκτυο', 'Παλαιό Ενετικό Λιμάνι Χανίων (Χανιά)', 'Πνευματικά Δικαιώματα Εικόνων'] },
  { file: '.next/server/app/de.html', keys: ['FAQPage', 'id="faq"', 'id="sources"', 'Festung Firkas', 'maritimes Handelsnetz', 'Alter Venezianischer Hafen Chania (Chania)', 'Bildrechte'] },
  { file: '.next/server/app/fr.html', keys: ['FAQPage', 'id="faq"', 'id="sources"', 'forteresse de Firkas', 'réseau de commerce maritime', 'Vieux Port Vénitien de La Canée (La Canée)', 'Crédits des images'] },
  { file: '.next/server/app/en.html', keys: ['FAQPage', 'id="faq"', 'id="sources"', 'Fortress of Firkas', 'Maritime Trading Network', 'Old Venetian Port of Chania (Chania)', 'Image Credits'] },
];

for (const { file, keys } of checks) {
  const h = fs.readFileSync(file, 'utf8');
  const missing = keys.filter((k) => !h.includes(k));
  console.log(file, missing.length === 0 ? 'ALL FOUND' : `MISSING: ${missing.join(', ')}`);
}
