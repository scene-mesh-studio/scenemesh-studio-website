'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// 动态导入3D组件避免SSR问题
const SpaceWarpAnimation = dynamic(() =>
  import('../components/SpaceWarpAnimation').then(mod => ({ default: mod.SpaceWarpAnimation })),
  { ssr: false }
)

// 移动端检测Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// 响应Nextra主题的配色系统
const theme = {
  colors: {
    neutral: {
      0: 'rgb(var(--nextra-bg))',
      50: 'hsl(var(--nextra-primary-hue) 5% 98%)',
      100: 'hsl(var(--nextra-primary-hue) 5% 96%)',
      200: 'hsl(var(--nextra-primary-hue) 10% 90%)',
      300: 'hsl(var(--nextra-primary-hue) 10% 83%)',
      400: 'hsl(var(--nextra-primary-hue) 8% 64%)',
      500: 'hsl(var(--nextra-primary-hue) 8% 45%)',
      600: 'hsl(var(--nextra-primary-hue) 8% 32%)',
      700: 'hsl(var(--nextra-primary-hue) 8% 25%)',
      800: 'hsl(var(--nextra-primary-hue) 8% 15%)',
      900: 'hsl(var(--nextra-primary-hue) 8% 9%)',
      950: 'hsl(var(--nextra-primary-hue) 8% 4%)'
    },
    blue: {
      50: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) 96%)',
      200: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) 87%)',
      300: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) 78%)',
      400: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) 69%)', 
      500: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) var(--nextra-primary-lightness))',
      600: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) calc(var(--nextra-primary-lightness) - 6%))',
      700: 'hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) calc(var(--nextra-primary-lightness) - 13%))'
    },
    purple: {
      500: '#8b5cf6',
      600: '#7c3aed'
    },
    green: {
      50: '#ecfdf5',
      200: '#bbf7d0',
      300: '#86efac',
      500: '#10b981',
      600: '#059669',
      700: '#047857'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem', 
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
}

// AI SDK风格按钮组件
const Button: React.FC<{
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = '',
  style = {}
}) => {
  const sizes = {
    sm: { padding: '6px 12px', fontSize: '14px' },
    md: { padding: '8px 16px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '16px' }
  }
  
  const getVariantStyles = () => {
    const variants = {
      primary: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        border: 'none'
      },
      secondary: {
        backgroundColor: '#ffffff',
        color: '#000000',
        border: '1px solid #e5e7eb'
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'inherit',
        border: '1px solid currentColor'
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'inherit',
        border: '1px solid #3b82f6'
      }
    }
    return variants[variant]
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={className}
      style={{
        ...sizes[size],
        ...getVariantStyles(),
        borderRadius: theme.borderRadius.md,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        ...style
      }}
    >
      {children}
    </motion.button>
  )
}



