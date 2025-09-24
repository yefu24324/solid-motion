import type { VariantLabels } from "framer-motion/dom";
import { createContext, type JSX, splitProps } from "solid-js";

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
  const [_, rest] = splitProps(props, ["children"]);

  return <MotionContext.Provider value={rest}>{props.children}</MotionContext.Provider>;
}
