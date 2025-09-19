import { HTMLVisualElement } from "framer-motion/dist/es/render/html/HTMLVisualElement.mjs";
import { SVGVisualElement } from "framer-motion/dist/es/render/svg/SVGVisualElement.mjs";

import { isSVGElement } from "@/state/utils";
import type { AsTag } from "@/types";

export function createVisualElement(Component: AsTag, options: any) {
  return isSVGElement(Component as any) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
