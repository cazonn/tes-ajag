import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030303',
          900: '#0A0A0C',
          800: '#141417',
          700: '#1F1F24',
          600: '#2A2A32',
        },
        brand: {
          glow: '#7C3AED', // Violet accent premium
          neon: '#10B981', // Emerald untuk sukses/konversi
        }
      },
      boxShadow: {
        'premium-glow': '0 0 25px -5px rgba(124, 58, 237, 0.2)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
};
export default config;