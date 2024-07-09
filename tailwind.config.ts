import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      smallCustom: "0.844rem",
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      backgroundImage: {
        'construction' : "url('/assets/construc.jpg')",
        // 'home-hero': "url('/assets/home/cleaning13.jpeg')",
        'home-hero': "url('/assets/img/new1.jpg')",
        'home-domestic-cleaning1': "url('/assets/img/new3.jpg')",
        'home-domestic-cleaning2': "url('/assets/home/cleaning12.jpeg')",
        'home-feedbacks': "url('/assets/img/new9.jpg')",
        'admin-signup-bg': "url('/assets/banner/banner14.jpeg')",
      },
      screens: {
        "xsm":"300px",
        "smd": "400px",
        "lgmd": "450px",
        "xlmd": "600px",
      },
      colors: {
        border: "hsl(var(--border))",
        primarycol: "rgb(8 46 27)",
        // primarycol: "#00AF50",
        secondarycol:"#FEC000",
        greengray: "#E6E6E6",
        lightsecondarycol: "rgb(255 235 171)",
        textwhitecol:"rgb(255 255 255 / 0.75)",
        accentcol:"#572541",
        // greenaccentcol: "#033D24",
        greenaccentcol: "rgb(8 46 27)",
        footergray: "#878787",
        homegray: "#F7F7F7",
        homemidshadegray: "#E8E9ED",
        homeheroGradient: "#FBFBFB",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
       
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config