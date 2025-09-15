import { createContext, type JSX, splitProps, useContext } from "solid-js";
import type { Store } from "solid-js/store";

import type { MotionConfigState } from "./types";

const MotionConfigContext = createContext<Store<MotionConfigState>>({
  nonce: undefined,
  reducedMotion: "never",
  transition: undefined,
});

export function MotionConfigProvider(props: MotionConfigState & { children: JSX.Element }) {
  const [local, reset] = splitProps(props, ["children"]);

  return <MotionConfigContext.Provider value={reset}>{local.children}</MotionConfigContext.Provider>;
}

export function useMotionConfig() {
  return useContext(MotionConfigContext);
}
