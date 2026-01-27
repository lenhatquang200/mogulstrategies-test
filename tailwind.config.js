/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mogul-gold': '#D4AF37',
        'mogul-dark': '#0a192f',
        'mogul-darker': '#112240',
        'mogul-blue': '#172a45',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #0a192f 100%)',
        'stars': "url('https://images.unsplash.com/photo-1606125784258-570fc63c22c1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcCUyMHNwYWNlfGVufDB8fDB8fHww')",
      },
      animation: {
        'shooting-star': 'shooting-star linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'shooting-star': {
          '0%': { transform: 'translateX(0) translateY(0) rotate(45deg)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateX(200vw) translateY(200vh) rotate(45deg)', opacity: '0' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.6)' },
          '100%': { boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' },
        },
      },
    },
  },
  plugins: [],
}
