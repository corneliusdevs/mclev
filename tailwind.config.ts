import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend: {
      backgroundImage: {
        'construction' : "url('/assets/construc.jpg')",
      },
      colors: {
        'greengray': '#E6E6E6',
        'primarycol': '#00AF50',
        'secondarycol': '#FEC000',
        'accentcol': '#411C32',
        'footergray': '#878787'
      },
    },
  },
  plugins: [require('tailwindcss-animate')  ],
}
export default config
