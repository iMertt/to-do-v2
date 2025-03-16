/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5', // Daha derin indigo
          dark: '#6366F1',
        },
        secondary: {
          light: '#DB2777', // Daha canlı pembe
          dark: '#EC4899',
        },
        accent: {
          light: '#059669', // Daha zengin zümrüt
          dark: '#10B981',
        },
        background: {
          light: 'rgba(248, 250, 252, 0.8)',
          dark: 'rgba(15, 23, 42, 0.95)',
        },
        card: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(30, 41, 59, 0.85)',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.3)',
          dark: 'rgba(15, 23, 42, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neo': '0 10px 40px -10px rgba(79, 70, 229, 0.3), 0 4px 16px -4px rgba(79, 70, 229, 0.2)',
        'neo-dark': '0 10px 40px -10px rgba(99, 102, 241, 0.25), 0 4px 16px -4px rgba(99, 102, 241, 0.15)',
        'task': '0 4px 20px -4px rgba(79, 70, 229, 0.15), 0 2px 10px -2px rgba(79, 70, 229, 0.1)',
        'task-dark': '0 4px 20px -4px rgba(99, 102, 241, 0.2), 0 2px 10px -2px rgba(99, 102, 241, 0.15)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.15), 0 0 40px rgba(79, 70, 229, 0.1)',
        'glow-dark': '0 0 20px rgba(99, 102, 241, 0.2), 0 0 40px rgba(99, 102, 241, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.1), 0 0 40px rgba(79, 70, 229, 0.05)' },
          '100%': { boxShadow: '0 0 25px rgba(79, 70, 229, 0.2), 0 0 50px rgba(79, 70, 229, 0.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%)',
      },
      backgroundSize: {
        '300%': '300%',
        'shine': '200% 200%',
      },
    },
  },
  plugins: [],
}