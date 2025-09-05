import { resolveElements } from "@solid-primitives/refs";
import { createListTransition } from "@solid-primitives/transition-group";
import { type AnimationOptions, animate, type DOMKeyframesDefinition } from "motion";
import { createContext, createSignal, type FlowComponent, type Setter } from "solid-js";

type MotionOption = {
  initial?: DOMKeyframesDefinition;
  exit?: DOMKeyframesDefinition;
  transition?: AnimationOptions;
};

export type PresenceContextState = {
  setMotionOption: Setter<MotionOption>;
};
export const PresenceContext = createContext<PresenceContextState>();

/**
 * Perform exit/enter trantisions of children `<Motion>` components.
 *
 * accepts props:
 * - `initial` – *(Defaults to `true`)* – If `false`, will disable the first animation on all child `Motion` elements the first time `Presence` is rendered.
 * - `exitBeforeEnter` – *(Defaults to `false`)* – If `true`, `Presence` will wait for the exiting element to finish animating out before animating in the next one.
 *
 * @example
 * ```tsx
 * <Presence exitBeforeEnter>
 *   <Show when={toggle()}>
 *     <Motion
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       exit={{ opacity: 0 }}
 *     />
 *   </Show>
 * </Presence>
 * ```
 */
export const Presence: FlowComponent<{
  initial?: boolean;
  exitBeforeEnter?: boolean;
}> = (props) => {
  const [motionOption, setMotionOption] = createSignal<MotionOption>({});
  const state = { setMotionOption };

  function render() {
    const resolved = resolveElements(() => props.children);
    const transitions = createListTransition(resolved.toArray, {
      appear: true,
      onChange({ finishRemoved, removed }) {
        const { exit, transition } = motionOption();
        for (const el of removed) {
          if (!el.isConnected) {
            finishRemoved([el]);
            continue;
          }
          if (exit) {
            animate(el, exit, transition).finished.then(() => {
              finishRemoved([el]);
            });
          } else {
            finishRemoved([el]);
          }
        }
      },
    });

    return <>{transitions()}</>;
  }

  return <PresenceContext.Provider value={state}>{render()}</PresenceContext.Provider>;
};
