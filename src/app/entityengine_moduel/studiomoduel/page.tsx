'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

// Studio SDK风格按钮组件
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
      title: '可视化模型编辑器',
      description: '通过直观的界面创建和编辑数据模型，拖拽式字段管理，支持复杂关系配置。无需编写代码，点击即可完成模型定义。',
      highlight: '拖拽建模',
      points: ['图形化字段编辑', '关系可视化配置', '实时字段验证', '模型结构预览'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '智能视图构建器',
      description: '强大的视图配置工具，支持表单、网格、详情等多种视图类型。智能布局建议，自动生成最佳用户界面。',
      highlight: '智能布局',
      points: ['多种视图类型', '自动布局优化', '组件智能推荐', '响应式设计'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '实时预览功能',
      description: '所见即所得的编辑体验，实时预览模型和视图效果。支持多设备预览，确保在不同屏幕尺寸下的最佳显示效果。',
      highlight: '所见即所得',
      points: ['实时效果预览', '多设备适配', '交互效果测试', '样式实时调整'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '配置导入导出',
      description: '完整的配置管理系统，支持模型和视图的导入导出。团队协作，版本控制，配置备份一键完成。',
      highlight: '团队协作',
      points: ['配置文件导出', '批量导入功能', '版本对比管理', '团队配置共享'],
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
      
      {/* 装饰性渐变光晕 - 右上角辐射 */}
      <div
        className="opacity-15 dark:opacity-8"
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* 2×2网格布局 */}
      <div
        className="bg-gray-100/50 dark:bg-gray-700/30"
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1px',
          position: 'relative',
          zIndex: 1
        }}>
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="bg-white dark:bg-gray-800"
            style={{
              position: 'relative',
              padding: isMobile ? '24px 20px' : '40px 40px 24px 40px',
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
              <div>
                {feature.points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="text-gray-700 dark:text-gray-300"
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      paddingLeft: '16px',
                      position: 'relative',
                      marginBottom: pointIndex < feature.points.length - 1 ? '10px' : '0'
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

// Studio能力对比展示
const StudioCapabilityDemo = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
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
      
      {/* 装饰性渐变光晕 - 右上角辐射 */}
      <div
        className="opacity-15 dark:opacity-8"
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 70%)',
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
          zIndex: 1
        }}>

        {/* 传统开发方式 */}
        <div
          className="bg-white dark:bg-gray-800"
          style={{
            position: 'relative',
            padding: isMobile ? '24px 20px' : '40px 40px 24px 40px',
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
              传统开发方式
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300" style={{
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              需要手动编写配置文件和代码
            </p>

            <div>
              {[
                '手动编写模型配置文件',
                '人工定义视图布局结构',
                '静态的配置管理方式',
                '需要编程技能才能修改'
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    paddingLeft: '16px',
                    position: 'relative',
                    marginBottom: index < 3 ? '16px' : '0'
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

        {/* Studio可视化方式 */}
        <div
          className="bg-white dark:bg-gray-800"
          style={{
            position: 'relative',
            padding: isMobile ? '24px 20px' : '40px 40px 24px 40px',
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
              可视化工作室
            </div>

            <h3 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              Studio可视化方式
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300" style={{
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>
              拖拽式界面，所见即所得的编辑体验
            </p>

            <div>
              {[
                '拖拽创建模型和字段',
                '可视化设计视图布局',
                '实时预览和效果调试',
                '无需编程，点击即可完成'
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    paddingLeft: '16px',
                    position: 'relative',
                    marginBottom: index < 3 ? '16px' : '0'
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
export default function StudioModulePage(): React.JSX.Element {
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
        minHeight: '100vh',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
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

            {/* 装饰性紫色渐变光晕 */}
            <div
              className="opacity-15 dark:opacity-8"
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

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
                {/* 开源标识 */}
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: isDark ? '#1e3a8a' : '#dbeafe',
                  color: isDark ? '#93c5fd' : '#1e40af',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  width: 'fit-content',
                  letterSpacing: '0.5px'
                }}>
                  🔓 Apache License 2.0
                </div>

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
                  Studio Module
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
                  Entity Engine的可视化配置工作室
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
                  通过直观的拖拽界面编辑数据模型和视图配置，无需编写代码即可构建完整的数据应用
                </p>

                {/* CTA按钮 */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => window.location.href = '/docs/EEStudioModuel/'}
                    style={{
                      borderColor: '#8b5cf6',
                      color: isDark ? '#c4b5fd' : '#8b5cf6'
                    }}
                  >
                    体验Studio
                    <span style={{ marginLeft: '6px' }}>→</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={() => window.open('https://github.com/scene-mesh-studio/entity-engine-studio', '_blank')}
                    style={{
                      color: isDark ? '#c4b5fd' : '#8b5cf6',
                      borderColor: isDark ? '#c4b5fd' : '#8b5cf6'
                    }}
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
                  { title: '可视化建模', desc: '拖拽式编辑' },
                  { title: '智能布局', desc: '自动优化' },
                  { title: '实时预览', desc: '所见即所得' },
                  { title: '团队协作', desc: '配置共享' },
                  { title: '无代码开发', desc: '降低门槛' },
                  { title: '弹框式工作室', desc: '集成体验' }
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

      {/* Studio能力对比展示 */}
      <section
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
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
              开发方式对比
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              从代码配置到可视化设计的革命性体验
            </p>
          </div>

          <StudioCapabilityDemo isDark={isDark} isMobile={isMobile} />
        </div>
      </section>

      {/* 核心特性展示 */}
      <section
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
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
              Studio核心能力
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              强大的可视化配置工具，让开发变得简单高效
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
            开始使用Studio工作室
          </h2>
          <p
            className="text-white/90"
            style={{
              fontSize: '18px',
              marginBottom: '40px'
            }}
          >
            体验可视化开发的强大功能，让数据建模和界面设计变得轻松简单
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
              onClick={() => window.location.href = '/docs/EEStudioModuel/'}
              style={{
                borderColor: '#8b5cf6',
                color: isDark ? '#ffffff' : '#000000'
              }}
            >
              开始使用Studio
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
          padding: '40px 24px 32px',
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

          {/* 底部版权信息 */}
          <div
            style={{
              paddingTop: '0px',
              textAlign: 'center'
            }}>
            <div
              className="text-gray-500 dark:text-gray-400"
              style={{
                fontSize: '14px'
              }}>
              © 2025 SceneMesh Entity Engine • 基于Apache License 2.0开源
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}