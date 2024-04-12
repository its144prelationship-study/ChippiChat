/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'cpc-blue': '#2260FF',
        'cpc-green': '#41EAAD',
        'cpc-red': '#FF1F00',
        'cpc-gray': '#D9D9D9',
        'cpc-light-gray': '#F7F7F7',
      },
      fontFamily: {
        'dm-mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.inner-shadow-2': {
          boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.25)',
        },
        '.inner-shadow-4': {
          boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.25)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

