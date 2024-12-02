# Menu 组件

一个功能丰富的菜单组件，支持多级菜单、徽章、分组等特性。完美配合 Sidebar 组件使用。

## 特性

- 支持普通菜单项和分组菜单
- 自动路由激活状态
- 支持菜单项禁用
- 支持徽章显示
- 支持分割线
- 支持展开/收缩动画
- 悬停提示（当菜单收缩时）
- 分组展开状态本地存储

## Props

| 属性 | 类型 | 默认值 | 必需 | 说明 |
|------|------|--------|------|------|
| menuItems | Array | - | 是 | 菜单配置数组 |
| isExpanded | Boolean | true | 否 | 是否展开状态 |

## 菜单项配置

### 普通菜单项
```typescript
{
  title: string,        // 菜单项标题
  path: string,         // 路由路径
  icon: Component,      // 图标组件
  iconColor?: string,   // 图标颜色
  disabled?: boolean,   // 是否禁用
  badge?: string | Component, // 徽章内容
  divider?: boolean     // 是否显示分割线
}
```

### 分组菜单项
```typescript
{
  isSection: true,      // 标识为分组
  title: string,        // 分组标题
  expandable?: boolean, // 是否可展开，默认true
  items: Array         // 子菜单项数组
}
```

## 使用示例

### 基础用法
```vue
<template>
  <Menu 
    :menu-items="menuItems"
    :is-expanded="isExpanded"
  />
</template>

<script setup>
const menuItems = [
  {
    title: '仪表盘',
    path: '/dashboard',
    icon: 'Dashboard',
    badge: '新'
  },
  {
    title: '用户',
    path: '/users',
    icon: 'Users',
    disabled: true
  },
  {
    divider: true  // 添加分割线
  }
]
</script>
```

### 分组菜单
```vue
<template>
  <Menu :menu-items="groupedMenuItems" />
</template>

<script setup>
const groupedMenuItems = [
  {
    isSection: true,
    title: '系统管理',
    items: [
      {
        title: '用户管理',
        path: '/users',
        icon: 'Users'
      },
      {
        title: '角色管理',
        path: '/roles',
        icon: 'Shield'
      }
    ]
  },
  {
    isSection: true,
    title: '系统设置',
    expandable: false,  // 禁用展开/收缩
    items: [
      {
        title: '基础设置',
        path: '/settings/basic',
        icon: 'Settings'
      }
    ]
  }
]
</script>
```

### 与 Sidebar 组件配合使用
```vue
<template>
  <Sidebar 
    v-model:pinned="isPinned"
    :menu-items="menuItems"
  >
    <template #logo>
      <img src="logo.png" alt="Logo" />
    </template>
  </Sidebar>
</template>

<script setup>
import { ref } from 'vue'

const isPinned = ref(false)
const menuItems = [
  {
    isSection: true,
    title: '主导航',
    items: [
      {
        title: '仪表盘',
        path: '/dashboard',
        icon: 'Dashboard',
        badge: '新'
      }
    ]
  }
]
</script>
```

## 注意事项

1. Menu组件的展开状态会保存在localStorage中，键名为`menu_expanded_sections`
2. 图标组件需要单独引入和注册
3. 路由激活状态是基于完全匹配的路径
4. 当菜单收起时，会显示悬停提示
5. 徽章支持字符串或自定义组件两种形式
6. 分组菜单默认可展开，可通过 `expandable: false` 禁用
7. 组件使用 TailwindCSS 进行样式设计，确保项目中已正确配置
