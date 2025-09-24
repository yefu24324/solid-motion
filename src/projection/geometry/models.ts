import type { Axis, Box } from "framer-motion";

export const createAxis = (): Axis => ({ max: 0, min: 0 });

export function createBox(): Box {
  return {
    x: createAxis(),
    y: createAxis(),
  };
}
