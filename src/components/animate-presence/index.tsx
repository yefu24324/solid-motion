import { resolveElements } from "@solid-primitives/refs";
import { createListTransition } from "@solid-primitives/transition-group";
import type { FlowComponent } from "solid-js";

import { AnimatePresenceContextProvider } from "@/components/context/animate-presence-context";
import { mountedStates } from "@/state";
import { delay } from "@/utils/delay";
import type { AnimatePresenceProps } from "./types";

function findMotionElement(el: Element): Element | null {
  let current: Element | null = el;

  while (current) {
    if (mountedStates.get(current)) {
      return current;
    }
    current = current.firstElementChild;
  }
  return null;
}

export const AnimatePresence: FlowComponent<AnimatePresenceProps> = (props) => {
  const exitDom = new Map<Element, boolean>();

  function exit(el: Element, done: VoidFunction) {
    // Find Motion element
    const motionEl = findMotionElement(el);
    if (!motionEl) {
      done();
      return;
    }
    const state = mountedStates.get(motionEl);
    // Handle cases where Motion element or state is not found
    if (!motionEl || !state) {
      done();
      if (exitDom.size === 0) {
        props.onExitComplete?.();
      }
      return;
    }

    exitDom.set(motionEl, true);
    // removeDoneCallback(motionEl)
    // addPopStyle(state)

    function doneCallback(e?: any) {
      console.log("doneCallback", e);
      // if (e?.detail?.isExit) {
      //   const projection = state.visualElement.projection
      //   // @ts-expect-error - animationProgress exists at runtime
      //   if ((projection?.animationProgress > 0 && !state.isSafeToRemove && !state.isVShow)) {
      //     return
      //   }
      //   removeDoneCallback(motionEl)
      //   exitDom.delete(motionEl)
      //   if (exitDom.size === 0) {
      //     props.onExitComplete?.()
      //   }
      //   if (!styles.has(state)) {
      //     state.willUpdate('done')
      //   }
      //   else {
      //     removePopStyle(state)
      //   }
      done();
      //   if (!motionEl.isConnected) {
      //     state.unmount(true)
      //   }
      // }
    }

    delay(() => {
      state.setActive("exit", true);
      //   doneCallbacks.set(motionEl, doneCallback)
      motionEl.addEventListener("motioncomplete", doneCallback);
    });
  }

  const resolved = resolveElements(() => props.children);
  const transitions = createListTransition(resolved.toArray, {
    appear: true,
    onChange({ finishRemoved, removed }) {
      for (const el of removed) {
        if (!el.isConnected) {
          finishRemoved([el]);
          continue;
        }
        exit(el, () => {
          finishRemoved([el]);
        });
      }
    },
  });
  return (
    <AnimatePresenceContextProvider custom={props.custom} initial={props.initial}>
      {transitions()}
    </AnimatePresenceContextProvider>
  );
};

export * from "./presence";
export * from "./types";
