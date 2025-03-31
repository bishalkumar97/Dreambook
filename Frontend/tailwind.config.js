/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        "primary": "#5D60EF",
        "white": "#FFFFFF",
        "grey": "#757D83",
        "black": "#000",
        "light-grey": "#555",
        "light-black": "#2A2B2A",
        "input-bg":"#F3F3F3",
        "orange": "#FF683A",
        "success": "#009989",
        "danger": "#A04A4A"
      },
      borderWidth: {
        "0.5": "0.5px",
        "1.5": "1.5px",
      },
      boxShadow:{
        'searchbox':'0 0 3px #1e293b26'
      },
      backgroundImage:{
        landing:'url("/bg.png")'
      }
    },
  },
  plugins: [],
};
