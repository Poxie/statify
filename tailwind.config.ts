import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        main: '1200px',
      },
      maxWidth: {
        main: '95%'
      },
      backgroundColor: {
        'c-primary': '#6E3FC9',
        'c-primary-accent': '#623DAA',
        primary: '#0D1117',
        secondary: '#11151B',
        tertiary: '#1C1F22',
      },
      borderColor: {
        primary: '#0D1117',
        secondary: '#11151B',
        tertiary: '#1C1F22',
      },
      textColor: {
        primary: '#fff',
        secondary: '#6B809D',
      },
    },
  },
  plugins: [],
}
export default config
