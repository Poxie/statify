import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        main: '1200px',
      },
      maxWidth: {
        main: '90%'
      },
      backgroundColor: {
        'c-primary': '#6E3FC9',
        'c-primary-accent': '#623DAA',
        't-secondary': '#6B809D',
        primary: '#0D1117',
        secondary: '#11151B',
        tertiary: '#1C1F22',
      },
      borderColor: {
        primary: '#0D1117',
        secondary: '#11151B',
        tertiary: '#1C1F22',
        'text-secondary': '#6B809D',
      },
      textColor: {
        primary: '#fff',
        secondary: '#6B809D',
        'c-primary': '#6E3FC9'
      },
      animation: {
        'shake-large': 'shake-large .5s ease-in-out',
        'shake-small': 'shake-small .1s ease-in-out infinite alternate',
        'shake-tiny': 'shake-tiny .1s ease-in-out infinite alternate',
      },
      keyframes: {
        'shake-large': {
          '0%,50%,100%': { transform: 'rotate(7deg)' },
          '25%,75%': { transform: 'rotate(-7deg)' },
        },
        'shake-small': {
          '0%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(-2deg)' },
        },
        'shake-tiny': {
          '0%': { transform: 'rotate(.2deg)' },
          '100%': { transform: 'rotate(-.2deg)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
