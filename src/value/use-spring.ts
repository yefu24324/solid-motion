import type { SpringOptions } from "motion";
import { type MotionValue, springValue } from "motion-dom";
import { type Accessor, createEffect } from "solid-js";
import { createMotionValue } from "./use-motion-value.js";

export function useSpring(source: Accessor<number>, options: SpringOptions): MotionValue<number> {
  const value = springValue(source(), options);

  createEffect(() => {
    value.set(source());
  });

  return value;
}

export function createSpring(source: Accessor<number>, options: SpringOptions): Accessor<number> {
  return createMotionValue(useSpring(source, options));
}
