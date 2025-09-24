import type { VisualElement } from "framer-motion";

import { doneCallbacks } from "@/components/animate-presence/presence";

export function isPresent(visualElement: VisualElement) {
  return !doneCallbacks.has(visualElement.current as Element);
}
