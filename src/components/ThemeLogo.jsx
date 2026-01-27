'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // 避免 hydration 不匹配，返回占位符
  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: 24, height: 24 }} />
        <b>SceneMesh</b>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Image
        src={resolvedTheme === 'dark'
          ? '/images/smlogo-up-white.webp'
          : '/images/smlogo-up-black.webp'
        }
        alt="SceneMesh Logo"
        width={24}
        height={24}
        style={{ flexShrink: 0 }}
        priority
      />
      <b>SceneMesh</b>
    </div>
  )
}
