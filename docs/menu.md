# Menu 组件

一个功能丰富的菜单组件，支持分组、徽章、图标和工具提示等特性。

## 特性

- 支持普通菜单项和分组菜单
- 支持菜单项图标
- 支持徽章显示
- 自动路由激活状态
- 响应式设计
- 鼠标悬停工具提示
- 平滑过渡动画
- 分组展开状态本地存储

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| menuItems | Array | required | 菜单配置数组 |
| isExpanded | Boolean | true | 控制菜单是否展开 |

### menuItems 配置项

普通菜单项：
```javascript
{
  title: string;       // 菜单项标题
  path: string;        // 路由路径
  icon?: Component;    // 图标组件
  iconColor?: string;  // 图标颜色
  disabled?: boolean;  // 是否禁用
  badge?: string | Component; // 徽章内容或组件
}
```

分组菜单项：
```javascript
{
  isSection: true;     // 标识为分组
  title: string;       // 分组标题
  items: MenuItem[];   // 子菜单项数组
}
```

## 功能特点

### 1. 路由集成
- 自动识别当前路由
- 高亮显示当前激活的菜单项

### 2. 工具提示
- 在菜单收起状态下自动显示
- 智能定位，避免超出屏幕

### 3. 分组功能
- 支持展开/收起分组
- 记住分组展开状态
- 平滑的展开/收起动画

### 4. 徽章支持
- 支持文本徽章
- 支持自定义组件徽章

## 使用示例

```vue
<template>
  <Menu
    :menu-items="menuItems"
    :is-expanded="isExpanded"
  />
</template>

<script setup>
const isExpanded = ref(true)
const menuItems = [
  // 普通菜单项
  {
    title: '仪表盘',
    path: '/dashboard',
    icon: 'Dashboard',
    badge: '新'
  },

  // 分组菜单
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
  }
]
</script>

## 样式定制

组件使用 Tailwind CSS 样式：

- 菜单项：`h-10 rounded-lg`
- 激活状态：`bg-blue-50 text-blue-600`
- 悬停状态：`hover:bg-gray-100`
- 图标：`w-[18px] h-[18px]`
- 过渡动画：`transition-all duration-300`
