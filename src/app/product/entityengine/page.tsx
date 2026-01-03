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
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = ''
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
        gap: '8px'
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

// 数据流程可视化展示
const DataFlowDemo = ({ isDark }: { isDark: boolean }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const mounted = useIsMounted()
  
  const steps = [
    { name: '模型定义', desc: '声明式配置实体模型', active: false },
    { name: '视图生成', desc: '自动推导UI组件', active: false },
    { name: '数据交互', desc: 'tRPC API自动生成', active: false },
    { name: '业务应用', desc: '完整的数据管理系统', active: false }
  ]

  useEffect(() => {
    if (!mounted) return
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [mounted, steps.length])

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '400px',
        background: theme.colors.neutral[100],
        borderRadius: theme.borderRadius.xl,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} className="bg-gray-100 dark:bg-gray-800">
        <div className="text-gray-500 dark:text-gray-400">数据建模流程演示</div>
      </div>
    )
  }

  return (
    <div style={{
      background: isDark ? '#111827' : '#ffffff',
      padding: theme.spacing['3xl'],
      position: 'relative',
      overflow: 'hidden',
      border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
    }} className="bg-white dark:bg-gray-900">
      {/* 网格背景 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: isDark ? 0.08 : 0.06,
        backgroundImage: `
          linear-gradient(to right, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
          linear-gradient(to bottom, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        pointerEvents: 'none'
      }} />
      {/* 标题 */}
      <div style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'], position: 'relative', zIndex: 1 }}>
        <h3 className="text-gray-900 dark:text-gray-100" style={{
          fontSize: '20px',
          fontWeight: 600,
          marginBottom: '8px'
        }}>从配置到应用的完整流程</h3>
        <p className="text-gray-600 dark:text-gray-300" style={{
          fontSize: '14px'
        }}>元数据驱动的开发体验</p>
      </div>

      {/* 流程步骤 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginBottom: theme.spacing.xl,
        zIndex: 1
      }}>
        {/* 连接线 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '60px',
          right: '60px',
          height: '2px',
          background: theme.colors.neutral[300],
          zIndex: 1
        }} className="bg-gray-300 dark:bg-gray-600" />
        
        {steps.map((step, index) => {
          const isActive = index <= currentStep
          return (
            <motion.div
              key={step.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                position: 'relative'
              }}
              animate={{
                scale: index === currentStep ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {/* 步骤圆圈 */}
              <motion.div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  background: 'transparent',
                  border: isActive ? '1px solid #8b5cf6' : `1px solid ${theme.colors.neutral[300]}`,
                  color: isActive ? '#8b5cf6' : theme.colors.neutral[500]
                }}
                animate={{
                  border: isActive ? '1px solid #8b5cf6' : `1px solid ${theme.colors.neutral[300]}`,
                  color: isActive ? '#8b5cf6' : theme.colors.neutral[500],
                  boxShadow: index === currentStep ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none'
                }}
              >
                {index + 1}
              </motion.div>
              
              {/* 步骤信息 */}
              <div style={{ textAlign: 'center', maxWidth: '120px' }}>
                <div className="text-gray-900 dark:text-gray-100" style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '4px'
                }}>
                  {step.name}
                </div>
                <div className="text-gray-600 dark:text-gray-300" style={{
                  fontSize: '10px',
                  lineHeight: 1.3
                }}>
                  {step.desc}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 当前步骤详细信息 */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: isDark ? 'rgba(55, 65, 81, 0.95)' : 'rgba(255, 255, 255, 0.9)',
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`
        }}
        className="bg-white/90 dark:bg-gray-800/90"
      >
        <div className="text-blue-600 dark:text-blue-400" style={{
          fontSize: '16px',
          fontWeight: 600
        }}>
          {steps[currentStep]?.name}
        </div>
      </motion.div>
    </div>
  )
}

// 核心特性展示 - 网格卡片布局（首页风格）
const CoreFeatures = ({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) => {
  const features = [
    {
      title: '元数据驱动架构',
      description: '使用 IEntityModel + IEntityView 描述领域与 UI 形态，减少硬编码。视图缺省字段、Widget、顺序等由 FieldTyper 与模型自动推导，实现配置大于编码的开发理念。',
      highlight: '配置 > 编码',
      points: ['模型自动推导UI', '字段类型自动补全', 'TypeScript + zod 类型安全'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '多视图统一渲染',
      description: '内置 form / grid / master-detail / shell / kanban / dashboard 六种视图类型，通过统一的视图管线渲染不同 UI 形态，满足90%的业务场景需求。',
      highlight: '6种内置视图',
      points: ['表单自动生成', '网格数据展示', '主从详情视图', '看板拖拽管理'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '插槽式扩展系统',
      description: '通过命名渲染器 (Named Renderer) 在壳层 / 工具栏 / 行内插入自定义区域，支持非侵入式的组件扩展和业务逻辑注入。',
      highlight: '插槽 + 渲染器',
      points: ['命名插槽系统', 'View Inspector 调试', 'Studio Launcher 可视化'],
      color: '#8b5cf6',
      shape: 'triangle'
    },
    {
      title: '引用关系统一管理',
      description: '基于引用表抽象支持一对多、多对多、树形结构、反向查询、计数统计。内置 ReferenceEditMMComp 管理复杂的多对多关系编辑。',
      highlight: '关系 + 树形',
      points: ['多对多关系编辑', '树形递归查询', '引用计数统计', '关系图可视化'],
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

// 代码示例展示
const CodeExamples = () => {
  const examples = [
    {
      title: '模型定义',
      description: '类型安全的实体模型定义',
      code: `const UserModel: IEntityModel = {
  name: 'User',
  fields: {
    id: { type: 'uuid', primary: true },
    name: { type: 'string', required: true },
    email: { type: 'email', unique: true },
    status: { type: 'enum', options: ['active', 'inactive'] },
    createdAt: { type: 'datetime', auto: true }
  },
  relations: {
    profile: { type: 'one-to-one', target: 'UserProfile' },
    posts: { type: 'one-to-many', target: 'Post' }
  }
}`
    },
    {
      title: '视图配置',
      description: '声明式视图配置，自动生成UI',
      code: `const UserFormView: IEntityView = {
  name: 'UserForm',
  type: 'form',
  model: 'User',
  layout: {
    sections: [
      {
        title: '基本信息',
        fields: ['name', 'email', 'status']
      },
      {
        title: '关联数据',
        fields: ['profile', 'posts']
      }
    ]
  },
  validation: UserFormSchema
}`
    }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: theme.spacing.xl
    }}>
      {examples.map((example, index) => (
        <div
          key={example.title}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          style={{
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden'
          }}
        >
          <div style={{
            padding: theme.spacing.xl,
            borderBottom: '1px solid var(--nextra-border)'
          }}>
            <h4 
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '4px'
              }}>
              {example.title}
            </h4>
            <p 
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '14px'
              }}>
              {example.description}
            </p>
          </div>
          <div 
            className="bg-gray-50 dark:bg-gray-900/80"
            style={{
              padding: theme.spacing.lg,
              fontSize: '12px',
              fontFamily: 'var(--font-mono, Consolas, Monaco, monospace)',
              lineHeight: 1.5,
              overflow: 'auto'
            }}
          >
            <pre className="text-gray-800 dark:text-gray-200">
              <code>{example.code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  )
}

// 使用场景展示
const UseCases = () => {
  const cases = [
    {
      title: '中后台管理系统',
      description: '快速构建数据密集型的管理界面，支持复杂的业务逻辑和数据关系',
      features: ['用户权限管理', '数据报表展示', '工作流配置', '系统设置管理']
    },
    {
      title: '数据工作台',
      description: '为业务用户提供灵活的数据查看、编辑和分析能力，无需编程知识',
      features: ['可视化数据编辑', '自定义查询', '数据导入导出', '实时协作']
    },
    {
      title: '低代码平台',
      description: '作为低代码平台的数据和视图引擎，支持拖拽式界面构建',
      features: ['可视化建模', '组件库扩展', '模板市场', 'API自动生成']
    },
    {
      title: 'AI辅助应用',
      description: '结合AI模块提供智能化的数据处理和业务分析能力',
      features: ['智能数据填充', '自动化规则生成', '异常检测', '预测分析']
    }
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: theme.spacing.xl
    }}>
      {cases.map((useCase, index) => (
        <motion.div
          key={useCase.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          style={{
            padding: theme.spacing['2xl'],
            borderRadius: theme.borderRadius.lg,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* 渐变装饰 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${'#8b5cf6'}, transparent)`
          }} />
          
          <h4 
            className="text-gray-900 dark:text-gray-100"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '12px'
            }}>
            {useCase.title}
          </h4>
          <p 
            className="text-gray-600 dark:text-gray-300"
            style={{
              fontSize: '14px',
              lineHeight: 1.5,
              marginBottom: theme.spacing.lg
            }}>
            {useCase.description}
          </p>
          
          <div style={{
            display: 'grid',
            gap: theme.spacing.sm
          }}>
            {useCase.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="text-gray-700 dark:text-gray-300"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  fontSize: '13px'
                }}
              >
                <div style={{
                  width: '4px',
                  height: '4px',
                  border: '1px solid #8b5cf6',
                  background: 'transparent'
                }} />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// 主页面组件  
