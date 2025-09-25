import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env variables regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // This will ensure the base is correctly set for both dev and prod
    base: command === 'serve' ? '/' : '/frontend/',
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: true,
    },
    // Resolve alias for @ to point to src directory
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // Pass environment variables to the app
    define: {
      'process.env': { ...env }
    }
  };
});