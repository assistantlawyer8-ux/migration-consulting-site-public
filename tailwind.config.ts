import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { brand: { 50: '#f0f5ff', 500: '#2f5fd9', 600: '#2547ab', 700: '#1c3680', 900: '#101f4a' } } } }, plugins: [] };
export default config;