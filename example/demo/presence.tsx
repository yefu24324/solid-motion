import { createSignal, For, onCleanup, Show } from "solid-js";
import { AnimatePresence, Motion } from "solid-motion";

export function PresenceDemo() {
  const tabs = [
    { icon: "🍅", label: "Tomato" },
    { icon: "🥬", label: "Lettuce" },
    { icon: "🧀", label: "Cheese" },
    { icon: "🥕", label: "Carrot" },
    { icon: "🍌", label: "Banana" },
    { icon: "🫐", label: "Blueberries" },
    { icon: "🥂", label: "Champers?" },
  ];
  const [selectedTab, setSelectedTab] = createSignal(tabs[0]);

  const interval = setInterval(() => {
    const index = tabs.indexOf(selectedTab());
    const next = index + 1 === tabs.length ? 0 : index + 1;
    setSelectedTab(tabs[next]);
  }, 2000);
  onCleanup(() => {
    clearInterval(interval);
  });
  return (
    <AnimatePresence mode="wait">
      <For each={tabs}>
        {(item) => (
          <Show when={selectedTab() === item}>
            <Motion
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: 10 }}
              style={{ "font-size": "128px" }}
              transition={{ duration: 0.2 }}
            >
              {item.icon}
            </Motion>
          </Show>
        )}
      </For>
    </AnimatePresence>
  );
}
