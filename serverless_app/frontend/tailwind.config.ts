import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // KidBookBuilder brand colors
        'enchanted-purple': '#7B2CBF',
        'storybook-blue': '#4361EE',
        'dream-gold': '#FFD700',
        'creative-coral': '#FF6B6B',
        'imagination-green': '#4CAF50',
        'magic-white': '#FFFFFF',
        'soft-cloud': '#F8F9FA',
        'night-sky': '#2D3748',
        'sparkle-pink': '#FF69B4',
        'magic-mint': '#98FF98',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
