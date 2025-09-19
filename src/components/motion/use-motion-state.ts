import { onCleanup, splitProps, useContext } from "solid-js";

import { LayoutGroupContext } from "@/components/context/layout-group-context";
import { useMotionConfig } from "@/components/context/motion-config";
import { MotionContext } from "@/components/context/motion-context";
import type { MotionProps } from "@/components/motion/types";
import type { Feature } from "@/features";
import { domMax } from "@/features/dom-max";
import { MotionState } from "@/state";
import type { Options } from "@/types";

const list: Array<{ state: MotionState; getMotionOptions: () => Options }> = [];
export function animateView(callback: VoidFunction) {
  list.forEach((instance) => instance.state.beforeUpdate());
  callback();
  list.forEach((instance) => {
    instance.state.update(instance.getMotionOptions());
  });
}

export function useMotionState(props: MotionProps) {
  const [_, rest] = splitProps(props, ["children"]);
  // layout group context
  const layoutGroup = useContext(LayoutGroupContext);
  // motion config context
  const config = useMotionConfig();

  const context = useContext(MotionContext);

  /**
   * Get the layout ID for the motion component
   * If both layoutGroup.id and props.layoutId exist, combine them with a hyphen
   * Otherwise return props.layoutId or undefined
   */
  function getLayoutId() {
    if (layoutGroup.id && props.layoutId) {
      return `${layoutGroup.id}-${props.layoutId}`;
    }
    return props.layoutId || undefined;
  }

  function getMotionOptions(): Options & { features?: Array<typeof Feature> } {
    return {
      animate: props.animate,
      as: props.as,
      exit: props.exit,
      features: domMax,
      inherit: props.inherit,
      initial: props.initial === true ? undefined : props.initial,
      layout: props.layout,
      layoutGroup: props.layoutGroup,
      layoutId: getLayoutId(),
      motionConfig: config,
      onAnimationComplete: props.onAnimationComplete,
      onAnimationStart: props.onAnimationStart,
      onUpdate: props.onUpdate,
      style: props.style,
      transformTemplate: props.transformTemplate,
      transition: props.transition,
    };
  }

  const state = new MotionState(getMotionOptions(), context);
  state.beforeMount();

  // animation dispatch
  const dispatch = { getMotionOptions, state };
  list.push(dispatch);
  onCleanup(() => {
    list.splice(list.indexOf(dispatch), 1);
  });

  return {
    getMotionOptions,
    state,
  };
}
