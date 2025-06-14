import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    host: true, // or '0.0.0.0'
    allowedHosts: ["dbee-220-152-113-171.ngrok-free.app"],

    // or to allow all:
    // allowedHosts: false
  },
});
