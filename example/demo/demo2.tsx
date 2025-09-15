import { createSignal, Show } from "solid-js";
import { AnimatePresence, Motion } from "solid-motion";

export function SolidMotiononeExample() {
  const [showNotification, setShowNotification] = createSignal(false);
  const [spin, setSpin] = createSignal(false);
  const [count, setCount] = createSignal(1);
  const [hover, setHover] = createSignal(false);
  return (
    <div class="m-auto flex h-full max-w-lg select-none flex-col justify-center gap-8 text-black" id="demo">
      <button class="w-full origin-center rounded-lg p-4 text-center bg-indigo-700" onClick={() => setShowNotification(!showNotification())} type="button">
        Toggle Notification
      </button>

      <AnimatePresence>
        <Show when={showNotification()}>
          <Motion
            animate={{ opacity: 1, rotate: 0 }}
            class="w-full origin-center rounded-lg p-4 text-center bg-indigo-900"
            exit={{ opacity: 0, rotate: 30 }}
            initial={{ opacity: 0, rotate: -30 }}
            transition={{ duration: 0.5 }}
          >
            This is a notification!
          </Motion>
        </Show>
      </AnimatePresence>

      {/* Example 2: Infinite Pulse */}
      <Motion
        animate={{ scale: [1, 1.2, 1] }}
        class="w-full origin-center rounded-lg p-4 text-center bg-red-200"
        transition={{ duration: 2, repeat: Infinity }}
      >
        Pulse
      </Motion>

      {/* Example 4: Rotate on Click */}
      <Motion
        animate={{ rotate: spin() ? 360 : 0 }}
        class="cursor-pointer w-full origin-center rounded-lg p-4 text-center bg-purple-200"
        onclick={() => setSpin(!spin())}
        transition={{ duration: 1 }}
      >
        Click to Spin {spin() ? "spin" : "no"}
      </Motion>

      {/* Example 5: Hover Card */}
      {/* <Motion
					initial={{ y: 0 }}
					whileHover={{ y: -10 }}
					class="bg-yellow-200"
				>
					Hover Card
				</Motion> */}

      {/* Example 6: Counter with Animation */}
      <Motion
        animate={{ scale: count() % 2 === 0 ? 1 : 1.1 }}
        class="cursor-pointer w-full origin-center rounded-lg p-4 text-center bg-orange-200"
        onclick={() => setCount(count() + 1)}
        transition={{ type: "spring" }}
      >
        Count: {count()}
      </Motion>

      {/* Example 8: Hover with Animation */}
      <Motion
        animate={{
          rotate: hover() ? 45 : 0,
          scale: hover() ? 1.2 : 1,
        }}
        class="w-full origin-center rounded-lg p-4 text-center bg-pink-200"
        onmouseenter={() => setHover(true)}
        onmouseleave={() => setHover(false)}
        transition={{ type: "spring" }}
      >
        Hover Transform
      </Motion>

      {/* Example 10: Keyframe Animation */}
      <Motion
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 0.8, 1],
        }}
        class="w-full origin-center rounded-lg p-4 text-center bg-gray-200"
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        Keyframes
      </Motion>
    </div>
  );
}
