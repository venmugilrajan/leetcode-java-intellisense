import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function copyExtensionAssets() {
  return {
    name: 'copy-extension-assets',
    closeBundle() {
      // Copy manifest.json with css path adjusted for content script
      const rawManifest = JSON.parse(fs.readFileSync(resolve(__dirname, 'manifest.json'), 'utf8'));
      // Adjust css paths in content_scripts
      rawManifest.content_scripts.forEach(cs => {
        if (cs.css) {
          cs.css = ['styles.css'];
        }
      });
      fs.writeFileSync(resolve(__dirname, 'dist/manifest.json'), JSON.stringify(rawManifest, null, 2));

      // Copy styles.css
      fs.copyFileSync(resolve(__dirname, 'src/ui/styles.css'), resolve(__dirname, 'dist/styles.css'));

      // Copy icons
      const iconsDir = resolve(__dirname, 'dist/icons');
      if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
      for (const icon of ['icon16.png', 'icon48.png', 'icon128.png']) {
        fs.copyFileSync(resolve(__dirname, 'icons', icon), resolve(iconsDir, icon));
      }
    }
  };
}

export default defineConfig({
  plugins: [copyExtensionAssets()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/content.js'),
        injected: resolve(__dirname, 'src/content/injected.js'),
        background: resolve(__dirname, 'src/background/background.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
