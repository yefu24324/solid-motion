import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async () => ({
  build: {
    lib: {
      entry: "example/index.html",
    },
  },
  clearScreen: false,

  plugins: [solid(), tailwindcss(), tsconfigPaths()],
}));