// AI 智能硬件应用场景展示组件
const AIHardwareScenes: React.FC<{ isDark: boolean; isMobile: boolean }> = ({ isDark, isMobile }) => {
  const scenes = [
    {
      id: 'desktop-robot',
      title: 'AI 桌面机器人',
      description: '桌面陪伴、日程提醒、智能问答',
      color: '#3b82f6'
    },
    {
      id: 'smart-toy',
      title: 'AI 智能玩具',
      description: '互动对话、情感陪伴、寓教于乐',
      color: '#8b5cf6'
    },
    {
      id: 'smart-glasses',
      title: 'AI 智能眼镜',
      description: '实时翻译、场景识别、语音助手',
      color: '#10b981'
    },
    {
      id: 'companion-pet',
      title: 'AI 陪伴宠物',
      description: '情感交互、动作响应、成长记录',
      color: '#f59e0b'
    },
    {
      id: 'home-hub',
      title: 'AI 家居中控',
      description: '语音控制、场景联动、设备管理',
      color: '#ef4444'
    },
    {
      id: 'edu-device',
      title: 'AI 教育硬件',
      description: '智能辅导、互动学习、知识问答',
      color: '#06b6d4'
    }
  ]

  return (
    <div
      className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900"
      style={{
        position: 'relative',
        border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
        background: isDark ? undefined : 'linear-gradient(to bottom right, rgb(248, 248, 247), rgb(249, 250, 251))'
      }}>

      {/* 2×3 网格布局 */}
      <div 
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1px',
          position: 'relative',
          zIndex: 1
        }}>
        {scenes.map((scene, index) => (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 cursor-pointer"
            style={{
              position: 'relative',
              padding: isMobile ? '28px 24px' : '40px',
              overflow: 'hidden',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              minHeight: isMobile ? 'auto' : '200px'
            }}
          >
            {/* 微妙的内部网格 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.04,
              backgroundImage: `
                linear-gradient(to right, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
                linear-gradient(to bottom, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)
              `,
              backgroundSize: '16px 16px'
            }} />

            {/* 右上角渐变光晕 */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '150%',
                height: '150%',
                background: `radial-gradient(circle at top right, ${scene.color}25 0%, ${scene.color}15 25%, ${scene.color}08 50%, transparent 70%)`,
                pointerEvents: 'none'
              }}
            />

            {/* 序号装饰 - 无背景色 */}
            <div 
              className="text-gray-300 dark:text-gray-600"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '12px',
                fontWeight: 600
              }}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* 场景内容 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 className="text-gray-900 dark:text-gray-100" style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                lineHeight: 1.3
              }}>
                {scene.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400" style={{
                fontSize: '14px',
                lineHeight: 1.5
              }}>
                {scene.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部 CTA */}
      <div style={{
        padding: '32px',
        textAlign: 'center',
        borderTop: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`
      }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.location.href = '/product/smart-hardware-platform/'}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: '#ffffff',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          立即开始构建
          <span>→</span>
        </motion.button>
      </div>
    </div>
  )
}

// 工作室理念展示组件
const StudioPhilosophyGrid = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  const philosophies = [
    {
      title: '原生AI能力',
      description: 'AI应该成为应用场景的原生能力，而非外挂式的附加工具'
    },
    {
      title: '业务价值导向',
      description: '技术创新必须服务于真实的业务价值创造，而非为了技术而技术'
    },
    {
      title: '生态共建',
      description: '构建可持续发展的开发者生态，让每个参与者都能获得成长'
    },
    {
      title: '产品驱动',
      description: '以高质量产品为载体，将理念转化为可触达的解决方案和工具'
    },
    {
      title: '持续演进',
      description: '保持对新技术的敏感度，持续迭代和改进我们的产品与服务'
    }
  ]
  
  return (
    <div
      className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900"
      style={{
        position: 'relative',
        border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
        overflow: 'hidden',
        background: isDark ? undefined : 'linear-gradient(to bottom right, rgb(248, 248, 247), rgb(249, 250, 251))'
      }}>
      
      {/* 装饰性渐变光晕 */}
      <div 
        className="opacity-10 dark:opacity-5"
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} 
      />
      
      {/* 5模块非对称网格布局 */}
      <div
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1.2fr 1.3fr',
          gridTemplateRows: isMobile ? 'repeat(5, auto)' : '1fr 1fr 0.8fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1,
          minHeight: isMobile ? 'auto' : '580px'
        }}>
        {philosophies.map((philosophy, index) => {
          // 5个模块的布局配置
          const getGridConfig = (index: number) => {
            if (isMobile) {
              // 移动端：所有模块都使用相同配置
              return { gridRow: 'span 1', gridColumn: 'span 1', isLarge: false, isWide: false }
            }

            // PC端：5模块布局
            switch(index) {
              case 0: // 原生AI能力 - 左侧大块，跨两行
                return { gridRow: 'span 2', isLarge: true }
              case 1: // 业务价值导向 - 右上左
                return { gridRow: 'span 1', isLarge: false }
              case 2: // 生态共建 - 右上右
                return { gridRow: 'span 1', isLarge: false }
              case 3: // 产品驱动 - 右中，跨两列
                return { gridRow: 'span 1', gridColumn: 'span 2', isLarge: false }
              case 4: // 持续演进 - 整个底部区域，跨三列
                return { gridRow: 'span 1', gridColumn: 'span 3', isWide: true }
              default:
                return { gridRow: 'span 1', isLarge: false }
            }
          }
          
          const config = getGridConfig(index)
          
          return (
            <motion.div
              key={philosophy.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="bg-white dark:bg-gray-800"
              style={{
                padding: isMobile 
                  ? '24px 20px'
                  : config.isLarge ? '56px 48px' : config.isWide ? '40px 48px' : '40px 32px',
                position: 'relative',
                gridRow: config.gridRow,
                gridColumn: config.gridColumn || 'span 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`
              }}
            >
              {/* 微妙的内部网格 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.06,
                backgroundImage: `
                  linear-gradient(to right, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
                  linear-gradient(to bottom, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)
                `,
                backgroundSize: '12px 12px'
              }} />
              
              {/* 序号装饰 */}
              <div 
                className="bg-blue-500 text-white"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  opacity: 0.9
                }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 
                  className="text-black dark:text-white"
                  style={{
                    fontSize: config.isLarge ? '28px' : config.isWide ? '22px' : '18px',
                    fontWeight: 700,
                    marginBottom: config.isLarge ? '24px' : '16px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em'
                  }}>
                  {philosophy.title}
                </h3>
                
                <p 
                  className="text-gray-600 dark:text-gray-300"
                  style={{
                    fontSize: config.isLarge ? '18px' : config.isWide ? '16px' : '15px',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 400
                  }}>
                  {philosophy.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <style jsx>{`
        @keyframes gridShift {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
      `}</style>
    </div>
  )
}


