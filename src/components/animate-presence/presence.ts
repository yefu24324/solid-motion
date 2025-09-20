export const doneCallbacks = new WeakMap<Element, (v?: any, safeUnmount?: boolean) => void>();

export function removeDoneCallback(element: Element) {
  const prevDoneCallback = doneCallbacks.get(element);
  if (prevDoneCallback) {
    element.removeEventListener("motioncomplete", prevDoneCallback);
  }
  doneCallbacks.delete(element);
}
