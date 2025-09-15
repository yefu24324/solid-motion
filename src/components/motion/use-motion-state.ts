import { createEffect, useContext } from "solid-js";

import { LayoutGroupContext } from "@/components/context/layout-group-context";
import { useMotionConfig } from "@/components/context/motion-config";
import { MotionContext } from "@/components/context/motion-context";
import type { MotionProps } from "@/components/motion/types";
import { domMax } from "@/features/dom-max";
import { MotionState, mountedStates } from "@/state";

const list = [];
export function beforeUpdate(callback: VoidFunction) {
  // mountedStates.forEach((state) => state.beforeUpdate());
  mountedStates;
  list.forEach((state) => state.beforeUpdate());
  callback();
}

export function useMotionState(props: MotionProps) {
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

  function getProps() {
    return {
      ...props,
      features: domMax,
      initial: props.initial === true ? undefined : props.initial,
      layoutId: getLayoutId(),
      motionConfig: config,
      transition: props.transition,
    };
  }

  function getMotionProps() {
    return {
      ...getProps(),
    };
  }

  const state = new MotionState(getMotionProps(), context);
  list.push(state);
  state.beforeMount();

  createEffect(() => {
    console.log("update", getMotionProps());
    state.update(getMotionProps());
  });

  return {
    state,
  };
}
