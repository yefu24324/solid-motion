import { createSignal } from "solid-js";
import { Motion } from "solid-motion";

import { beforeUpdate } from "@/components/motion/use-motion-state";
import { cn } from "../lib/utils";

export function LayoutDemo() {
  const [isOn, setIsOn] = createSignal(false);
  return (
    <button class={cn("w-28 h-12 bg-gray-200 rounded-full flex items-center", isOn() ? "justify-end" : "justify-start")}>
      <Motion
        class="w-6 h-6 bg-indigo-500 rounded-full"
        data-state={isOn()}
        layout
        onClick={() =>
          beforeUpdate(() => {
            setIsOn(!isOn());
          })
        }
        transition={{
          bounce: 0.2,
          type: "spring",
          visualDuration: 0.2,
        }}
      />
    </button>
  );
}