// 主页面组件  
export default function HomePage(): React.JSX.Element {
  const [isDark, setIsDark] = useState(false)
  const isMobile = useIsMobile()
  
  useEffect(() => {
    // 检测主题变化
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }
    
    checkTheme()
    
    // 监听主题变化
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div
      className="dark:bg-gray-900"
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}>
      {/* Hero Section with 3D Background */}
      <section
        style={{
          position: 'relative',
          paddingTop: '120px',
          paddingBottom: '0px',
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: '45vh',
          overflow: 'hidden',
          background: 'transparent'
        }}
      >
        {/* 3D背景 */}
        <SpaceWarpAnimation isDark={isDark} />
        
        {/* Hero内容 */}
        <div 
          style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 dark:text-gray-100"
            style={{
              fontSize: 'clamp(56px, 8vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '48px',
              letterSpacing: '-0.03em'
            }}
          >
            SceneMesh
          </motion.h1>

          {/* 副标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: '36px',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            构建原生的AI应用场景
          </motion.h2>

          {/* 描述文字 */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-gray-100"
            style={{
              fontSize: '20px',
              lineHeight: 1.6,
              maxWidth: '1200px',
              margin: '0 auto 80px',
              whiteSpace: isMobile ? 'normal' : 'nowrap'
            }}
          >
            AI应该成为应用场景的原生能力，而非附加工具。让AI真正应用于业务价值创造。
          </motion.p>

        </div>
      </section>

      {/* 产品展示 */}
      <section style={{
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              构建你的 AI 智能硬件
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              5 分钟接入，让设备拥有认知能力
            </motion.p>
          </div>

          <AIHardwareScenes isDark={isDark} isMobile={isMobile} />

        </div>
      </section>

      {/* 工作室理念展示 */}
      <section
        className="dark:bg-gray-800"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              SceneMesh理念
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              致力于构建原生AI能力的开发生态，让技术创新真正服务于业务价值
            </motion.p>
          </div>

          <StudioPhilosophyGrid isDark={isDark} isMobile={isMobile} />
        </div>
      </section>


      {/* Footer */}
      <footer
        className="dark:bg-gray-900"
        style={{
          position: 'relative',
          padding: '24px 24px 20px',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)',
          overflow: 'hidden'
        }}>

        {/* 蓝色渐变 - 左上角向下辐射 */}
        <div
          className="opacity-20 dark:opacity-10"
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 20%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* 紫色渐变 - 右下角向上辐射 */}
        <div
          className="opacity-20 dark:opacity-10"
          style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.15) 20%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* 网格背景 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isDark ? 0.08 : 0.05,
          backgroundImage: `
            linear-gradient(to right, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>

          {/* Logo居中 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div
              className="text-gray-900 dark:text-gray-100"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                src={isDark ? "/images/smlogo-down-white.webp" : "/images/smlogo-down-black.webp"}
                alt="SceneMesh Logo"
                width={200}
                height={200}
                style={{ flexShrink: 0 }}
              />
            </div>
          </div>

          {/* 底部版权信息 */}
          <div
            className="border-t border-gray-200 dark:border-gray-600"
            style={{
              paddingTop: '12px',
              textAlign: 'center'
            }}>
            <div
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontSize: '14px'
              }}>
              © 2025 SceneMesh
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}