export default function EntityEnginePage(): React.JSX.Element {
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
                  Entity Engine
                </h1>

                {/* 副标题 */}
                <h2
                  className="text-blue-600 dark:text-blue-400"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}
                >
                  智能数据建模引擎
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
                  元数据驱动的实体引擎，通过配置驱动、运行补全、插槽扩展的设计理念，
                  帮助你快速构建复杂的数据管理界面。
                </p>

                {/* CTA按钮 */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button variant="outline" size="md" onClick={() => window.location.href = '/docs/EntityEngine'}>
                    快速开始
                    <span style={{ marginLeft: '6px' }}>→</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="md" 
                    onClick={() => window.open('https://github.com/scene-mesh-studio/entity-engine', '_blank')}
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
                  { title: '元数据驱动', desc: '配置化开发' },
                  { title: '运行时补全', desc: '智能推导' },
                  { title: '插槽扩展', desc: '灵活定制' },
                  { title: '多视图内置', desc: '6种视图' },
                  { title: '引用关系', desc: '统一管理' },
                  { title: '模块化', desc: '按需加载' }
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

      {/* 数据流程演示 */}
      <section
        className="bg-gray-50 dark:bg-gray-900"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              工作原理
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              简单四步，从数据模型到完整应用
            </p>
          </div>

          <DataFlowDemo isDark={isDark} />
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
              为什么选择 Entity Engine
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              强大的元数据驱动架构，让数据建模变得简单高效
            </p>
          </div>

          <CoreFeatures isDark={isDark} isMobile={isMobile} />
        </div>
      </section>

      {/* 代码示例与使用场景并排展示 */}
      <section
        className="bg-gray-50 dark:bg-gray-800"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
        }}>
        
        {/* 微妙的网格背景 */}
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
          backgroundSize: '24px 24px'
        }} />
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2
              className="text-gray-900 dark:text-gray-100"
              style={{
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              开发体验与应用场景
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              极简的代码，强大的功能，适用于各种业务场景
            </p>
          </div>

          {/* 网格卡片布局 - 代码示例和使用场景 */}
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
                zIndex: 1
              }}>

              {/* 代码示例卡片 */}
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
                  01
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="text-gray-900 dark:text-gray-100" style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '24px',
                    lineHeight: 1.2
                  }}>
                    声明式开发
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300" style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    marginBottom: '32px'
                  }}>
                    通过简单的配置文件定义数据模型和视图，自动生成完整的CRUD界面
                  </p>

                  <div 
                    className="bg-gray-50 dark:bg-gray-900/80"
                    style={{
                      borderRadius: '8px',
                      padding: '20px',
                      marginBottom: '24px',
                      border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`
                    }}>
                    <div style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono, Consolas, Monaco, monospace)',
                      lineHeight: 1.5
                    }}>
                      <pre className="text-gray-800 dark:text-gray-200">
                        <code>{`const UserModel: IEntityModel = {
  name: 'User',
  fields: [
    { name: 'id', type: 'uuid', primary: true },
    { name: 'name', type: 'string', required: true },
    { name: 'email', type: 'email', unique: true }
  ]
}

// 自动生成表单、表格、详情页面`}</code>
                      </pre>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {['类型安全', '自动推导', '热重载'].map((tag, index) => (
                      <span
                        key={tag}
                        style={{
                          padding: '4px 12px',
                          background: 'transparent',
                          color: 'inherit',
                          border: '1px solid #8b5cf6',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 600
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 使用场景卡片 */}
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
                
                {/* 序号装饰 */}
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
                  02
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="text-gray-900 dark:text-gray-100" style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    marginBottom: '24px',
                    lineHeight: 1.2
                  }}>
                    适用场景
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300" style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    marginBottom: '32px'
                  }}>
                    适合构建各种数据密集型应用，从企业管理到低代码平台
                  </p>

                  <div>
                    {[
                      { title: '企业管理系统', desc: 'CRM、ERP、OA等企业级应用' },
                      { title: '数据分析平台', desc: '灵活的数据查询和可视化' },
                      { title: '内容管理系统', desc: '支持复杂内容结构的CMS' },
                      { title: '低代码平台', desc: '作为数据建模引擎核心'  }
                    ].map((useCase, index) => (
                      <div
                        key={useCase.title}
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
                        <div>
                          <div className="text-gray-900 dark:text-gray-100" style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            marginBottom: '2px'
                          }}>
                            {useCase.title}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300" style={{
                            fontSize: '13px',
                            lineHeight: 1.4
                          }}>
                            {useCase.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700"
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
            开始构建您的数据应用
          </h2>
          <p
            className="text-white/90"
            style={{
              fontSize: '18px',
              marginBottom: '40px'
            }}
          >
            立即体验 Entity Engine 的强大功能，几分钟内构建复杂的数据管理系统
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
              onClick={() => window.location.href = '/docs/entityengine/getting-started'}
            >
              快速开始
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