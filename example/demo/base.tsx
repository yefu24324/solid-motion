import { Motion } from "solid-motion";

export function Base() {
  return (
    <div class="m-auto flex h-full w-full max-w-lg select-none flex-col justify-center gap-8 text-black" id="demo">
      <Motion animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 30 }} initial={{ opacity: 0, rotate: -30 }} transition={{ duration: 0.5 }}>
        This is a notification!
      </Motion>
    </div>
  );
}
