/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Poppins", "ui-sans-serif", "system-ui"] },
      colors: {
        ink: "#050507",
        glow1: "#8b5cf6",
        glow2: "#22d3ee",
        glow3: "#f472b6",
      },
      boxShadow: {
        glow: "0 0 30px rgba(139,92,246,0.35)",
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
