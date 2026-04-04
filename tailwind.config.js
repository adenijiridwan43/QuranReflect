// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#134729',
          container: '#2D5F3F',
          fixed: '#b8efc6',
          dim: '#9dd3ab'
        },
        secondary: {
          DEFAULT: '#735c00',
          container: '#fed65b',
          fixed: '#ffe088',
          dim: '#e9c349'
        },
        tertiary: {
          DEFAULT: '#57352a',
          container: '#714c40',
          fixed: '#ffdbd0',
          dim: '#edbbac'
        },
        surface: {
          DEFAULT: '#f8f9fa',
          bright: '#f8f9fa',
          container: '#edeeef',
          high: '#e7e8e9',
          highest: '#e1e3e4',
          low: '#f3f4f5',
          lowest: '#ffffff',
          dim: '#d9dadb',
          tint: '#366848',
          variant: '#e1e3e4'
        },
        "on-surface": "#191c1d",
        "on-primary": "#ffffff",
        outline: {
          DEFAULT: '#717971',
          variant: '#c0c9bf'
        }
      },
      fontFamily: {
        heading: ['Amiri', 'serif'],
        body: ['SF Pro', 'Roboto', 'sans-serif'],
        reading: ['Georgia', 'serif'],
        arabic: ['Traditional Arabic', 'Amiri', 'serif']
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px'
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px'
      }
    },
  },
  plugins: [],
}
