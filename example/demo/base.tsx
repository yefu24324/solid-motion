import { Motion } from "solid-motion";

export function Base() {
  return (
    <div class="m-auto flex h-full w-full max-w-lg select-none flex-col justify-center gap-8 text-black" id="demo">
      <Motion
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 30 }}
        initial={{ opacity: 0, rotate: -30 }}
        transition={{ delayChildren: 2, duration: 0.5 }}
      >
        This is a notification!
      </Motion>
      <Motion animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delayChildren: 2, duration: 0.5 }}>
        This is a notification! 1
      </Motion>
      <Motion animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delayChildren: 2, duration: 0.5 }}>
        This is a notification! 2
      </Motion>
      <Motion animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delayChildren: 2, duration: 0.5 }}>
        This is a notification! 3
      </Motion>
      <Motion animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delayChildren: 2, duration: 0.5 }}>
        This is a notification! 4
      </Motion>
    </div>
  );
}
