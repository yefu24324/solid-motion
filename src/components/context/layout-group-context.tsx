import type { IProjectionNode } from "framer-motion";
import { type Accessor, createContext } from "solid-js";

export interface NodeGroup {
  add: (node: IProjectionNode) => void;
  remove: (node: IProjectionNode) => void;
  dirty: VoidFunction;
}

export interface LayoutGroupContextProps {
  id?: string;
  group?: NodeGroup;
  forceRender?: VoidFunction;
  key?: Accessor<number>;
}

export const LayoutGroupContext = createContext<LayoutGroupContextProps>({});
