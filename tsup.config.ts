import * as tsup from "tsup";
import * as preset from "tsup-preset-solid";

const preset_options: preset.PresetOptions = {
  cjs: false,
  drop_console: true,
  entries: { entry: "src/index.tsx" },
};

export default tsup.defineConfig((config) => {
  const watching = !!config.watch;

  const parsed_data = preset.parsePresetOptions(preset_options, watching);

  if (!watching) {
    const package_fields = preset.generatePackageExports(parsed_data);

    // eslint-disable-next-line no-console
    console.log(`package.json: \n\n${JSON.stringify(package_fields, null, 2)}\n\n`);

    /*
		will update ./package.json with the correct export fields
		*/
    preset.writePackageJson(package_fields);
  }

  const configs = preset.generateTsupOptions(parsed_data);
  for (const config of configs) {
    config.noExternal = [
      "framer-motion",
      "framer-motion/dist/es/render/store.mjs",
      "framer-motion/dist/es/render/html/HTMLVisualElement.mjs",
      "framer-motion/dist/es/render/svg/SVGVisualElement.mjs",
      "framer-motion/dist/es/projection/node/state.mjs",
      "framer-motion/dist/es/projection/styles/scale-correction.mjs",
      "framer-motion/dist/es/projection/styles/scale-border-radius.mjs",
      "framer-motion/dist/es/projection/styles/scale-box-shadow.mjs",
      "framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs",
      "framer-motion/dist/es/utils/reduced-motion/state.mjs",
    ];
  }
  return configs;
});
