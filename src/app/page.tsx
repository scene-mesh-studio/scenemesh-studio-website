'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// 动态导入3D组件避免SSR问题
const SpaceWarpAnimation = dynamic(() => 
  import('../components/SpaceWarpAnimation').then(mod => ({ default: mod.SpaceWarpAnimation })), 
  { ssr: false }
)

// 客户端渲染检测Hook
const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

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

// 专业图标组件 (不使用emoji)
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  return (
    <div className={className} style={{ 
      width: '24px', 
      height: '24px', 
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${theme.colors.blue[500]}, ${theme.colors.purple[500]})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%', 
        background: theme.colors.neutral[0] 
      }} />
    </div>
  )
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

// 精简的卡片组件
const Card: React.FC<{
  children: React.ReactNode
  className?: string
  hover?: boolean
}> = ({ children, className = '', hover = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: theme.shadows.xl } : {}}
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${className}`}
      style={{
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing['2xl'],
        boxShadow: theme.shadows.sm,
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </motion.div>
  )
}



// 工作室产品展示组件 - 简洁网格设计
const StudioProducts: React.FC<{ isDark: boolean; isMobile: boolean }> = ({ isDark, isMobile }) => {
  const products = [
    {
      id: 'scenemesh',
      title: 'Stremind',
      description: '专业的事件驱动开发平台，原生集成 AI 能力。通过我们的综合 SDK 和现代化架构，构建可扩展的智能应用程序。',
      features: [
        '实时事件处理引擎',
        '原生 AI 模块集成', 
        '云原生可扩展架构',
        '直观的开发者 API 和 SDK'
      ],
      color: '#3b82f6',
      shape: 'circle'
    },
    {
      id: 'entity-engine', 
      title: 'Entity Engine',
      description: '先进的类型安全数据建模引擎，具备智能模式生成能力。将复杂的数据结构转换为可查询实体，自动处理关系映射和数据验证。',
      features: [
        'AI 驱动的智能数据建模',
        '类型安全的高级查询引擎',
        '实时数据同步',
        '企业级扩展性和性能'
      ],
      color: '#8b5cf6',
      shape: 'triangle'
    }
  ]

  return (
    <div 
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      style={{
        position: 'relative',
        border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto'
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
      
      {/* 2列网格布局 */}
      <div 
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1,
          minHeight: isMobile ? 'auto' : '520px'
        }}>
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800"
            style={{
              position: 'relative',
              minHeight: isMobile ? 'auto' : '480px',
              padding: isMobile ? '24px 20px' : '32px',
              overflow: 'hidden',
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
            
            {/* 产品序号装饰 */}
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

            {/* 点阵动画装饰 */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              width: index === 0 ? '140px' : '120px',
              height: index === 0 ? '90px' : '100px',
              display: 'grid',
              gridTemplateColumns: index === 0 ? 'repeat(12, 1fr)' : 'repeat(10, 1fr)',
              gridTemplateRows: index === 0 ? 'repeat(7, 1fr)' : 'repeat(10, 1fr)',
              gap: '2px'
            }}>
              {Array.from({ length: index === 0 ? 84 : 100 }, (_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: index === 0 ? 2 : 2.5,
                    delay: i * 0.015,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: product.shape === 'circle' ? '50%' : '0px',
                    background: product.color,
                    clipPath: product.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* 产品内容 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 className="text-gray-900 dark:text-gray-100" style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                lineHeight: 1.3
              }}>
                {product.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300" style={{
                fontSize: '14px',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                {product.description}
              </p>

              {/* 功能特性 */}
              <div style={{ marginBottom: '32px' }}>
                {product.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="text-gray-700 dark:text-gray-300"
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      paddingLeft: '16px',
                      position: 'relative',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      width: '4px',
                      height: '4px',
                      borderRadius: product.shape === 'circle' ? '50%' : '0px',
                      background: product.color,
                      transform: 'translateY(-50%)',
                      clipPath: product.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                    }} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* 了解更多按钮 */}
              <Button
                variant="outline"
                size="md"
                style={{
                  borderColor: product.color
                }}
              >
                了解更多
                <span style={{ fontSize: '12px' }}>→</span>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 统计数据展示组件
const StatsSection = () => {
  const stats = [
    { label: '开发者', value: '2,500+' },
    { label: '项目', value: '1,200+' },
    { label: '国家和地区', value: '45+' },
    { label: '贡献者', value: '150+' }
  ]
  
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: theme.spacing.lg,
      marginTop: theme.spacing['3xl']
    }}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            textAlign: 'center',
            padding: theme.spacing.lg
          }}
        >
          <div 
            className="text-blue-600 dark:text-blue-400"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '4px'
            }}>
            {stat.value}
          </div>
          <div 
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontSize: '14px',
              fontWeight: 500
            }}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// 工作室理念展示组件
const StudioPhilosophyGrid = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  const philosophies = [
    {
      title: '原生AI能力',
      description: '我们相信AI应该成为应用场景的原生能力，而非外挂式的附加工具'
    },
    {
      title: '开源驱动创新',
      description: '通过开源生态的力量，让技术创新惠及更广泛的开发者社区'
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
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      style={{
        position: 'relative',
        border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
        overflow: 'hidden'
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
      
      {/* 6模块非对称网格布局 */}
      <div 
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1.2fr 1.3fr',
          gridTemplateRows: isMobile ? 'repeat(6, auto)' : '1fr 1fr 0.8fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1,
          minHeight: isMobile ? 'auto' : '580px'
        }}>
        {philosophies.map((philosophy, index) => {
          // 重新设计6个模块的布局
          const getGridConfig = (index: number) => {
            if (isMobile) {
              // 移动端：所有模块都使用相同配置
              return { gridRow: 'span 1', gridColumn: 'span 1', isLarge: false, isWide: false }
            }
            
            // PC端：保持原有布局
            switch(index) {
              case 0: // 原生AI能力 - 左侧大块，跨两行
                return { gridRow: 'span 2', isLarge: true }
              case 1: // 开源驱动创新 - 右上角
                return { gridRow: 'span 1', isLarge: false }
              case 2: // 业务价值导向 - 右上中
                return { gridRow: 'span 1', isLarge: false }
              case 3: // 生态共建 - 右中左
                return { gridRow: 'span 1', isLarge: false }
              case 4: // 产品驱动 - 右中右
                return { gridRow: 'span 1', isLarge: false }
              case 5: // 持续演进 - 整个底部区域，跨三列
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
      const isDarkMode = document.documentElement.classList.contains('dark') || 
                        window.matchMedia('(prefers-color-scheme: dark)').matches
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
      className="bg-white dark:bg-gray-900"
      style={{ 
        minHeight: '100vh'
      }}>
      {/* Hero Section with 3D Background */}
      <section 
        style={{
          position: 'relative',
          paddingTop: '120px',
          paddingBottom: '0px',
          paddingLeft: '24px',
          paddingRight: '24px',
          minHeight: '60vh',
          overflow: 'hidden'
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-sm bg-white/10 dark:bg-white/10 text-gray-900 dark:text-white"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '14px',
              marginBottom: '40px',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: '#10b981',
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
            }} />
            开源 & Apache License 2.0
          </motion.div>

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-600 dark:text-blue-400"
            style={{
              fontSize: 'clamp(56px, 8vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '32px',
              letterSpacing: '-0.03em'
            }}
          >
            SceneMesh Studio
          </motion.h1>

          {/* 副标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white"
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: '24px',
              letterSpacing: '-0.01em'
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
              maxWidth: '700px',
              margin: '0 auto 48px'
            }}
          >
            我们相信AI应该成为应用场景的原生能力，而非附加工具。
            让AI真正服务于业务价值的创造。
          </motion.p>

          {/* CTA按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.location.href = '/docs'}
            >
              开始构建
              <span style={{ marginLeft: '8px' }}>→</span>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => window.open('https://github.com/scene-mesh-studio', '_blank')}
            >
              <span style={{ marginRight: '8px' }}>⭐</span>
              GitHub
            </Button>
          </motion.div>

        </div>
      </section>

      {/* 工作室理念展示 */}
      <section 
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '80px 24px',
          position: 'relative'
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
              我们的理念
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
              工作室产品
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              构建现代软件应用所需的一切工具
            </motion.p>
          </div>

          <div style={{ marginBottom: '64px' }}>
            <StudioProducts isDark={isDark} isMobile={isMobile} />
          </div>

        </div>
      </section>


      {/* Footer */}
      <footer 
        className="bg-white dark:bg-gray-900"
        style={{
          position: 'relative',
          padding: '60px 24px 40px'
        }}>
        
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
          pointerEvents: 'none'
        }} />

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* 四列布局 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gridTemplateRows: isMobile ? 'auto auto' : 'auto',
            gap: isMobile ? '32px' : '48px',
            marginBottom: isMobile ? '32px' : '48px'
          }}>

            {/* 品牌与愿景 - 左侧第一列 */}
            <div style={{ 
              textAlign: 'center',
              gridColumn: isMobile ? '1' : 'auto',
              gridRow: isMobile ? '1' : 'auto'
            }}>
              <div 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image 
                  src="/images/smlogo-1.webp" 
                  alt="SceneMesh Studio Logo" 
                  width={200} 
                  height={200}
                  style={{ flexShrink: 0 }}
                />
              </div>
            </div>
            
            {/* 其他三列容器 - 移动端并排显示 */}
            <div style={{
              gridColumn: isMobile ? '1' : '2 / 5',
              gridRow: isMobile ? '2' : 'auto',
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '16px' : '48px',
              textAlign: isMobile ? 'center' : 'left'
            }}>
            
            {/* 快速导航 */}
            <div>
              <h3 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                快速导航
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: '产品展示', href: '#products' },
                  { name: '开源项目', href: 'https://github.com/scene-mesh-studio' },
                  { name: '解决方案', href: '/solutions' },
                  { name: '定价方案', href: '/pricing' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                  >
                    • {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 资源与支持 */}
            <div>
              <h3 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                资源与支持
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: '开发文档', href: '/docs' },
                  { name: 'API文档', href: '/docs/api' },
                  { name: '社区论坛', href: '/community' },
                  { name: '技术博客', href: '/blog' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                  >
                    • {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 关注我们 */}
            <div>
              <h3 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                关注我们
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'GitHub', href: 'https://github.com/scene-mesh-studio' },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                  >
                    • {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            </div>
          </div>

          {/* 底部版权信息 */}
          <div 
            className="border-t border-gray-200 dark:border-gray-600"
            style={{
              paddingTop: '32px',
              textAlign: 'center'
            }}>
            <div 
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontSize: '14px'
              }}>
              © 2025 SceneMesh Studio 基于Apache License 2.0开源
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}