import type { MotionState } from '@/state/motion-state'
import { Feature } from '@/features'
import { frame, inView } from 'framer-motion/dom'
import type { Options } from '@/types'

function handleHoverEvent(
  state: MotionState,
  entry: IntersectionObserverEntry,
  lifecycle: 'Enter' | 'Leave',
) {
  const props = state.options
  if (props.whileInView) {
    state.setActive('whileInView', lifecycle === 'Enter')
  }

  const eventName = (`onViewport${lifecycle}`) as
    | 'onViewportEnter'
    | 'onViewportLeave'

  const callback = props[eventName]
  if (callback) {
    frame.postRender(() => callback(entry))
  }
}

export class InViewGesture extends Feature {
  isActive() {
    const { whileInView, onViewportEnter, onViewportLeave } = this.state.options
    return Boolean(whileInView || onViewportEnter || onViewportLeave)
  }

  constructor(state: MotionState) {
    super(state)
  }

  startObserver() {
    const element = this.state.element
    if (!element || !this.isActive())
      return
    this.unmount()
    const { once, ...viewOptions } = this.state.options.inViewOptions || {}
    this.unmount = inView(
      element,
      (_, entry) => {
        handleHoverEvent(this.state, entry, 'Enter')
        if (!once) {
          return (endEvent) => {
            handleHoverEvent(this.state, entry, 'Leave')
          }
        }
      },
      viewOptions,
    )
  }

  mount() {
    this.startObserver()
  }

  update(): void {
    const { props, prevProps } = this.state.visualElement
    const hasOptionsChanged = ['amount', 'margin', 'root'].some(
      hasViewportOptionChanged(props as any, prevProps as any),
    )
    if (hasOptionsChanged) {
      this.startObserver()
    }
  }
}

function hasViewportOptionChanged(
  { inViewOptions = {} }: Options,
  { inViewOptions: prevViewport = {} }: Options = {},
) {
  return (name: keyof typeof inViewOptions) =>
    inViewOptions[name] !== prevViewport[name]
}
