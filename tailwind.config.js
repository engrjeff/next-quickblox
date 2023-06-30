/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F7F7",
        foreground: "#1B2032",
        primary: "#3C54B4",
        accent: "#FC8675",
        accent2: "#EB5757",
        muted: "#667085",
        listactive: "#FFF5E9",

        "status-red": "#FE504F",
        "status-yellow": "#FFBF33",
        "status-green": "#05C34B",
      },
    },
  },
  plugins: [],
};
