import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: "module",
      },
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        name: "Expense Tracker",
        short_name: "Expense Tracker",
        theme_color: "#0061FF",
        //TODO: Add icons
        icons: [
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"), // Add alias for shared folder
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000",
      "/uploads": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
      },
    },
  },
});
