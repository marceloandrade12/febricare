/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#fff1f4',
          100: '#ffe4ea',
          200: '#ffccd9',
          300: '#ffa0b8',
          400: '#ff6691',
          500: '#ff3370',
          600: '#ed1055',
          700: '#c80845',
          800: '#a80940',
          900: '#8f0b3c',
          950: '#50001d',
        },
        warm: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5dab2',
          300: '#efbe81',
          400: '#e89a4e',
          500: '#e27e2c',
          600: '#d36521',
          700: '#af4d1e',
          800: '#8d3e20',
          900: '#72341d',
          950: '#3d190c',
        },
        slate: {
          850: '#172033',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
