export { addScaleCorrector } from "framer-motion/dist/es/projection/styles/scale-correction.mjs";
export { delay as delayInMs } from "framer-motion/dist/es/utils/delay.mjs";
export { motionValue as useMotionValue } from "framer-motion/dom";

export * from "./components";
export * from "./components/context/animate-presence-context";
export * from "./components/context/layout-group-context";
export * from "./components/context/motion-config";
export * from "./components/context/motion-context";
export { useDragControls } from "./features/gestures/drag/use-drag-controls";
export type { PanInfo } from "./features/gestures/pan/PanSession";
export * from "./types";
export * from "./utils";
export * from "./value/use-motion-value.js";
export * from "./value/use-spring.js";
