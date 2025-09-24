import { resolveElements } from "@solid-primitives/refs";
import type { Transition, VariantLabels } from "motion";
import { createEffect, createSignal, For, type JSX, onCleanup, Show } from "solid-js";
import { AnimatePresence, type AnimationControls, Motion, type Variants, type VariantType } from "solid-motion";

import { cn } from "../../lib/utils.js";

export function TextLoopDemo() {
  return (
    <div>
      <p>
        <TextLoop class="font-mono text-sm">
          <span>How can I assist you today?</span>
          <span>Generate a logo</span>
          <span>Create a component</span>
          <span>Draw a diagram</span>
        </TextLoop>
      </p>

      <p class="inline-flex whitespace-pre-wrap text-sm">
        Beautiful templates for{" "}
        <TextLoop
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            rotateX: 0,
            y: 0,
          }}
          class="overflow-y-clip"
          exit={{
            filter: "blur(4px)",
            opacity: 0,
            position: "absolute",
            rotateX: -90,
            top: 0,
            y: -20,
          }}
          initial={{
            filter: "blur(4px)",
            opacity: 0,
            rotateX: 90,
            y: 20,
          }}
          transition={{
            damping: 80,
            mass: 10,
            stiffness: 900,
            type: "spring",
          }}
        >
          <span>Founders</span>
          <span>Developers</span>
          <span>Designers</span>
          <span>Design Engineers</span>
        </TextLoop>
      </p>
    </div>
  );
}

export type TextLoopProps = {
  children: JSX.Element;
  class?: string;
  interval?: number;
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  exit?: VariantLabels | VariantType;
  transition?: Transition;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
};

export function TextLoop(props: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const items = resolveElements(() => props.children);

  function intervalMs() {
    return props.interval ? props.interval * 1000 : 2000;
  }
  let timer: number | undefined;

  createEffect(() => {
    if (timer) clearInterval(timer);

    timer = window.setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.toArray().length;
        props.onIndexChange?.(next);
        return next;
      });
    }, intervalMs());
  });

  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  const motionVariants: Variants = {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    initial: { opacity: 0, y: 20 },
  };

  return (
    <div class={cn("relative inline-block whitespace-nowrap", props.class)}>
      <AnimatePresence anchorX="left" mode="popLayout">
        <For each={items.toArray()}>
          {(child, index) => (
            <Show when={currentIndex() === index()}>
              <Motion animate="animate" exit="exit" initial="initial" transition={props.transition || { duration: 0.3 }} variants={motionVariants}>
                {child}
              </Motion>
            </Show>
          )}
        </For>
      </AnimatePresence>
    </div>
  );
}
