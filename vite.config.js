import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/frontend/', // Match the exact repository name with capital H
  plugins: [react()],
});