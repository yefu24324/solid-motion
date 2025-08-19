import { isMotionValue, type MotionValue, motionValue } from "motion-dom";
import { type Accessor, createEffect, createSignal } from "solid-js";

export function useMotionValue<T>(source: Accessor<T>): MotionValue<T> {
  const value = motionValue(source());

  createEffect(() => {
    value.set(source());
  });

  return value;
}

export function createMotionValue<T>(source: MotionValue<T> | Accessor<T>): Accessor<T> {
  const motionValue = isMotionValue(source) ? source : useMotionValue(source as Accessor<T>);

  const [value, setValue] = createSignal<T>(motionValue.get());

  motionValue.on("change", (latest) => {
    setValue(() => latest);
  });
  return value;
}
