import { AnimationFeature } from "@/features/animation/animation";
// import { PanGesture } from '@/features/gestures/pan'
import type { Feature } from "@/features/feature";
// import { DragGesture } from '@/features/gestures/drag'
import { LayoutFeature } from "@/features/layout/layout";
// import { PressGesture } from '@/features/gestures/press'
// import { HoverGesture } from '@/features/gestures/hover'
// import { InViewGesture } from '@/features/gestures/in-view'
// import { FocusGesture } from '@/features/gestures/focus'
import { ProjectionFeature } from "@/features/layout/projection";

export const domMax: Array<typeof Feature> = [
  AnimationFeature,
  // PressGesture,
  // HoverGesture,
  // InViewGesture,
  // FocusGesture,
  ProjectionFeature,
  // PanGesture,
  // DragGesture,
  LayoutFeature,
];
