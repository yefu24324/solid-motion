import { resolveFirst } from "@solid-primitives/refs";
import { createSwitchTransition } from "@solid-primitives/transition-group";
import { type AnimationOptions, animate, type DOMKeyframesDefinition } from "motion";
import { batch, createContext, createSignal, type FlowComponent, type Setter } from "solid-js";

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

  const render = (
    <PresenceContext.Provider value={state}>
      {createSwitchTransition(
        resolveFirst(() => props.children),
        {
          mode: props.exitBeforeEnter ? "out-in" : "parallel",
          onEnter(_el, done) {
            batch(() => {
              done();
            });
          },
          onExit(el, done) {
            batch(() => {
              const { exit, transition } = motionOption();
              if (exit) {
                animate(el, exit, transition).finished.then(() => {
                  done();
                });
              } else {
                done();
              }
            });
          },
        },
      )()}
    </PresenceContext.Provider>
  );

  return render;
};
