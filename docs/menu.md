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

## 基础用法

```vue
<template>
  <Menu :menuItems="items" />
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, UserIcon, SettingsIcon } from '@heroicons/vue/outline'

const items = ref([
  {
    title: '首页',
    path: '/',
    icon: HomeIcon,
    iconColor: 'text-blue-500'
  },
  {
    title: '用户管理',
    path: '/users',
    icon: UserIcon,
    badge: '99+'
  },
  {
    isSection: true,
    title: '系统设置',
    items: [
      {
        title: '基本设置',
        path: '/settings/basic',
        icon: SettingsIcon
      },
      {
        title: '高级设置',
        path: '/settings/advanced',
        icon: SettingsIcon,
        disabled: true
      }
    ]
  }
])
</script>
```

## 进阶用法

### 1. 自定义徽章

除了使用字符串作为徽章，你还可以传入自定义组件：

```vue
<template>
  <Menu :menuItems="items" />
</template>

<script setup>
const CustomBadge = {
  template: `
    <span class="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
      新消息
    </span>
  `
}

const items = ref([
  {
    title: '消息中心',
    path: '/messages',
    icon: MessageIcon,
    badge: CustomBadge
  }
])
</script>
```

### 2. 响应式菜单

菜单组件会根据 `isExpanded` 属性自动调整宽度和显示内容：

```vue
<template>
  <div class="flex">
    <button @click="toggleMenu">
      {{ isExpanded ? '收起' : '展开' }}
    </button>
    <Menu :menuItems="items" :isExpanded="isExpanded" />
  </div>
</template>

<script setup>
const isExpanded = ref(true)
const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
}
</script>
```

### 3. 工具提示

当菜单收起时，hover 菜单项会显示工具提示：

```vue
<template>
  <Menu :menuItems="items" :isExpanded="false" />
</template>
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

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| menuSelect | (item: MenuItem) | 菜单项被选中时触发 |
| sectionToggle | (title: string, expanded: boolean) | 分组展开/收起时触发 |

## 主题定制

菜单组件使用 Tailwind CSS 构建，你可以通过以下方式自定义主题：

1. 修改激活状态颜色：
```vue
<Menu
  class="[&_.active]:bg-purple-50 [&_.active]:text-purple-600"
  :menuItems="items"
/>
```

2. 自定义hover效果：
```vue
<Menu
  class="[&_.menu-item:hover]:bg-gray-200"
  :menuItems="items"
/>
```

## 最佳实践

1. 图标选择
- 保持图标风格统一
- 推荐使用 Heroicons 或 Material Icons
- 图标大小保持在 18x18 像素

2. 菜单层级
- 建议最多使用两级菜单
- 避免过多的菜单项，影响用户体验

3. 响应式设计
- 在移动端自动收起菜单
- 使用工具提示优化紧凑布局

## 样式定制

组件使用 Tailwind CSS 样式：

- 菜单项：`h-10 rounded-lg`
- 激活状态：`bg-blue-50 text-blue-600`
- 悬停状态：`hover:bg-gray-100`
- 图标：`w-[18px] h-[18px]`
- 过渡动画：`transition-all duration-300`
