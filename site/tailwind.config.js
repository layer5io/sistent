/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        'border-strong': 'var(--border-strong)',
        'border-default': 'var(--border-default)',
        'background-default': 'var(--background-default)',
        'text-brand': 'var(--text-brand)',
        'background-brand-default': 'var(--background-brand-default)',
        'text-default': 'var(--text-default)',
        'search-default': 'var(--search-default)',
        'text-secondary': 'var(--text-secondary)',
        'border-brand': 'var(--border-brand)',
        'background-brand-tertiary': 'var(--background-brand-tertiary)'
      }
    },
    fontFamily: {
      openSans: ['Open Sans', 'sans-serif'],
      qanelas: ['Qanelas Soft Bold', 'sans-serif'],
      'qanelas-medium': ['Qanelas Soft Medium', 'sans-serif']
    }
  },
  plugins: []
};
