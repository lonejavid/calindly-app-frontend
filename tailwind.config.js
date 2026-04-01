/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "serif-display": ["Lora", "Georgia", "serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        /* Semantic (from theme via index.css) – use var() so hex theme vars work */
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        /* Theme tokens (theme.css) for direct use */
        blue: {
          DEFAULT: "var(--blue)",
          dark: "var(--blue-dark)",
          deep: "var(--blue-deep)",
          mid: "var(--blue-mid)",
          lite: "var(--blue-lite)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          dark: "var(--amber-dark)",
          deep: "var(--amber-deep)",
          lite: "var(--amber-lite)",
        },
        wa: {
          DEFAULT: "var(--wa)",
          dark: "var(--wa-dark)",
          lite: "var(--wa-lite)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          mid: "var(--ink-mid)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        surface: "var(--surface)",
        white: "var(--white)",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "hero-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
      },
      animation: {
        "hero-float": "hero-float 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
