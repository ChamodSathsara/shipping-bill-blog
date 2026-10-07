const token = (name) => `hsl(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: "class",
  content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './views/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        border: token("border"),
        input: token("border"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        surface: token("surface"),
        card: { DEFAULT: token("card"), foreground: token("foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        warning: { DEFAULT: token("warning"), foreground: token("warning-foreground") },
        destructive: { DEFAULT: token("destructive"), foreground: token("destructive-foreground") },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 6px)",
        md: "calc(var(--radius) - 4px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      maxWidth: {
        reading: "70ch",
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
