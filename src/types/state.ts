import type { ResolvedValues, VariantLabels } from "framer-motion";
// import type { DOMKeyframesDefinition } from "framer-motion";
import type {
  AnyResolvedKeyframe,
  animate,
  MotionValue,
  SVGForcedAttrKeyframesDefinition,
  SVGKeyframesDefinition,
  SVGPathKeyframesDefinition,
  TransformProperties,
  ValueKeyframesDefinition,
  VariableKeyframesDefinition,
} from "framer-motion/dom";
import type { JSX, Ref, ValidComponent } from "solid-js";

import type { AnimationControls } from "@/animation/types";
import type { LayoutGroupState } from "@/components/context/layout-group-context";
import type { MotionConfigState } from "@/components/context/motion-config/types";
import type { DragProps } from "@/features/gestures/drag/types";
import type { FocusProps } from "@/features/gestures/focus/types";
import type { HoverProps } from "@/features/gestures/hover/types";
import type { InViewProps } from "@/features/gestures/in-view/types";
import type { PanProps } from "@/features/gestures/pan/types";
import type { PressProps } from "@/features/gestures/press/types";
import type { LayoutOptions } from "@/features/layout/types";
import type { $Transition } from "./framer-motion";

type AnimationPlaybackControls = ReturnType<typeof animate>;

type CSSPropertyKeys = {
  [K in keyof JSX.CSSProperties as K extends string ? (JSX.CSSProperties[K] extends AnyResolvedKeyframe ? K : never) : never]: JSX.CSSProperties[K];
};

interface CSSStyleDeclarationWithTransform extends Omit<CSSPropertyKeys, "direction" | "transition" | "x" | "y" | "z"> {
  x: number | string;
  y: number | string;
  z: number | string;
  originX: number;
  originY: number;
  originZ: number;
  translateX: number | string;
  translateY: number | string;
  translateZ: number | string;
  rotateX: number | string;
  rotateY: number | string;
  rotateZ: number | string;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  skewX: number | string;
  skewY: number | string;
  transformPerspective: number;
}
type StyleKeyframesDefinition = {
  [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition;
};
type DOMKeyframesDefinition = StyleKeyframesDefinition &
  SVGKeyframesDefinition &
  SVGPathKeyframesDefinition &
  SVGForcedAttrKeyframesDefinition &
  VariableKeyframesDefinition;

export interface VariantType extends DOMKeyframesDefinition {
  transition?: Options["transition"];
  attrX?: DOMKeyframesDefinition["x"];
  attrY?: DOMKeyframesDefinition["y"];
  attrScale?: DOMKeyframesDefinition["scale"];
}

export interface Variants<T extends HTMLElement | SVGElement = HTMLElement | SVGElement> {
  [k: string]: VariantType | ((custom: T) => VariantType);
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

export interface Options<T extends HTMLElement | SVGElement = HTMLElement | SVGElement>
  extends LayoutOptions,
    PressProps,
    HoverProps,
    InViewProps,
    DragProps,
    PanProps,
    FocusProps {
  as?: ValidComponent;
  ref?: Ref<T>;
  custom?: T;
  initial?: VariantLabels | VariantType | boolean;
  animate?: VariantLabels | VariantType | AnimationControls;
  exit?: VariantLabels | VariantType;
  variants?: Variants<T>;
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
