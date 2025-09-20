import { createContext, type JSX } from "solid-js";

import type { AnimatePresenceProps } from "../animate-presence/types";

export interface PresenceContext {
  initial?: boolean;
  custom?: any;
}

export const AnimatePresenceContext = createContext();

export function AnimatePresenceContextProvider(props: AnimatePresenceProps & { children: JSX.Element }) {
  return (
    <AnimatePresenceContext.Provider
      value={{
        custom: props.custom,
        initial: props.initial,
      }}
    >
      {props.children}
    </AnimatePresenceContext.Provider>
  );
}
