import { HTMLProjectionNode } from "framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs";
import { addScaleCorrector } from "framer-motion/dist/es/projection/styles/scale-correction.mjs";

import { doneCallbacks } from "@/components/animate-presence/presence";
import { Feature } from "@/features/feature";
import { isHTMLElement } from "@/features/gestures/drag/utils/is";
import { defaultScaleCorrector } from "@/features/layout/config";
import { getClosestProjectingNode } from "@/features/layout/utils";

export class ProjectionFeature extends Feature {
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
  }

  initProjection() {
    const options = this.state.options;
    // @ts-ignore
    this.state.visualElement.projection = new HTMLProjectionNode<HTMLElement>(
      this.state.visualElement.latestValues,
      options["data-framer-portal-id"] ? undefined : getClosestProjectingNode(this.state.visualElement.parent),
    );
    this.state.visualElement.projection.isPresent = true;
    this.setOptions();
  }

  beforeMount() {
    this.initProjection();
  }

  setOptions() {
    const options = this.state.options;
    this.state.visualElement.projection.setOptions({
      alwaysMeasureLayout: Boolean(options.drag) || (options.dragConstraints && isHTMLElement(options.dragConstraints)),
      animationType: typeof options.layout === "string" ? options.layout : "both",
      crossfade: options.crossfade,
      layout: options.layout,
      layoutId: options.layoutId,
      // initialPromotionConfig
      layoutRoot: options.layoutRoot,
      layoutScroll: options.layoutScroll,
      onExitComplete: () => {
        if (!this.state.visualElement.projection?.isPresent) {
          const done = doneCallbacks.get(this.state.element);
          this.state.isSafeToRemove = true;
          if (done) {
            done(
              {
                detail: {
                  isExit: true,
                },
              },
              true,
            );
          }
        }
      },
      visualElement: this.state.visualElement,
    });
  }

  update() {
    this.setOptions();
  }

  mount() {
    this.state.visualElement.projection?.mount(this.state.element);
  }
}
