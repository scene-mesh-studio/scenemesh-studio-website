const meta = {
  index: {
    display: 'hidden'
  },
  product: {
    display: 'hidden'
  },
  'use-cases': {
    display: 'hidden'
  },
  entityengine_moduel: {
    display: 'hidden'
  },

  // 1. 智能硬件AI应用平台（一级菜单）
  'smart-hardware-platform': {
    type: 'page',
    title: '智能硬件AI应用平台',
    href: '/product/smart-hardware-platform'
  },

  // 2. Streamind
  streamind: {
    type: 'page',
    title: 'Streamind Agent',
    href: '/product/streamind'
  },

  // 3. 开源框架
  'open-source': {
    type: 'menu',
    title: '开源框架',
    items: {
      'entity-engine': {
        title: 'Entity Engine 框架',
        href: '/product/entityengine'
      },
      'ai-module': {
        title: 'Entity Engine AI 模块',
        href: '/entityengine_moduel/aimoduel'
      },
      'studio-module': {
        title: 'Entity Engine Studio',
        href: '/entityengine_moduel/studiomoduel'
      }
    }
  },

  // 4. 文档
  docs: {
    type: 'page',
    title: '文档'
  }
}
export default meta
