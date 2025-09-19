import { ChevronsUpDownIcon } from "lucide-solid";
import { createSignal, Show } from "solid-js";
import { AnimatePresence, Motion } from "solid-motion";

import { cx } from "../lib/utils";

export const CollapsibleDemo = () => {
  const [open, setOpen] = createSignal(false);
  return (
    <div class="w-[350px]">
      <div class="space-y-2 mb-2">
        <div class="flex items-center justify-between space-x-4">
          <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
          <button class="w-9 p-0" onClick={() => setOpen(!open())}>
            <ChevronsUpDownIcon class="h-4 w-4" />
            <span class="sr-only">Toggle</span>
          </button>
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/primitives</div>
      </div>
      <AnimatePresence>
        <Show when={open()}>
          <Motion
            animate={{ height: "auto", opacity: 1, overflow: "hidden" }}
            class={cx("data-[closed]:animate-collapsible-up data-[expanded]:animate-collapsible-down overflow-hidden space-y-2")}
            data-slot="collapsible-content"
            exit={{ height: 0, opacity: 0, overflow: "hidden" }}
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            transition={{ damping: 22, duration: 0.5, stiffness: 150, type: "spring" }}
          >
            <div class="rounded-md border px-4 py-3 font-mono text-sm">@radix-ui/colors</div>
            <div class="rounded-md border px-4 py-3 font-mono text-sm">@stitches/react</div>
          </Motion>
        </Show>
      </AnimatePresence>
    </div>
  );
};
