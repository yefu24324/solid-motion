import { onMount } from "solid-js";

import type { AnimatePresenceProps } from "@/components/animate-presence/types";
// import { createContext } from "@/utils";

export const doneCallbacks = new WeakMap<Element, (v?: any, safeUnmount?: boolean) => void>();

export function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element);
  if (prevDoneCallback) {
    element.removeEventListener("motioncomplete", prevDoneCallback);
  }
  doneCallbacks.delete(element);
}

export interface PresenceContext {
  initial?: boolean;
  custom?: any;
}

// export const [injectAnimatePresence, provideAnimatePresence] = createContext<PresenceContext>("AnimatePresenceContext");

export function useAnimatePresence(props: AnimatePresenceProps) {
  const presenceContext = {
    custom: props.custom,
    initial: props.initial,
  };
  watch(
    () => props.custom,
    (v) => {
      presenceContext.custom = v;
    },
    {
      flush: "pre",
    },
  );

  // provideAnimatePresence(presenceContext);

  onMount(() => {
    presenceContext.initial = undefined;
  });
}
