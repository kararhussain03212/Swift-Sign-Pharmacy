/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A9E6E',
          dark:    '#157A56',
          light:   '#E8F5F0',
        },
        // Design token colors
        surface: {
          base:   '#000000',
          muted:  '#ffffff',
          raised: '#f4f3f3',
        },
        token: {
          tertiary:       '#431b01',
          inverse:        '#848484',
          'border-muted': '#1c716b',
          'border-def':   '#e5e5e5',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'token-sm':  ['12px', { lineHeight: '18px' }],
        'token-md':  ['13px', { lineHeight: '20px' }],
        'token-lg':  ['14px', { lineHeight: '22px' }],
        'token-xl':  ['15px', { lineHeight: '24px' }],
        'token-2xl': ['16px', { lineHeight: '24px' }],
        'token-3xl': ['18px', { lineHeight: '28px' }],
        'token-4xl': ['20px', { lineHeight: '30px' }],
      },
      spacing: {
        'tok-1': '5px',
        'tok-2': '6px',
        'tok-3': '7px',
        'tok-4': '9px',
        'tok-5': '12px',
        'tok-6': '16px',
        'tok-7': '18px',
        'tok-8': '20px',
      },
      borderRadius: {
        'tok-xs': '10px',
        'tok-sm': '40px',
        'tok-md': '50px',
        'xl':     '12px',
        '2xl':    '16px',
        '3xl':    '20px',
      },
      transitionDuration: {
        'instant': '150ms',
        'fast':    '300ms',
      },
      boxShadow: {
        'card':       '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 28px rgba(0,0,0,0.12)',
        'glow':       '0 4px 20px rgba(26,158,110,0.35)',
        'nav':        '0 2px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
