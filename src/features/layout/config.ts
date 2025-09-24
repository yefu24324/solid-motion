import { correctBorderRadius } from "framer-motion/dist/es/projection/styles/scale-border-radius.mjs";
import { correctBoxShadow } from "framer-motion/dist/es/projection/styles/scale-box-shadow.mjs";

export const defaultScaleCorrector = {
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  borderRadius: {
    ...correctBorderRadius,
    applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"],
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow,
};
