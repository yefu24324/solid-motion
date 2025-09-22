# Solid Motion

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![npm](https://img.shields.io/npm/v/solid-motion?style=for-the-badge)](https://www.npmjs.com/package/solid-motion)
[![downloads](https://img.shields.io/npm/dw/solid-motion?color=blue&style=for-the-badge)](https://www.npmjs.com/package/solid-motion)

**一个为SolidJS打造的轻量、高性能动画库，由[Motion](https://motion.dev/)驱动。**

## 介绍 Motion for Solid 

参考motion/react设计为SolidJS实现的动画库,

**这个项目还处在测试阶段，并且作者还在学习motion/react的过程中，我期望在接下来的Solid项目中能够使用非常优秀的动画组件，收集在React项目中我觉得优秀的组件并在项目[motion-primitives-solid](github.com/yefu24324/motion-primitives-solid)中提供Solid的开源代码，我正在探寻solid-motion在生产级应用可能出现的问题。**

可访问[在线示例](https://motion-primitives-solid.yefu24324.com)

## 安装

Motion for Solid 可以通过npm安装：

```bash
npm install solid-motion
# 或
pnpm add solid-motion
# 或
yarn add solid-motion
```

## 使用示例

### 基本的 Enter/Exit 动画

```tsx
import { Motion } from "solid-motion"

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

### 使用motion值

#### 带有Solid响应式的用法
```tsx
import { createSpring } from "solid-motion";

const [cursorPos, setCursorPos] = createSignal<{ x: number, y: number}>({ x: 0, y: 0 });

const springX = createSpring(() => cursorPos().x);
```

鼠标移动时更新cursorPos

```tsx
setCursorPos({ x: 500, y: 0 });
```

以响应式的方式跟踪springX变化
```tsx
createEffect(() => {
	console.log("spring change: ", springX());
})
```

> 以create前缀提供的原生函数均代表提供了响应式处理，spring也提供了`useSpring`函数，其也拥有接收响应式值的功能，但返回的是motion的`MotionValue`对象


## 致谢

特别感谢以下项目的灵感和参考：

- [motion-vue](https://github.com/motiondivision/motion-vue) - [solid-motion](.) 项目是基于Motion Vue项目重写的Solid Motion
- [solid-motionone](https://github.com/solidjs-community/solid-motionone) - 参考了其项目结构与Presence节点的实现