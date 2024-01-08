import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend: {
      backgroundImage: {
        'construction' : "url('/assets/construc.jpg')",
      },
      colors: {
        'greengray': '#E6E6E6',
      },
    },
  },
  plugins: [],
}
export default config
