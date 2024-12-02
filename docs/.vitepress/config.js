export default {
  title: 'BimGo Documentation',
  description: 'BimGo 项目文档',
  base: '/xian-bimgo/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '菜单', link: '/menu' },
      { text: '侧边栏', link: '/sidebar' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '菜单组件', link: '/menu' },
          { text: '侧边栏组件', link: '/sidebar' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/xian-bimgo' },
    ],
  },
}
