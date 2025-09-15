import { createEffect, createSignal, onMount, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { MotionContextProvider } from "@/components/context/motion-context";
import type { MotionProps } from "./types";
import { useMotionState } from "./use-motion-state";

export function Motion(props: MotionProps) {
  const [local, rest] = splitProps(props, ["as"]);

  const { state } = useMotionState(props);
  const [el, setEl] = createSignal<HTMLDivElement | null>(null);
  onMount(() => {
    const element = el();
    if (!element) {
      throw new Error("Motion element is not mounted");
    }
    state.mount(element, props, false);
  });
  createEffect(() => {
    props.ref?.(el());
  });

  return (
    <MotionContextProvider animate={props.animate} initial={props.initial}>
      <Dynamic
        component={local.as || "div"}
        {...rest}
        // onClick={() => {
        //   state.beforeUpdate();
        //   local.onClick?.();
        //   // state.update(props);
        // }}
        ref={setEl}
      />
    </MotionContextProvider>
  );
}

export type { MotionProps } from "./types";
