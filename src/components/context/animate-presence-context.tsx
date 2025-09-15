import { createContext, type JSX, onMount } from "solid-js";

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

export function useAnimatePresence(props: AnimatePresenceProps) {
  const presenceContext = {
    custom: props.custom,
    initial: props.initial,
  };

  onMount(() => {
    presenceContext.initial = undefined;
  });
}
