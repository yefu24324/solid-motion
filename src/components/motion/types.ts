import type { Component, JSX } from "solid-js";

import type { AsTag, Options } from "@/types";

export interface MotionProps<T extends AsTag = "div", K = unknown> extends Omit<Options<K>, "motionConfig" | "layoutGroup"> {
  as?: T;
  forwardMotionProps?: boolean;
  ignoreStrict?: boolean;

  class?: string;
  children: JSX.Element;
}

export type MotionComponent = Component<MotionProps>;
