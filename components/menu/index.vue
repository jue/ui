<template>
  <nav class="space-y-0.5 transition-all duration-300 overflow-hidden select-none"
    :class="[isExpanded ? 'w-full' : 'w-10']">
    <template v-for="(item, index) in menuItems" :key="index">
      <!-- 普通菜单项 -->
      <template v-if="!('isSection' in item)">
        <div class="relative" @mouseenter="showTooltip(item)" @mouseleave="hideTooltip">
          <router-link v-if="!item.disabled" :to="item.path"
            class="flex items-center h-10 text-[15px] rounded-lg group relative" :class="[
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100'
            ]">
            <div class="w-10 flex items-center justify-center flex-shrink-0">
              <component :is="item.icon" class="w-[18px] h-[18px]"
                :class="[item.iconColor || (isActive(item.path) ? 'text-blue-600' : 'text-gray-500')]" />
            </div>
            <div class="flex-1 transition-all duration-300" :class="[isExpanded ? 'opacity-100' : 'opacity-0 w-0']">
              <span class="whitespace-nowrap" :class="[isActive(item.path) ? 'text-blue-600' : 'text-gray-700']">
                {{ item.title }}
              </span>
            </div>
            <div v-if="item.badge" class="absolute right-0 pr-2.5 transition-opacity duration-300"
              :class="[isExpanded ? 'opacity-100' : 'opacity-0']">
              <span v-if="typeof item.badge === 'string'"
                class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                {{ item.badge }}
              </span>
              <component v-else :is="item.badge" />
            </div>
          </router-link>
          <div v-else
            class="flex items-center h-10 text-[15px] rounded-lg group relative opacity-50 cursor-not-allowed">
            <div class="w-10 flex items-center justify-center flex-shrink-0">
              <component :is="item.icon" class="w-[18px] h-[18px] text-gray-500" />
            </div>
            <div class="flex-1 transition-all duration-300" :class="[isExpanded ? 'opacity-100' : 'opacity-0 w-0']">
              <span class="whitespace-nowrap text-gray-700">
                {{ item.title }}
              </span>
            </div>
            <div v-if="item.badge" class="absolute right-0 pr-2.5 transition-opacity duration-300"
              :class="[isExpanded ? 'opacity-100' : 'opacity-0']">
              <span v-if="typeof item.badge === 'string'"
                class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                {{ item.badge }}
              </span>
              <component v-else :is="item.badge" />
            </div>
          </div>
        </div>
        <div v-if="item.divider" class="!my-2 border-t border-gray-200"></div>
      </template>

      <!-- 分组菜单项 -->
      <template v-else>
        <div class="pt-2 space-y-0.5">
          <div class="h-7 flex items-center cursor-pointer relative" @mouseenter="showTooltip(item)"
            @mouseleave="hideTooltip" @click="item.expandable !== false && toggleSection(item.title)">

            <div class="flex-1 transition-all duration-300 overflow-hidden"
              :class="[isExpanded ? 'opacity-100 px-3' : 'opacity-0 w-0 px-0']">
              <span class="text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{{ item.title
                }}</span>
            </div>
            <div :class="[' flex items-center justify-center flex-shrink-0 w-10']">
              <ChevronRight v-if="item.expandable !== false"
                class="w-4 h-4 text-gray-400 transition-transform duration-300"
                :class="[expandedSections[item.title] ? 'rotate-90' : '']" />
              <template v-else>
                <Minus v-if="!isExpanded" class="w-4 h-4 text-gray-400 transition-transform duration-300"
                  :class="[expandedSections[item.title] ? 'rotate-90' : '']" />
              </template>
            </div>
          </div>
          <div class="overflow-hidden">
            <Transition enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-300 ease-in" enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[400px]" leave-from-class="opacity-100 max-h-[400px]"
              leave-to-class="opacity-0 max-h-0">
              <div v-show="item.expandable === false || expandedSections[item.title]" class="relative">
                <template v-for="subItem in item.items" :key="subItem.path">
                  <div class="relative" @mouseenter="showTooltip(subItem)" @mouseleave="hideTooltip">
                    <router-link v-if="!subItem.disabled" :to="subItem.path"
                      class="flex items-center h-10 text-[15px] rounded-lg group relative" :class="[
                        isActive(subItem.path)
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-100'
                      ]">
                      <div class="w-10 flex items-center justify-center flex-shrink-0">
                        <component :is="subItem.icon" class="w-[18px] h-[18px]"
                          :class="[subItem.iconColor || (isActive(subItem.path) ? 'text-blue-600' : 'text-gray-500')]" />
                      </div>
                      <div class="flex-1 transition-all duration-300"
                        :class="[isExpanded ? 'opacity-100' : 'opacity-0 w-0']">
                        <span class="whitespace-nowrap"
                          :class="[isActive(subItem.path) ? 'text-blue-600' : 'text-gray-700']">
                          {{ subItem.title }}
                        </span>
                      </div>
                      <div v-if="subItem.badge" class="absolute right-0 pr-2.5 transition-opacity duration-300"
                        :class="[isExpanded ? 'opacity-100' : 'opacity-0']">
                        <span v-if="typeof subItem.badge === 'string'"
                          class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {{ subItem.badge }}
                        </span>
                        <component v-else :is="subItem.badge" />
                      </div>
                    </router-link>
                    <div v-else
                      class="flex items-center h-10 text-[15px] rounded-lg group relative opacity-50 cursor-not-allowed">
                      <div class="w-10 flex items-center justify-center flex-shrink-0">
                        <component :is="subItem.icon" class="w-[18px] h-[18px] text-gray-500" />
                      </div>
                      <div class="flex-1 transition-all duration-300"
                        :class="[isExpanded ? 'opacity-100' : 'opacity-0 w-0']">
                        <span class="whitespace-nowrap text-gray-700">
                          {{ subItem.title }}
                        </span>
                      </div>
                      <div v-if="subItem.badge" class="absolute right-0 pr-2.5 transition-opacity duration-300"
                        :class="[isExpanded ? 'opacity-100' : 'opacity-0']">
                        <span v-if="typeof subItem.badge === 'string'"
                          class="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                          {{ subItem.badge }}
                        </span>
                        <component v-else :is="subItem.badge" />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </Transition>
          </div>
        </div>
      </template>
    </template>
  </nav>

  <!-- 使用 Teleport 将提示框传送到 body 底部 -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="!isExpanded && tooltipData.show"
        class="fixed pointer-events-none px-3 py-2 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-[9999] flex items-center h-8"
        :style="{ left: tooltipData.x + 'px', top: tooltipData.y + 'px' }">
        {{ tooltipData.title }}
        <div class="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tooltipData = reactive({
  show: false,
  title: '',
  x: 0,
  y: 0
})

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: true
  }
})

// 从localStorage加载展开状态
const STORAGE_KEY = 'menu_expanded_sections'
const expandedSections = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'))

onMounted(() => {
  // 加载localStorage中的展开状态
  const storedExpandedSections = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  expandedSections.value = storedExpandedSections
})

// 切换展开状态并保存到localStorage
const toggleSection = (title) => {
  expandedSections.value[title] = !expandedSections.value[title]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expandedSections.value))
}

// 检查当前路径是否激活
const isActive = (path) => {
  return route.path === path
}

const showTooltip = (item) => {
  if (!props.isExpanded) {
    const menuElement = event.currentTarget
    const rect = menuElement.getBoundingClientRect()
    const tooltipHeight = 32 // 提示框的固定高度(py-2为上下各8px，文字大约16px)
    tooltipData.title = item.title
    tooltipData.x = rect.right + 12
    tooltipData.y = rect.top + (rect.height - tooltipHeight) / 2
    tooltipData.show = true
  }
}

const hideTooltip = () => {
  tooltipData.show = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 添加过渡样式 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>