import { type AnimationOptions, animate, type DOMKeyframesDefinition } from "motion";
import { type ComponentProps, createContext, createEffect, createSignal, type JSX, splitProps, untrack, useContext, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PresenceContext } from "./presence.jsx";

export const ParentContext = createContext<{}>();

export type MotionProps<T extends ValidComponent> = ComponentProps<T> & {
  component?: T | undefined;
  initial?: DOMKeyframesDefinition;
  animate?: DOMKeyframesDefinition;
  exit?: DOMKeyframesDefinition;
  transition?: AnimationOptions;
  children?: JSX.Element;
};

export function Motion<T extends ValidComponent = "div">(props: MotionProps<T>): JSX.Element {
  const [el, setEl] = createSignal<Element>();
  const presence_state = useContext(PresenceContext);
  const [motionOption, componentProps] = splitProps(props, ["component", "ref", "initial", "animate", "exit", "transition"]);
  const [inited, setInited] = createSignal(false);

  function runAnimation(keyframes: DOMKeyframesDefinition, t?: AnimationOptions, _el?: Element) {
    const el_ref = _el || el();
    if (!el_ref) {
      throw new Error("Motion element is not mounted");
    }
    return animate(el_ref, keyframes, t);
  }

  createEffect(async () => {
    const el_ref = el();
    const animate = props.animate;
    if (el_ref) {
      await untrack(async () => {
        if (el_ref && !inited() && props.initial) {
          setInited(true);
          await runAnimation(props.initial, {
            duration: 0,
          });
        }
      });
      if (el_ref && animate) {
        runAnimation(animate, props.transition);
      }
    }
  });

  createEffect(() => {
    if (presence_state) {
      presence_state.setMotionOption({
        exit: props.exit,
        initial: props.initial,
        transition: props.transition,
      });
    }
  });

  return (
    <Dynamic
      component={motionOption.component || "div"}
      ref={(el: Element) => {
        setEl(el);
        motionOption.ref?.(el);
      }}
      {...componentProps}
    />
  );
}
