import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        fs: {
            allow: ['src', 'node_modules/primeicons'],
        },
        proxy: {
            'api': 'http://localhost:5000/',
        }
    },
    build: {
        rollupOptions: {
            output: {
                sourcemap: true,
            }
        }
    }
});
