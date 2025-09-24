import { HTMLVisualElement } from "framer-motion/dist/es/render/html/HTMLVisualElement.mjs";
import { SVGVisualElement } from "framer-motion/dist/es/render/svg/SVGVisualElement.mjs";
import type { ValidComponent } from "solid-js";

import { isSVGElement } from "@/state/utils";

export function createVisualElement(Component: ValidComponent, options: any) {
  return isSVGElement(Component as any) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
