<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col"
    :class="[isExpanded ? 'w-64' : 'w-14 overflow-x-hidden']" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <!-- Logo插槽 -->
    <div class="h-14 flex items-center justify-between transition-all duration-300 px-2">
      <slot name="logo"></slot>
      <Transition name="fade">
        <button v-show="pinned || sidebarState.isHovered" @click="pinned = !pinned"
          class="p-1 min-h-7 hover:bg-gray-100 rounded-lg transition-colors">
          <component :is="pinned ? 'PinOff' : 'Pin'" class="w-4 h-4 text-gray-500" />
        </button>
      </Transition>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex flex-col flex-1 py-2 px-2 text-gray-600 overflow-y-auto">
      <!-- 如果有 menuItems，显示菜单组件 -->
      <template v-if="menuItems">
        <Menu :menu-items="menuItems" :is-expanded="isExpanded" />
      </template>
      <!-- 默认插槽 -->
      <slot></slot>
    </div>

    <!-- 底部插槽 -->
    <slot name="footer"></slot>
  </aside>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, defineModel, watch } from 'vue'
import Menu from '../menu/index.vue'

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => null
  }
})

const pinned = defineModel('pinned', { default: false })
const emit = defineEmits(['expand-change'])

// 侧边栏状态管理
const sidebarState = reactive({
  isHovered: false
})

// 计算是否展开
const isExpanded = computed(() => {
  return pinned.value || sidebarState.isHovered
})

// 监听展开状态变化
watch(isExpanded, (newValue) => {
  emit('expand-change', newValue)
})

// 鼠标事件处理
const handleMouseEnter = () => {
  if (!pinned.value) {
    sidebarState.isHovered = true
  }
}

const handleMouseLeave = () => {
  if (!pinned.value) {
    sidebarState.isHovered = false
  }
}

// 监听固定状态变化
watch(pinned, (newValue) => {
  sidebarState.isHovered = newValue
})

// 组件挂载时初始化
onMounted(() => {
  if (pinned.value) {
    sidebarState.isHovered = true
  }
})
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>