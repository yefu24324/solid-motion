import type { TargetAndTransition, Transition } from "motion-dom";
import { For, type JSX, mergeProps, Show, useContext, type ValidComponent } from "solid-js";
import { AnimatePresence, Motion, MotionContext, type Variants, type VariantType } from "solid-motion";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";

export type PerType = "word" | "char" | "line";

export interface TextEffectProps {
  children: string;
  per?: PerType;
  as?: ValidComponent;
  variants?: {
    container?: VariantType;
    item?: VariantType;
  };
  class?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClass?: string;
  // containerTransition?: Transition;
  // segmentTransition?: Transition;
  style?: JSX.CSSProperties;
}

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  line: 0.1,
  word: 0.05,
};

const defaultContainerVariants: Variants = {
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  exit: { opacity: 0 },
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      exit: { filter: "blur(12px)", opacity: 0 },
      hidden: { filter: "blur(12px)", opacity: 0 },
      visible: { filter: "blur(0px)", opacity: 1 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0 },
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      exit: { filter: "blur(12px)", opacity: 0, y: 20 },
      hidden: { filter: "blur(12px)", opacity: 0, y: 20 },
      visible: { filter: "blur(0px)", opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, scale: 0 },
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      exit: { opacity: 0, y: 20 },
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
};

export function AnimationComponent(props: { segment: string; variants: Variants; per: "line" | "word" | "char"; segmentWrapperClassName?: string }) {
  const context = useContext(MotionContext);
  console.log("animation component", context);
  return (
    <Motion as="span">
      <For each={props.segment.split("")}>
        {(char) => (
          <Motion as="span" class="inline-block whitespace-pre" variants={props.variants}>
            {char}
          </Motion>
        )}
      </For>
    </Motion>
  );
}

const splitText = (text: string, per: PerType) => {
  if (per === "line") return text.split("\n");
  return text.split(/(\s+)/);
};

const hasTransition = (variant?: VariantType): variant is TargetAndTransition & { transition?: Transition } => {
  if (!variant) return false;
  return typeof variant === "object" && "transition" in variant;
};

const createVariantsWithTransition = (baseVariants: Variants, transition?: Transition & { exit?: Transition }): Variants => {
  if (!transition) return baseVariants;

  const { exit: _, ...mainTransition } = transition;

  return {
    ...baseVariants,
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit) ? baseVariants.exit.transition : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible as VariantType) ? baseVariants.visible.transition : {}),
        ...mainTransition,
      },
    },
  };
};

export function TextEffect(props: TextEffectProps) {
  const merge = mergeProps(
    {
      per: "word" as PerType,
      preset: "fade" as PresetType,
      speedReveal: 1,
      speedSegment: 1,
      trigger: true,
    },
    props,
  );

  const segments = () => splitText(props.children, merge.per);

  const baseVariants = props.preset ? presetVariants[props.preset] : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[merge.per] / merge.speedReveal;

  const baseDuration = 0.3 / merge.speedSegment;

  const customStagger = hasTransition(merge.variants?.container?.visible ?? {})
    ? (merge.variants?.container?.visible as TargetAndTransition).transition?.staggerChildren
    : undefined;

  const customDelay = hasTransition(merge.variants?.container?.visible ?? {})
    ? (merge.variants?.container?.visible as TargetAndTransition).transition?.delayChildren
    : undefined;

  const computedVariants = {
    container: createVariantsWithTransition(merge.variants?.container || baseVariants.container, {
      delayChildren: customDelay ?? merge.delay,
      staggerChildren: customStagger ?? stagger,
      ...merge.containerTransition,
      exit: {
        staggerChildren: customStagger ?? stagger,
        staggerDirection: -1,
      },
    }),
    item: createVariantsWithTransition(merge.variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...merge.segmentTransition,
    }),
  };

  console.log(computedVariants);
  return (
    <AnimatePresence mode="popLayout">
      <Show when={merge.trigger}>
        <Motion
          animate="visible"
          class={merge.class}
          exit="exit"
          initial="hidden"
          onAnimationComplete={merge.onAnimationComplete}
          onAnimationStart={merge.onAnimationStart}
          style={merge.style}
          variants={computedVariants.container}
        >
          <For each={segments()}>{(segment) => <AnimationComponent per={merge.per} segment={segment} variants={computedVariants.item} />}</For>
        </Motion>
      </Show>
    </AnimatePresence>
  );
}
