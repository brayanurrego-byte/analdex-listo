/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          void: '#060B18',
          deep: '#0F1B35',
          card: '#0D1A30',
          signal: '#00D4AA',
          neural: '#6C5CE7',
          data: '#0984E3',
          pulse: '#00CEFF',
          analdex: '#1B5CA8',
          gold: '#F4C430',
          red: '#FF5555',
          yellow: '#FECA57',
          text: '#FFFFFF',
          muted: 'rgba(255,255,255,0.6)',
          faint: 'rgba(255,255,255,0.25)',
          border: 'rgba(255,255,255,0.07)',
          border2: 'rgba(255,255,255,0.13)',
        }
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 212, 170, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
