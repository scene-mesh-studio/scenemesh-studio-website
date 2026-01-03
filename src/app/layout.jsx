/* eslint-env node */
import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { Search, Head } from 'nextra/components'
import ThemeLogo from '../components/ThemeLogo'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s - SceneMesh Studio',
    default: 'SceneMesh Studio'
  },
  description: '现代开发平台，提供事件驱动架构和智能数据建模引擎',
  applicationName: 'SceneMesh Studio',
  generator: 'Next.js',
  appleWebApp: {
    title: 'SceneMesh Studio'
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: {
      url: '/favicon-32x32.png',
      sizes: '32x32'
    }
  },
  other: {
    'msapplication-TileColor': '#2563eb'
  }
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  
  const navbar = (
    <Navbar
      logo={<ThemeLogo />}
      projectLink="https://github.com/scene-mesh-studio"
    >
      <ThemeSwitch />
    </Navbar>
  )
  
  return (
    <html lang="zh-CN" dir="ltr" suppressHydrationWarning>
      <Head
        backgroundColor={{ light: '#fafafa', dark: '#111111' }}
        color={{
          hue: { dark: 220, light: 210 },
          saturation: { dark: 95, light: 90 }
        }}
      />
      <body>
        <Layout
          navbar={navbar}
          footer={false}
          editLink="在 GitHub 上编辑此页面"
          docsRepositoryBase="https://github.com/scenemesh/studio"
          feedback={{
            content: "有问题？给我们反馈",
            labels: "documentation,feedback"
          }}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true,
            toggleButton: true
          }}
          themeSwitch={{ dark: '深色', light: '浅色', system: '跟随系统' }}
          search={
            <Search
              placeholder="搜索文档..."
              emptyResult="没有找到相关内容"
              loading="搜索中..."
              errorText="搜索出错"
            />
          }
          navigation={{
            prev: true,
            next: true
          }}
          toc={{
            backToTop: "回到顶部",
            title: "页面目录",
            float: true
          }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}