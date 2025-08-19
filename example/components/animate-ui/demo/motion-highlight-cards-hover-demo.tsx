import { Blocks, BringToFront, GitPullRequest } from "lucide-react";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";

import ShadcnIcon from "@/components/icons/shadcn-icon";

const CARDS = [
  {
    description: "Beautiful Motion-animated components for dynamic websites.",
    icon: BringToFront,
    title: "Animated Components",
    value: "1",
  },
  {
    description: "A project built for the dev community with the dev community.",
    icon: GitPullRequest,
    title: "Open Source",
    value: "2",
  },
  {
    description: "The components are designed to be used with Shadcn UI components.",
    icon: ShadcnIcon,
    title: "Complementary to Shadcn UI",
    value: "3",
  },
  {
    description: "Install the components in your project and modify them as you wish.",
    icon: Blocks,
    title: "Component Distribution",
    value: "4",
  },
];

export const MotionHighlightCardsHoverDemo = () => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MotionHighlight class="rounded-xl" hover>
        {CARDS.map((card) => (
          <div data-value={card.value}>
            <div class="p-4 flex flex-col border rounded-xl">
              <div class="flex items-center justify-around size-10 rounded-lg bg-blue-500/10 mb-2">
                <card.icon class="size-5 text-blue-500" />
              </div>
              <p class="text-base font-medium mb-1">{card.title}</p>
              <p class="text-sm text-muted-foreground">{card.description}</p>
            </div>
          </div>
        ))}
      </MotionHighlight>
    </div>
  );
};
