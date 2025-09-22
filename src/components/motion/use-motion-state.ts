import type { DOMKeyframesDefinition } from "framer-motion";
import { createEffect, onCleanup, splitProps, useContext } from "solid-js";

import { AnimatePresenceContext } from "@/components/context/animate-presence-context";
import { LayoutGroupContext } from "@/components/context/layout-group-context";
import { useMotionConfig } from "@/components/context/motion-config";
import { MotionContext } from "@/components/context/motion-context";
import type { MotionProps } from "@/components/motion/types";
import { domMax } from "@/features/dom-max";
import { MotionState } from "@/state";
import { convertSvgStyleToAttributes, createStyles } from "@/state/style";
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
  // animate presence context
  const animatePresenceContext = useContext(AnimatePresenceContext);

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

  function getAttrs() {
    const isSVG = state.type === "svg";
    let styleProps: Record<string, any> = {
      ...props.style,
      ...(isSVG ? {} : state.visualElement?.latestValues || state.baseTarget),
    };
    if (isSVG) {
      const { attrs, style } = convertSvgStyleToAttributes({
        ...(state.isMounted() ? state.target : state.baseTarget),
        ...styleProps,
      } as DOMKeyframesDefinition);
      if (style["transform"] || attrs["transformOrigin"]) {
        style["transformOrigin"] = attrs["transformOrigin"] ?? "50% 50%";
        delete attrs["transformOrigin"];
      }
      // If the transformBox is not set, set it to fill-box
      if (style["transform"]) {
        style["transformBox"] = style["transformBox"] ?? "fill-box";
        delete attrs["transformBox"];
      }
      styleProps = style;
    }
    if (props.drag && props.dragListener !== false) {
      Object.assign(styleProps, {
        touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`,
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
      });
    }

    const style = createStyles(styleProps);
    return {
      style,
    };
  }

  function getMotionOptions(): MotionState["options"] {
    return {
      animate: props.animate,
      animatePresenceContext: animatePresenceContext,
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
  createEffect(() => {
    state.update(getMotionOptions());
  });

  return {
    getAttrs,
    getMotionOptions,
    state,
  };
}
