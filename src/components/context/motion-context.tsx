import type { VariantLabels } from "framer-motion/dom";
import { createContext, type JSX, mergeProps, splitProps, useContext } from "solid-js";

import type { AnimationControls } from "@/animation/types";
import type { MotionState } from "@/state";
import type { VariantType } from "@/types/state";

export interface IMotionContext {
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  state?: MotionState;
}

export const MotionContext = createContext<IMotionContext>({});

export interface MotionContextProviderProps {
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  state?: MotionState;
  children: JSX.Element;
}

export function MotionContextProvider(props: MotionContextProviderProps) {
  const parent = useContext(MotionContext);
  const [_, rest] = splitProps(props, ["children"]);
  const merge = mergeProps(parent, rest);

  return <MotionContext.Provider value={merge}>{props.children}</MotionContext.Provider>;
}
