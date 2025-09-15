import path from "node:path";
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
  resolve: {
    alias: {
      "framer-motion/dist/es/animation/interfaces/motion-value.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs",
      ),
      "framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs",
      ),
      "framer-motion/dist/es/projection/node/state.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/projection/node/state.mjs"),
      "framer-motion/dist/es/projection/styles/scale-border-radius.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs",
      ),
      "framer-motion/dist/es/projection/styles/scale-box-shadow.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs",
      ),
      "framer-motion/dist/es/projection/styles/scale-correction.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs",
      ),
      "framer-motion/dist/es/render/html/HTMLVisualElement.mjs": path.resolve(
        __dirname,
        "node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs",
      ),
      "framer-motion/dist/es/render/store.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/render/store.mjs"),
      "framer-motion/dist/es/render/svg/SVGVisualElement.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs"),
      "framer-motion/dist/es/render/utils/setters.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/render/utils/setters.mjs"),
      "framer-motion/dist/es/utils/delay.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/utils/delay.mjs"),
      "framer-motion/dist/es/utils/reduced-motion/state.mjs": path.resolve(__dirname, "node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs"),
    },
  },
}));
