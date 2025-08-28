# Solid Motion

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![npm](https://img.shields.io/npm/v/solid-motion?style=for-the-badge)](https://www.npmjs.com/package/solid-motion)
[![downloads](https://img.shields.io/npm/dw/solid-motion?color=blue&style=for-the-badge)](https://www.npmjs.com/package/solid-motion)

**A lightweight, high-performance animation library for SolidJS. Powered by [Motion](https://motion.dev/).**

 [**中文文档**](./README-zh.md) 
 
## Introduction

Motion for Solid is an animation library for SolidJS inspired by motion/react design.

## Installation

Motion for Solid can be installed via npm:

```bash
npm install solid-motion
# or
pnpm add solid-motion
# or
yarn add solid-motion
```

## Usage Examples

### Basic Enter/Exit Animation

```tsx
import {Motion} from "solid-motion"

function App() {
  return (
    <Motion
			initial={{ opacity: 0, rotate: -30 }}
			animate={{ opacity: 1, rotate: 0 }}
			exit={{ opacity: 0, rotate: 30 }}
			transition={{ duration: 0.5 }}
		>
			This is a notification!
		</Motion>
  )
}
```

### Using Motion Values

#### Usage with Solid Reactivity
```tsx
import { createSpring } from "solid-motion";

const [cursorPos, setCursorPos] = createSignal<{ x: number, y: number}>({ x: 0, y: 0 });

const springX = createSpring(() => cursorPos().x);
```

Update cursorPos when mouse moves

```tsx
setCursorPos({ x: 500, y: 0 });
```

Track springX changes in a reactive way
```tsx
createEffect(() => {
	console.log("spring change: ", springX());
})
```

> Native functions provided with the `create` prefix all represent reactive handling. Spring also provides a `useSpring` function, which also has the ability to receive reactive values, but returns a motion `MotionValue` object.

## Acknowledgments

Special thanks to the following projects for inspiration and reference:

- [motion-svelte](https://github.com/epavanello/motion-svelte) - Motion animation library implementation for Svelte
- [solid-motionone](https://github.com/solidjs-community/solid-motionone) - Motion One implementation for SolidJS community
