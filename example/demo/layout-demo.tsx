import { animateView } from "motion-dom";
import { createSignal } from "solid-js";
import { Motion } from "solid-motion";

import { cn } from "../lib/utils.js";

export function LayoutDemo() {
  const [isOn, setIsOn] = createSignal(false);

  function onClick() {
    animateView(
      () => {
        setIsOn(!isOn());
      },
      {
        duration: 0.3,
        ease: [0.24, 0.02, 0.13, 1.01],
      },
    );
  }
  return (
    <button class={cn("w-28 h-12 bg-gray-200 rounded-full flex items-center", isOn() ? "justify-end" : "justify-start")} onclick={onClick}>
      <Motion
        class="w-10 h-10 bg-indigo-500 rounded-full"
        data-state={isOn()}
        style={{ "view-transition-name": "switch" }}
        transition={{
          bounce: 0.2,
          type: "spring",
          visualDuration: 0.2,
        }}
      />
    </button>
  );
}
