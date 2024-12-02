# Sidebar 组件

一个功能丰富的可折叠侧边栏组件，支持悬停展开、固定展开、自定义菜单等特性。

## 特性

- 可展开/收缩的侧边栏（展开宽度64，收缩宽度14）
- 支持悬停自动展开
- 支持固定展开状态
- 支持自定义菜单项
- 响应式设计，带有平滑过渡动画

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| menuItems | Array | null | 菜单项配置数组 |
| pinned | boolean | false | 是否固定展开状态 |

## 插槽

| 名称 | 说明 |
|------|------|
| logo | 顶部Logo区域 |
| default | 主要内容区域 |
| footer | 底部区域 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| expand-change | (isExpanded: boolean) | 当展开状态改变时触发 |

## 使用示例

```vue
<template>
  <Sidebar 
    v-model:pinned="isPinned"
    :menu-items="menuItems"
    @expand-change="handleExpandChange"
  >
    <template #logo>
      <img src="logo.png" alt="Logo" />
    </template>
    
    <template #footer>
      <div>底部内容</div>
    </template>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'

const isPinned = ref(false)
const menuItems = [
  // 菜单配置...
]

const handleExpandChange = (isExpanded) => {
  console.log('Sidebar expanded:', isExpanded)
}
</script>

## 注意事项

1. 组件使用 TailwindCSS 进行样式设计，确保项目中已正确配置
2. 组件宽度在展开和收缩状态下分别为 64 和 14 个单位
3. 当设置 `pinned` 为 true 时，侧边栏将保持展开状态
4. 可以通过 `menuItems` 属性传入菜单配置，也可以使用默认插槽自定义内容