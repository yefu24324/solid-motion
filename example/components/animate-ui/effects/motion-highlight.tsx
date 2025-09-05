import type { JSX } from "solid-js";

export interface MotionHighlightProps {
  class?: string;
  children: JSX.Element;
  hover?: boolean;
}

export function MotionHighlight(props: MotionHighlightProps) {
  return <div class={props.class}>{props.children}</div>;
}

export interface MotionHighlightItemProps {
  class?: string;
  children: JSX.Element;
}

export function MotionHighlightItem(props: MotionHighlightItemProps) {
  return <div class={props.class}>{props.children}</div>;
}
