import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        error: "rgba(203, 0, 25, 1)",
        gray: "#C1C1C1",
        darkcharcoal: "#333333",
      },
    },
  },
  plugins: [],
} satisfies Config;
