'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none'
      },
      secondary: {
        backgroundColor: '#ffffff',
        color: '#111827',
        border: '2px solid #d1d5db'
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'inherit',
        border: '1px solid currentColor'
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'inherit',
        border: '1px solid #8b5cf6'
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

// 核心特性展示 - 网格卡片布局（首页风格）
const CoreFeatures = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  const features = [
    {
      title: '智能对话式数据操作',
      description: '用自然语言直接操作Entity Engine，像与专家对话一样查询数据、分析结果。AI理解你的意图，自动转换为精确的数据操作。',
      highlight: '对话即操作',
      points: ['自然语言查询数据', 'AI理解业务术语', '实时对话式交互', '智能意图识别'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: 'AI驱动的业务理解',
      description: 'AI深度学习你的业务模式和数据结构，主动识别数据趋势、异常和优化机会，提供智能业务洞察和建议。',
      highlight: '智能业务洞察',
      points: ['自动业务模式识别', 'AI数据趋势分析', '异常检测告警', '智能优化建议'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '自适应界面生成',
      description: 'AI根据用户行为、数据特征和业务场景，自动生成最适合的界面布局和交互方式，持续优化用户体验。',
      highlight: '智能界面优化',
      points: ['AI生成最佳界面', '用户行为学习', '动态布局调整', '个性化体验'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '预测性数据建议',
      description: 'AI预判用户需求，提前准备相关数据和操作建议。智能填充表单、预测数据输入，让数据操作更加高效智能。',
      highlight: '预测式助手',
      points: ['智能表单填充', '数据输入预测', '操作路径建议', '需求预判系统'],
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
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
      
      {/* 装饰性渐变光晕 */}
      <div 
        className="opacity-10 dark:opacity-5"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} 
      />
      
      {/* 2×2网格布局 */}
      <div 
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gridTemplateRows: isMobile ? 'repeat(4, auto)' : '1fr 1fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1,
          minHeight: isMobile ? 'auto' : '800px'
        }}>
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="bg-white dark:bg-gray-800"
            style={{
              position: 'relative',
              minHeight: isMobile ? 'auto' : '400px',
              padding: isMobile ? '24px 20px' : '40px',
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
              className="bg-purple-500 text-white"
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
              width: '120px',
              height: '80px',
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gridTemplateRows: 'repeat(6, 1fr)',
              gap: '2px'
            }}>
              {Array.from({ length: 60 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: feature.shape === 'circle' ? '50%' : '0px',
                    background: feature.color,
                    clipPath: feature.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                    opacity: 0.4
                  }}
                />
              ))}
            </div>

            {/* 产品内容 */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                background: 'transparent',
                color: 'inherit',
                border: `1px solid ${feature.color}`,
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                {feature.highlight}
              </div>

              <h3 className="text-gray-900 dark:text-gray-100" style={{
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '16px',
                lineHeight: 1.3
              }}>
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300" style={{
                fontSize: '14px',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                {feature.description}
              </p>

              {/* 功能特性 */}
              <div style={{ marginBottom: '32px' }}>
                {feature.points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
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
                      borderRadius: feature.shape === 'circle' ? '50%' : '0px',
                      background: feature.color,
                      transform: 'translateY(-50%)',
                      clipPath: feature.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                    }} />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 智能对比展示
const AIEnhancementDemo = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  return (
    <div 
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
      style={{
        position: 'relative',
        border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
        overflow: 'hidden',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
      
      {/* 装饰性渐变光晕 */}
      <div 
        className="opacity-10 dark:opacity-5"
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} 
      />
      
      {/* 1×2网格布局 */}
      <div 
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1,
          minHeight: isMobile ? 'auto' : '600px'
        }}>
        
        {/* 传统Entity Engine */}
        <div
          className="bg-white dark:bg-gray-800"
          style={{
            position: 'relative',
            padding: isMobile ? '24px 20px' : '40px',
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
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              传统方式
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300" style={{
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              需要手动配置和编写查询语句
            </p>

            <div style={{ marginBottom: '24px' }}>
              {[
                '手动编写复杂查询语句',
                '人工设计表单字段',
                '静态的数据展示界面',
                '需要编程技能操作数据'
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    paddingLeft: '16px',
                    position: 'relative',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '4px',
                    height: '4px',
                    background: '#6b7280',
                    borderRadius: '50%'
                  }} />
                  <div className="text-gray-700 dark:text-gray-300" style={{
                    fontSize: '14px',
                    lineHeight: 1.4
                  }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI增强的Entity Engine */}
        <div
          className="bg-white dark:bg-gray-800"
          style={{
            position: 'relative',
            padding: isMobile ? '24px 20px' : '40px',
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
          
          {/* 点阵装饰 */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '100px',
            height: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: '2px'
          }}>
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: '4px',
                  background: '#8b5cf6',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  opacity: 0.4
                }}
              />
            ))}
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'inherit',
              border: '1px solid #8b5cf6',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              AI原生能力
            </div>

            <h3 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              AI增强方式
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300" style={{
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              自然语言直接操作，AI理解你的意图
            </p>

            <div style={{ marginBottom: '24px' }}>
              {[
                '自然语言问数据，秒出结果',
                'AI自动生成最佳表单',
                '智能化数据洞察和建议',
                '像与专家对话一样操作'
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    paddingLeft: '16px',
                    position: 'relative',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '4px',
                    height: '4px',
                    background: '#8b5cf6',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }} />
                  <div className="text-gray-700 dark:text-gray-300" style={{
                    fontSize: '14px',
                    lineHeight: 1.4
                  }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 主页面组件  
export default function AIModulePage(): React.JSX.Element {
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
      {/* Hero Section - 网格化设计 */}
      <section 
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        style={{
          paddingTop: '60px',
          paddingBottom: '40px',
          paddingLeft: '24px',
          paddingRight: '24px',
          position: 'relative'
        }}>
        
        {/* 背景网格 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(to right, ${isDark ? '#555555' : '#cccccc'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? '#555555' : '#cccccc'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* 网格容器 */}
          <div 
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            style={{
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>
            
            {/* 内部网格背景 */}
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
              backgroundSize: '20px 20px',
              pointerEvents: 'none'
            }} />
            
            {/* 两列网格布局 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              minHeight: isMobile ? 'auto' : '400px',
              position: 'relative'
            }}>
              
              {/* 左侧：标题和描述 */}
              <div style={{
                padding: isMobile ? '32px 24px' : '48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: isMobile ? 'none' : `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`
              }}>
                {/* 主标题 */}
                <h1
                  className="text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginBottom: '16px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  AI Module
                </h1>

                {/* 副标题 */}
                <h2
                  className="text-purple-600 dark:text-purple-400"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}
                >
                  Entity Engine的原生AI能力
                </h2>
                
                {/* 描述 */}
                <p
                  className="text-gray-600 dark:text-gray-300"
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    marginBottom: '32px'
                  }}
                >
                  让Entity Engine具备AI原生能力 - 用自然语言操作数据，让框架理解你的业务意图
                </p>

                {/* CTA按钮 */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button 
                    variant="outline" 
                    size="md" 
                    onClick={() => window.location.href = '/docs/entityengine/ai-module'}
                    style={{ borderColor: '#8b5cf6' }}
                  >
                    体验AI能力
                    <span style={{ marginLeft: '6px' }}>→</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="md" 
                    onClick={() => window.open('https://github.com/scene-mesh-studio/entity-engine-aimodule', '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
              </div>

              {/* 右侧：特性网格 */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
                gridTemplateRows: isMobile ? 'repeat(3, auto)' : '1fr 1fr 1fr'
              }}>
                {[
                  { title: 'AI原生能力', desc: '深度集成AI' },
                  { title: '智能推理', desc: '理解业务逻辑' },
                  { title: '对话交互', desc: '自然语言操作' },
                  { title: '智能界面', desc: 'AI生成UI' },
                  { title: '语义理解', desc: '业务上下文' },
                  { title: 'AI增强', desc: '全方位智能化' }
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-gray-50 dark:bg-gray-700/30"
                    style={{
                      padding: isMobile ? '16px 12px' : '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      borderBottom: index < 4 ? `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}` : 'none',
                      borderRight: index % 2 === 0 ? `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}` : 'none'
                    }}
                  >
                    <div
                      className="text-gray-900 dark:text-gray-100"
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        marginBottom: '4px'
                      }}
                    >
                      {feature.title}
                    </div>
                    <div
                      className="text-gray-500 dark:text-gray-400"
                      style={{
                        fontSize: '12px'
                      }}
                    >
                      {feature.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI能力对比展示 */}
      <section 
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '80px 24px',
          position: 'relative'
        }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              体验升级对比
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              从数据框架进化为AI智能平台
            </p>
          </div>

          <AIEnhancementDemo isDark={isDark} isMobile={isMobile} />
        </div>
      </section>

      {/* 核心特性展示 */}
      <section 
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '80px 24px',
          position: 'relative'
        }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              AI能为你做什么
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              强大的AI原生能力，让数据操作变得智能高效
            </p>
          </div>

          <CoreFeatures isDark={isDark} isMobile={isMobile} />
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800"
        style={{
          padding: '80px 24px',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            className="text-white"
            style={{
              fontSize: '36px',
              fontWeight: 700,
              marginBottom: '16px'
            }}
          >
            体验AI原生的Entity Engine
          </h2>
          <p
            className="text-white/90"
            style={{
              fontSize: '18px',
              marginBottom: '40px'
            }}
          >
            让AI成为你的数据操作助手，体验前所未有的智能化数据管理
          </p>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.location.href = '/docs/entityengine/ai-module/getting-started'}
              style={{
                borderColor: '#8b5cf6',
                color: '#ffffff'
              }}
            >
              开始体验AI能力
              <span style={{ marginLeft: '8px' }}>→</span>
            </Button>
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
                  { name: 'AI能力', href: '#features' },
                  { name: 'AI模块文档', href: '/docs/entityengine/ai-module' },
                  { name: 'Entity Engine', href: '/product/entityengine' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
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

            {/* AI技术栈 */}
            <div>
              <h3 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                AI技术栈
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'AI模型适配', href: '/docs/entityengine/ai-module/models' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                  >
                    • {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 支持与社区 */}
            <div>
              <h3 
                className="text-gray-900 dark:text-gray-100"
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px'
                }}>
                支持与社区
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: '问题反馈', href: 'https://github.com/scene-mesh-studio/entity-engine-aimodule/issues' },
                  { name: '更新日志', href: 'https://github.com/scene-mesh-studio/entity-engine-aimodule/releases' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
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
              © 2025 SceneMesh Studio
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}