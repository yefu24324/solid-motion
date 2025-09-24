import type { VisualElement } from "framer-motion";
import { setTarget } from "framer-motion/dist/es/render/utils/setters.mjs";
import { invariant } from "hey-listen";

import type { AnimationControls } from "@/animation/types";
import { type MotionState, mountedStates } from "@/state";
import { resolveVariant } from "@/state/utils";
import type { Options } from "@/types";

function stopAnimation(visualElement: VisualElement) {
  visualElement.values.forEach((value) => value.stop());
}

function setStateTarget(state: MotionState, definition: Options["animate"]) {
  const resolvedVariant = resolveVariant(definition, state.options.variants, state.options.custom);
  Object.entries(resolvedVariant).forEach(([key, value]) => {
    if (key === "transition") return;
    state.target[key] = value;
  });
}

/**
 * @public
 */
export function animationControls(): AnimationControls {
  /**
   * Track whether the host component has mounted.
   */
  let hasMounted = false;

  /**
   * A collection of linked component animation controls.
   */
  const subscribers = new Set<MotionState>();

  const controls: AnimationControls = {
    mount() {
      hasMounted = true;

      return () => {
        hasMounted = false;
        controls.stop();
      };
    },

    set(definition) {
      invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
      return subscribers.forEach((state) => {
        setValues(state, definition);
      });
    },

    start(definition, transitionOverride) {
      invariant(hasMounted, "controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.");

      const animations: Array<Promise<any>> = [];
      subscribers.forEach((state) => {
        animations.push(
          state.animateUpdates({
            directAnimate: definition,
            directTransition: transitionOverride,
          }) as Promise<any>,
        );
      });

      return Promise.all(animations);
    },

    stop() {
      subscribers.forEach((state) => {
        stopAnimation(state.visualElement);
      });
    },
    subscribe(state) {
      subscribers.add(state);
      return () => void subscribers.delete(state);
    },
  };

  return controls;
}

export function setValues(state: MotionState, definition: Options["animate"]) {
  if (typeof definition === "string") {
    return setVariants(state, [definition]);
  } else if (Array.isArray(definition)) {
    return setVariants(state, definition);
  } else {
    setStateTarget(state, definition);
    setTarget(state.visualElement, definition as any);
  }
}

function setVariants(state: MotionState, variantLabels: string[]) {
  const reversedLabels = [...variantLabels].reverse();
  const visualElement = state.visualElement;
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    setStateTarget(state, variant as any);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(mountedStates.get(child.current as HTMLElement), variantLabels);
      });
    }
  });
}
