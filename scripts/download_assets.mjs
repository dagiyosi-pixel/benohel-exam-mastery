import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const wallpapers = [
  {
    name: 'pubg_erangel_dusk.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
  },
  {
    name: 'cyber_chakra_neon.jpg',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=85',
  },
  {
    name: 'stormy_mountains_dusk.jpg',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
  },
];

async function downloadAll() {
  for (const item of wallpapers) {
    const dest = path.join(assetsDir, item.name);
    console.log(`Downloading ${item.name} from ${item.url}...`);
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.warn(`Failed ${item.name}: ${res.status}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buffer));
      console.log(`Saved ${item.name} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error downloading ${item.name}:`, err.message);
    }
  }
}

downloadAll();
