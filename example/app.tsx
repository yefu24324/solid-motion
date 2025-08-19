import { createSignal, Show } from "solid-js";
import "./app.css";
import { Base } from "./demo/base.jsx";
import { AnimationUICursor } from "./demo/demo1.jsx";
import { SolidMotiononeExample } from "./demo/demo2.jsx";

export default function App() {
  const [tab, setTab] = createSignal("Base");
  return (
    <main class="container prose-xl mx-auto px-8 py-16">
      <h1 class="text-center">Motion for Solid</h1>

      <button onClick={() => setTab("base")}>Base</button>
      <button onClick={() => setTab("AnimationUICursor")}>AnimationUICursor</button>
      <button onClick={() => setTab("SolidMotiononeExample")}>SolidMotiononeExample</button>
      <div class="m-auto flex h-full max-w-lg select-none flex-col justify-center gap-8 text-black" id="demo">
        <Show when={tab() === "base"}>
          <Base />
        </Show>
        <Show when={tab() === "AnimationUICursor"}>
          <AnimationUICursor />
        </Show>
        <Show when={tab() === "SolidMotiononeExample"}>
          <SolidMotiononeExample />
        </Show>
      </div>
    </main>
  );
}
