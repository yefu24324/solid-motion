import { mergeRefs } from "@solid-primitives/refs";
import type { ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { MotionContextProvider } from "@/components/context/motion-context";
import type { Options } from "@/types";
import type { MotionProps } from "./types";
import { useMotionState } from "./use-motion-state";

export function Motion<T extends ValidComponent = "div">(props: MotionProps<T>) {
  const mergedProps = mergeProps({ as: "div" }, props as Options<HTMLElement | SVGElement>);
  const [local, rest] = splitProps(mergedProps, ["ref", "as", "style"]);

  const { state, getMotionOptions, getAttrs } = useMotionState(mergedProps as MotionProps);

  return (
    <MotionContextProvider animate={props.animate} initial={props.initial} state={state}>
      <Dynamic
        component={local.as || "div"}
        ref={mergeRefs(local.ref, (element) => {
          state.mount(element, getMotionOptions(), false);
        })}
        style={{
          ...getAttrs().style,
          ...local.style,
        }}
        {...rest}
      />
    </MotionContextProvider>
  );
}

export type { MotionProps } from "./types";
export * from "./use-motion-state";
