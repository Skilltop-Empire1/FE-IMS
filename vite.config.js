import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/FE-IMS/",   // GitHub Pages base URL

  build: {
    rollupOptions: {
      output: {
        // Splitting node_modules packages into separate chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Creates a separate chunk for each node_module dependency
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    // Optionally, increase the chunk size limit if needed (default is 500kB)
    chunkSizeWarningLimit: 1000,  // Increase this limit if your chunks are larger
  },
});
