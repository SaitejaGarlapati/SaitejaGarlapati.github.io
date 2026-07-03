/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      /**
       * Ops-console palette. Dark-only by design — the whole site is a
       * control-plane console. Phase colors (steel/cyan/amber/green) map to
       * lifecycle states and are referenced from src/data/resume.ts.
       */
      colors: {
        console: {
          bg: "#0A0F14", // page background
          raised: "#0E1620", // cards / terminal chrome
          line: "#1B2836", // borders, rules
          text: "#C4D1DC", // body copy
          bright: "#EDF4FA", // headings, emphasized values
          dim: "#6E8090", // secondary text, label prefixes
          green: "#3FE081", // Ready / running / accent
          amber: "#E8B44C", // Validating
          cyan: "#56C8DE", // Bootstrapped / links
          steel: "#8FA6BC", // Provisioned
        },
      },
      fontFamily: {
        mono: [
          "'JetBrains Mono Variable'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        sans: [
          "system-ui",
          "-apple-system",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
