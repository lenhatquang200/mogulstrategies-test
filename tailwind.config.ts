import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: 'rgb(212, 175, 55)',
          50: 'rgba(212, 175, 55, 0.1)',
          100: 'rgba(212, 175, 55, 0.2)',
          200: 'rgba(212, 175, 55, 0.3)',
          300: 'rgba(212, 175, 55, 0.4)',
          400: 'rgba(212, 175, 55, 0.5)',
          500: 'rgba(212, 175, 55, 0.6)',
          600: 'rgb(212, 175, 55)',
          700: 'rgba(212, 175, 55, 0.8)',
          800: 'rgba(212, 175, 55, 0.9)',
          900: 'rgba(212, 175, 55, 1)',
        }
      }
    },
  },
  plugins: [],
};

export default config;
