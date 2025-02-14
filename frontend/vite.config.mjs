import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import removeConsole from 'vite-plugin-remove-console';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    removeConsole(),  // Removes console.log in production
    compression({ algorithm: 'brotliCompress' }) // Enables Brotli compression
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Allows @ imports (e.g., @/components)
    },
  },
  build: {
    cssCodeSplit: true, // Enables CSS Code Splitting
    minify: 'terser', // Minifies JavaScript
    sourcemap: false, // Disables sourcemaps for smaller builds
    terserOptions: {
      compress: {
        drop_console: true, // Removes console logs in production
      },
    },
  },
  server: {
    port: 3000, // Change this if needed
    open: true, // Auto-opens browser when running `yarn dev`
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
});