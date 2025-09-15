import type { VariantLabels } from "framer-motion/dom";
import { createContext, type JSX, useContext } from "solid-js";

import type { AnimationControls } from "@/animation/types";
import type { VariantType } from "@/types/state";

export interface IMotionContext {
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
}

export const MotionContext = createContext<IMotionContext>({});

export interface MotionContextProviderProps {
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  children: JSX.Element;
}

export function MotionContextProvider(props: MotionContextProviderProps) {
  const parent = useContext(MotionContext);

  return (
    <MotionContext.Provider
      value={{
        ...parent,
        ...props,
      }}
    >
      {props.children}
    </MotionContext.Provider>
  );
}
