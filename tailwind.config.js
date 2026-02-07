/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rich-dark': '#0a0a0f',
        'rich-surface': '#111118',
        'rich-text': '#f1f5f9',
        'rich-text-muted': '#94a3b8',
        'accent-primary': '#7c3aed',
        'accent-primary-muted': '#a78bfa',
        'accent-gold': '#d4af37',
        'accent-gold-muted': '#fbbf24',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft-glow': '0 4px 30px rgba(124, 58, 237, 0.15)',
        'gold-glow': '0 4px 30px rgba(212, 175, 55, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
