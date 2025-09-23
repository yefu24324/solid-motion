import { resolveElements, resolveFirst } from "@solid-primitives/refs";
import { createListTransition, createSwitchTransition } from "@solid-primitives/transition-group";
import { type FlowComponent, Show } from "solid-js";

import { AnimatePresenceContextProvider } from "@/components/context/animate-presence-context";
import { mountedStates } from "@/state";
import { delay } from "@/utils/delay";
import { doneCallbacks, removeDoneCallback } from "./presence";
import type { AnimatePresenceProps } from "./types";
import { usePopLayout } from "./use-pop-layout";

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
  const { addPopStyle, removePopStyle, styles } = usePopLayout(props);

  function enter(el: Element) {
    const state = mountedStates.get(el);
    if (!state) {
      return;
    }

    removePopStyle(state);
    /**
     * Delay to ensure animations read the latest state before triggering.
     * This allows the animation system to capture updated values after component updates.
     */
    delay(() => {
      state.setActive("exit", false);
    });
  }
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
    removeDoneCallback(motionEl);
    addPopStyle(state);

    function doneCallback(e?: any) {
      if (e?.detail?.isExit) {
        const projection = state.visualElement.projection;
        // @ts-expect-error - animationProgress exists at runtime
        if (projection?.animationProgress > 0 && !state.isSafeToRemove && !state.isVShow) {
          return;
        }
        removeDoneCallback(motionEl);
        exitDom.delete(motionEl);
        if (exitDom.size === 0) {
          props.onExitComplete?.();
        }
        if (!styles.has(state)) {
          state.willUpdate("done");
        } else {
          removePopStyle(state);
        }
        done();
        if (!motionEl.isConnected) {
          state.unmount(true);
        }
      }
    }

    delay(() => {
      state.setActive("exit", true);
      doneCallbacks.set(motionEl, doneCallback);
      motionEl.addEventListener("motioncomplete", doneCallback);
    });
  }

  function Transition() {
    const transition = createSwitchTransition(
      resolveFirst(() => props.children),
      {
        mode: "out-in",
        onEnter(el, done) {
          enter(el);
          done();
        },
        onExit(el, done) {
          exit(el, done);
        },
      },
    );
    return <>{transition()}</>;
  }

  function TransitionGroup() {
    const resolved = resolveElements(() => props.children);
    const transitionGroup = createListTransition(resolved.toArray, {
      appear: true,
      onChange({ finishRemoved, removed, added }) {
        // ENTER
        for (const el of added) {
          enter(el);
        }
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

    return <>{transitionGroup()}</>;
  }

  return (
    <AnimatePresenceContextProvider custom={props.custom} initial={props.initial}>
      <Show fallback={<TransitionGroup />} when={props.mode === "wait"}>
        <Transition />
      </Show>
    </AnimatePresenceContextProvider>
  );
};

export * from "./types";
