import type { DOMKeyframesDefinition, ResolvedValues, VariantLabels } from "framer-motion";
import type { animate, MotionValue, TransformProperties } from "framer-motion/dom";

import type { AnimationControls } from "@/animation/types";
import type { LayoutGroupState } from "@/components/context";
import type { MotionConfigState } from "@/components/context/motion-config/types";
import type { DragProps } from "@/features/gestures/drag/types";
import type { FocusProps } from "@/features/gestures/focus/types";
import type { HoverProps } from "@/features/gestures/hover/types";
import type { InViewProps } from "@/features/gestures/in-view/types";
import type { PanProps } from "@/features/gestures/pan/types";
import type { PressProps } from "@/features/gestures/press/types";
import type { LayoutOptions } from "@/features/layout/types";
import type { AsTag } from "@/types/common";
import type { $Transition } from "./framer-motion";

type AnimationPlaybackControls = ReturnType<typeof animate>;
export interface VariantType extends DOMKeyframesDefinition {
  transition?: Options["transition"];
  attrX?: DOMKeyframesDefinition["x"];
  attrY?: DOMKeyframesDefinition["y"];
  attrScale?: DOMKeyframesDefinition["scale"];
}

interface BoundingBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface DragOptions {
  constraints?: false | Partial<BoundingBox>;
  dragSnapToOrigin?: boolean;
}

type TransformPropertiesWithoutTransition = Omit<TransformProperties, "transition">;
export type MotionStyle = Partial<{
  [K in keyof Omit<VariantType & TransformPropertiesWithoutTransition, "attrX" | "attrY" | "attrScale">]: string | number | undefined | MotionValue;
}>;

export interface Options<T = any> extends LayoutOptions, PressProps, HoverProps, InViewProps, DragProps, PanProps, FocusProps {
  custom?: T;
  as?: AsTag;
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  exit?: VariantLabels | VariantType;
  variants?: {
    [k: string]: VariantType | ((custom: T) => VariantType);
  };
  inherit?: boolean;
  style?: MotionStyle;
  transformTemplate?: (transform: TransformProperties, generatedTransform: string) => string;
  transition?: $Transition & {
    layout?: $Transition;
  };
  layoutGroup?: LayoutGroupState;
  motionConfig?: MotionConfigState;
  onAnimationComplete?: (definition: Options["animate"]) => void;
  onUpdate?: (latest: ResolvedValues) => void;
  onAnimationStart?: (definition: Options["animate"]) => void;
}

export interface MotionStateContext {
  initial?: VariantLabels | boolean;
  animate?: VariantLabels;
  inView?: VariantLabels;
  hover?: VariantLabels;
  press?: VariantLabels;
  exit?: VariantLabels;
}

export type AnimationFactory = () => AnimationPlaybackControls | undefined;

export interface CssPropertyDefinition {
  syntax: `<${string}>`;
  initialValue: string | number;
  toDefaultUnit: (v: number) => string | number;
}

export type CssPropertyDefinitionMap = { [key: string]: CssPropertyDefinition };
