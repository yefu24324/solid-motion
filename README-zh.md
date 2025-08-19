# Solid Motion

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![npm](https://img.shields.io/npm/v/solid-motion?style=for-the-badge)](https://www.npmjs.com/package/solid-motion)
[![downloads](https://img.shields.io/npm/dw/solid-motion?color=blue&style=for-the-badge)](https://www.npmjs.com/package/solid-motion)

**一个为SolidJS打造的轻量、高性能动画库，由[Motion](https://motion.dev/)驱动。**

## 介绍

Motion for Solid 参考motion/react设计为SolidJS实现的动画库,

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

## 致谢

特别感谢以下项目的灵感和参考：

- [motion-svelte](https://github.com/epavanello/motion-svelte) - Svelte的Motion动画库实现
- [solid-motionone](https://github.com/solidjs-community/solid-motionone) - SolidJS社区的Motion One实现
