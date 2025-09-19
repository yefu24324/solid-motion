import type { Options } from "@/types";

/**
 * Motion configuration state shared through context
 */
export interface MotionConfigState {
  /** Default transition settings for animations */
  transition?: Options["transition"];
  /**
   * @deprecated Use `reducedMotion` instead
   */
  reduceMotion?: "user" | "never" | "always";
  /** Controls motion reduction based on user preference or explicit setting */
  reducedMotion?: "user" | "never" | "always";
  /** Custom nonce for CSP compliance with inline styles */
  nonce?: string;
  /** Options for the inView prop */
  inViewOptions?: Options["inViewOptions"];
}

/** Props interface matching the config state */
export type MotionConfigProps = MotionConfigState;
