import nextra from 'nextra'
import { remarkMermaid } from '@theguild/remark-mermaid'

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true, // 启用代码块复制按钮
  readingTime: true, // 启用阅读时间估算
  search: {
    codeblocks: true, // 启用代码块搜索
  },


  contentDirBasePath: '/docs',
  mdxOptions: {
    remarkPlugins: [
      [remarkMermaid, { strategy: 'img-svg' }]
    ]
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

export default withNextra(nextConfig)