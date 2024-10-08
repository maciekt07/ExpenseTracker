import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#0061FF",
          "primary-content": "#ffffff",
          secondary: "#498EFF",
          "secondary-content": "#ffffff",
          accent: "#00cdb7",
          "accent-content": "#ffffff",
          neutral: "#2a323c",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f0f0f0",
          "base-300": "#e0e0e0",
          "base-content": "#1d232a",
          info: "#1e90ff",
          "info-content": "#ffffff",
          success: "#28a745",
          "success-content": "#ffffff",
          warning: "#ffc107",
          "warning-content": "#ffffff",
          error: "#dc3545",
          "error-content": "#ffffff",
        },
      },
      {
        darkTheme: {
          primary: "#0061FF",
          "primary-content": "#ffffff",
          secondary: "#498EFF",
          "secondary-content": "#ffffff",
          accent: "#00cdb7",
          "accent-content": "#ffffff",
          neutral: "#2a323c",
          "neutral-content": "#ffffff",
          "base-100": "#1d232a",
          "base-200": "#2a323c",
          "base-300": "#3a3f45",
          "base-content": "#e0e0e0",
          info: "#1e90ff",
          "info-content": "#ffffff",
          success: "#28a745",
          "success-content": "#ffffff",
          warning: "#ffc107",
          "warning-content": "#ffffff",
          error: "#dc3545",
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "darkTheme",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    themeRoot: ":root",
  },
} satisfies Config;
