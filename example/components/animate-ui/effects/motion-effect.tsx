import type { HTMLMotionProps, Transition, UseInViewOptions, Variant } from "motion/react";
import { createSignal, type JSX } from "solid-js";
import { Motion, Presence } from "solid-motion";

type MotionEffectProps = HTMLMotionProps<"div"> & {
  children: JSX.Element;
  className?: string;
  transition?: Transition;
  delay?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  blur?: string | boolean;
  slide?:
    | {
        direction?: "up" | "down" | "left" | "right";
        offset?: number;
      }
    | boolean;
  fade?: { initialOpacity?: number; opacity?: number } | boolean;
  zoom?:
    | {
        initialScale?: number;
        scale?: number;
      }
    | boolean;
};

function MotionEffect({
  ref,
  children,
  className,
  transition = { damping: 20, stiffness: 200, type: "spring" },
  delay = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  blur = false,
  slide = false,
  fade = false,
  zoom = false,
  ...props
}: MotionEffectProps) {
  const [_localRef, setLocalRef] = createSignal<HTMLDivElement>();

  // const inViewResult = useInView(localRef, {
  //   once: inViewOnce,
  //   margin: inViewMargin,
  // });
  // const isInView = !inView || inViewResult;
  const isInView = !inView;

  const hiddenVariant: Variant = {};
  const visibleVariant: Variant = {};

  if (slide) {
    const offset = typeof slide === "boolean" ? 100 : (slide.offset ?? 100);
    const direction = typeof slide === "boolean" ? "left" : (slide.direction ?? "left");
    const axis = direction === "up" || direction === "down" ? "y" : "x";
    hiddenVariant[axis] = direction === "left" || direction === "up" ? -offset : offset;
    visibleVariant[axis] = 0;
  }

  if (fade) {
    hiddenVariant.opacity = typeof fade === "boolean" ? 0 : (fade.initialOpacity ?? 0);
    visibleVariant.opacity = typeof fade === "boolean" ? 1 : (fade.opacity ?? 1);
  }

  if (zoom) {
    hiddenVariant.scale = typeof zoom === "boolean" ? 0.5 : (zoom.initialScale ?? 0.5);
    visibleVariant.scale = typeof zoom === "boolean" ? 1 : (zoom.scale ?? 1);
  }

  if (blur) {
    hiddenVariant.filter = typeof blur === "boolean" ? "blur(10px)" : `blur(${blur})`;
    visibleVariant.filter = "blur(0px)";
  }

  return (
    <Presence>
      <Motion
        animate={isInView ? "visible" : "hidden"}
        class={className}
        data-slot="motion-effect"
        exit="hidden"
        initial="hidden"
        ref={setLocalRef}
        transition={{
          ...transition,
          delay: (transition?.delay ?? 0) + delay,
        }}
        variants={{
          hidden: hiddenVariant,
          visible: visibleVariant,
        }}
        {...props}
      >
        {children}
      </Motion>
    </Presence>
  );
}

export { MotionEffect, type MotionEffectProps };
