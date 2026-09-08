import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // 316 PCKLE palette — navy blue & white (same token names as the design
      // system originally shipped with, so every screen's classNames still work
      // unchanged; only the underlying colors moved from green/cream to navy/white).
      colors: {
        cream:      { DEFAULT: '#FFFFFF', dark: '#0A1220' },
        olive:      { DEFAULT: '#2F6FED', light: '#5B8DEF', dark: '#1E4FB8' },
        dg:         { DEFAULT: '#0B2545', light: '#173B6E', dark: '#061733' },
        maroon:     { DEFAULT: '#B3261E', light: '#D33B32', dark: '#801812' },
        surface:    { DEFAULT: '#EEF2F8', dark: '#111A2E' },
        border:     { DEFAULT: '#D7DEE9', dark: '#22304A' },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        sm:  '5px',
        DEFAULT: '8px',
        md:  '8px',
        lg:  '12px',
        xl:  '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)',
        modal:'0 8px 32px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.08)',
      }
    }
  },
  plugins: []
}

export default config
