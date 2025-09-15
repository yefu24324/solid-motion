import { createSignal, For, Show } from "solid-js";
import "./app.css";

import { MotionEffectImageGridDemo } from "./components/animate-ui/demo/motion-effect-image-grid-demo.jsx";
import { MotionHighlightCardsHoverDemo } from "./components/animate-ui/demo/motion-highlight-cards-hover-demo.jsx";
import { TextLoopDemo } from "./components/motion/text-loop-demo.jsx";
import { Base } from "./demo/base.jsx";
import { AnimationUICursor } from "./demo/demo1.jsx";
import { SolidMotiononeExample } from "./demo/demo2.jsx";
import { LayoutDemo } from "./demo/layout-demo";

export default function App() {
  const [tab, setTab] = createSignal("Base");
  const tabs = [
    {
      label: "Base",
      value: "base",
    },
    {
      label: "Layout",
      value: "LayoutDemo",
    },
    {
      label: "AnimationUICursor",
      value: "AnimationUICursor",
    },
    {
      label: "SolidMotiononeExample",
      value: "SolidMotiononeExample",
    },
    {
      label: "Motion Effect",
      value: "MotionEffectImageGridDemo",
    },
    {
      label: "Text Loop",
      value: "TextLoopDemo",
    },
    {
      label: "Motion Highlight",
      value: "MotionHighlightCardsHoverDemo",
    },
  ];
  return (
    <main class="container prose-xl mx-auto px-8 py-16">
      <h1 class="text-center">Motion for Solid</h1>

      <div class="text-muted-foreground inline-flex w-fit items-center justify-start rounded-xl h-10 bg-transparent p-0">
        <For each={tabs}>
          {(tab) => (
            <button
              class="inline-flex cursor-pointer items-center size-full justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 z-[1] relative border-none rounded-lg px-4 py-2 h-full font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:text-foreground data-[state=active]:shadow-none"
              onClick={() => setTab(tab.value)}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>

      <div class="m-auto flex h-full max-w-lg select-none flex-col justify-center gap-8 text-black" id="demo">
        <Show when={tab() === "base"}>
          <Base />
        </Show>
        <Show when={tab() === "LayoutDemo"}>
          <LayoutDemo />
          asd
        </Show>
        <Show when={tab() === "AnimationUICursor"}>
          <AnimationUICursor />
        </Show>
        <Show when={tab() === "SolidMotiononeExample"}>
          <SolidMotiononeExample />
        </Show>
        <Show when={tab() === "MotionEffectImageGridDemo"}>
          <MotionEffectImageGridDemo />
        </Show>
        <Show when={tab() === "TextLoopDemo"}>
          <TextLoopDemo />
        </Show>
        <Show when={tab() === "MotionHighlightCardsHoverDemo"}>
          <MotionHighlightCardsHoverDemo />
        </Show>
      </div>
    </main>
  );
}
