import { addDomEvent, addPointerInfo, type EventListenerWithPointInfo } from "@/events";

export function addPointerEvent(target: EventTarget, eventName: string, handler: EventListenerWithPointInfo, options?: AddEventListenerOptions) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
