import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        surface: "#0f172a",
        border: "#1e293b",
        accent: {
          DEFAULT: "#06b6d4", // Cyan
          hover: "#0891b2",
          subtle: "#083344",
        },
      },
    },
  },
  plugins: [],
};
export default config;
