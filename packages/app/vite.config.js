import { watch } from "fs";
import { resolve } from "path";
// import { defineConfig } from "vite";

export default {
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      input: {
        spa: resolve(__dirname, "index.html"),
      },
    },
  },
};
