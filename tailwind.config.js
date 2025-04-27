/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'twisted-black': '#121212',
        'twisted-darker': '#0a0a0a',
        'twisted-white': '#f5f5f5',
        'twisted-neon': '#00ff66',
        'twisted-violet': '#9933ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cyber: ['Impact', 'Arial Black', 'sans-serif'],
        mono: ['Space Mono', 'Monaco', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};