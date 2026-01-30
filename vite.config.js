import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve  } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { 
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true
      },
      '/api': {
        target: 'http://localhost:4000',
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: resolve(__dirname, './src/assets'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components')
      },
      {
        find: '@contexts',
        replacement: resolve(__dirname, './src/contexts')
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, './src/styles')
      },
      {
        find: '@game_data',
        replacement: resolve(__dirname, 'src/game_data')
      },
      {
        find: '@gameObjects',
        replacement: resolve(__dirname, './src/gameObjects')
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils')    
      }
    ]
  }
})
