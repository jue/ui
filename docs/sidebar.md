# Sidebar 组件

一个可展开/收缩的响应式侧边栏组件，支持固定展开和悬停展开功能。

## 特性

- 可展开/收缩的侧边栏
- 支持固定展开状态
- 支持鼠标悬停展开
- 自定义 logo 区域
- 集成菜单组件
- 自定义底部内容
- 平滑过渡动画

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| menuItems | Array | null | 菜单项配置数组，可选 |
| v-model:pinned | Boolean | false | 控制侧边栏是否固定展开 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| expand-change | (isExpanded: boolean) | 当侧边栏展开/收缩状态改变时触发 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| logo | 自定义 logo 区域内容 |
| default | 默认插槽，用于自定义主要内容 |
| footer | 自定义底部内容 |

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
      <div class="p-4">底部内容</div>
    </template>
  </Sidebar>
</template>

<script setup>
const isPinned = ref(false)
const menuItems = [
  {
    title: '首页',
    path: '/',
    icon: 'Home'
  }
  // ... 更多菜单项
]

const handleExpandChange = (isExpanded) => {
  console.log('Sidebar expanded:', isExpanded)
}
</script>

## 样式定制

组件使用 Tailwind CSS 进行样式设置，主要样式类包括：

- 宽度：展开时 `w-64`，收起时 `w-14`
- 背景：`bg-white`
- 边框：`border-r border-gray-200`
- 过渡：`transition-all duration-300`