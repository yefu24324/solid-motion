import type { ComponentProps, JSX, ValidComponent } from "solid-js";

// biome-ignore lint/suspicious/noExplicitAny: 有可能存在其他类型
export type ElementOf<T> = T extends HTMLElement ? T : T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : any;

/**
 * Allows for extending a set of props (`Source`) by an overriding set of props (`Override`),
 * ensuring that any duplicates are overridden by the overriding set of props.
 */
type OverrideProps<Source = {}, Override = {}> = Omit<Source, keyof Override> & Override;

/**
 * Polymorphic attribute.
 */
interface PolymorphicAttributes<T extends ValidComponent> {
  as?: T | keyof JSX.HTMLElementTags;
}
/**
 * Props used by a polymorphic component.
 */
export type PolymorphicProps<T extends ValidComponent, Props extends {} = {}> = OverrideProps<
  ComponentProps<T>, // Override props from custom/tag component with our own
  // Override props from custom/tag component with our own
  Props & // Accept custom props of our own component
    PolymorphicAttributes<T>
>;
