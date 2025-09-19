import type { ValidComponent } from "solid-js";

import type { ElementOf, PolymorphicProps } from "@/components/polymorphic";
import type { Options } from "@/types";

export type MotionProps<T extends ValidComponent = "div"> = PolymorphicProps<T, Options<ElementOf<T>>>;
