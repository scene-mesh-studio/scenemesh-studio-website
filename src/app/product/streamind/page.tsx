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
        gap: '8px'
      }}
    >
      {children}
    </motion.button>
  )
}

// Signal-Decision 架构流程演示
const SignalFlowDemo = ({ isDark }: { isDark: boolean }) => {
  const steps = [
    {
      name: '多维信号提取',
      subtitle: 'Multi-Signal Extraction',
      desc: '关键词信号 DFA正则(μs级) · 嵌入信号 BGE-M3向量化 · 领域信号 DistilBERT分类',
      color: '#3b82f6'
    },
    {
      name: '智能决策引擎',
      subtitle: 'Decision Engine',
      desc: '缓存命中 → <50ms返回 · 简单任务 → 边缘小模型 · 复杂任务 → 云端大模型',
      color: '#3b82f6'
    },
    {
      name: '插件链处理',
      subtitle: 'Plugin Chain',
      desc: '前置: PII脱敏+注入防御 · 后置: 格式强制+幻觉校验',
      color: '#3b82f6'
    },
    {
      name: '执行与反馈',
      subtitle: 'Action & Learning',
      desc: 'Webhook | 数据库 | Agent · 持续优化路由策略',
      color: '#3b82f6'
    }
  ]

  return (
    <div>
      {/* 标题 */}
      <div style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
        <h3 className="text-gray-900 dark:text-gray-100" style={{
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '12px'
        }}>Signal-Decision 驱动架构</h3>
        <p className="text-gray-600 dark:text-gray-400" style={{
          fontSize: '16px'
        }}>颠覆传统 Prompt-Response 模式的架构创新</p>
      </div>

      {/* 流程步骤 - 网格卡片布局 */}
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
            background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div
          className="bg-gray-100/50 dark:bg-gray-700/30"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            position: 'relative',
            zIndex: 1
          }}>
          {steps.map((step, index) => (
            <div
              key={step.name}
              className="bg-white dark:bg-gray-800"
              style={{
                position: 'relative',
                padding: theme.spacing.xl,
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
                <h4 className="text-gray-900 dark:text-gray-100" style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '6px',
                  lineHeight: 1.3
                }}>
                  {step.name}
                </h4>

                <div className="text-gray-500 dark:text-gray-400" style={{
                  fontSize: '13px',
                  marginBottom: theme.spacing.md,
                  fontWeight: 500
                }}>
                  {step.subtitle}
                </div>

                <p className="text-gray-600 dark:text-gray-300" style={{
                  fontSize: '13px',
                  lineHeight: 1.7
                }}>
                  {step.desc}
                </p>
              </div>

              {/* 箭头连接 */}
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  zIndex: 2
                }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 主页面组件
export default function StreamindPage(): React.JSX.Element {
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
        className="bg-white dark:bg-gray-900"
        style={{
          paddingTop: '40px',
          paddingBottom: '60px',
          paddingLeft: '24px',
          paddingRight: '24px',
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center'
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
          backgroundSize: '40px 40px',
          zIndex: 1
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* 网格容器 */}
          <div
            style={{
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>

            {/* 装饰性蓝色渐变光晕 */}
            <div
              className="opacity-15 dark:opacity-8"
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
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
                {/* 产品名称标签 */}
                <div style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: isDark ? '#1e3a8a' : '#dbeafe',
                  color: isDark ? '#93c5fd' : '#1e40af',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '20px',
                  width: 'fit-content',
                  letterSpacing: '0.5px'
                }}>
                  STREAMIND
                </div>

                {/* 主标题 */}
                <h1
                  className="text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: isMobile ? '32px' : '42px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    marginBottom: '16px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  让你的数据在流动中思考，在实时中进化
                </h1>

                {/* 副标题 */}
                <h2
                  className="text-blue-600 dark:text-blue-400"
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    marginBottom: '24px'
                  }}
                >
                  重构实时智能的架构范式
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
                  Streamind 是首个认知流计算平台。我们将大模型的理解能力注入毫秒级的流数据管道，化“流”为“智”。
                  使得生成式 AI 真正变成了可以处理专业任务、实时任务的“智能生产力工具”。
                </p>

                {/* CTA按钮 */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button variant="outline" size="md" onClick={() => window.location.href = '/docs/Streamind'}>
                    立即构建认知流（每日100信号免费）
                    <span style={{ marginLeft: '6px' }}>→</span>
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
                  { title: '毫秒级响应', desc: '语义信号决策' },
                  { title: '信号-决策', desc: '驱动架构' },
                  { title: '按价值付费', desc: '信号计费模式' },
                  { title: '无缝集成', desc: 'Kafka/Webhooks' },
                  { title: '混合路由', desc: '分层推理' },
                  { title: '企业安全', desc: '插件防护' }
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
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

      {/* 实时AI的"不可能三角" */}
      <section
        className="bg-white dark:bg-gray-900"
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
              为什么传统的 AI 架构无法应对实时业务？
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              实时AI的&ldquo;不可能三角&rdquo;：延迟、成本与复杂度的三重困境
            </p>
          </div>

          {/* 网格卡片布局 */}
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
                background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div
              className="bg-gray-100/50 dark:bg-gray-700/30"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1px',
                position: 'relative',
                zIndex: 1
              }}>
              {[
                {
                  title: '速度与深度的矛盾',
                  subtitle: 'The Latency Paradox',
                  highlight: '1000倍延迟鸿沟',
                  description: '流处理要求微秒级响应，而大模型推理需要秒级等待。直接对接导致系统吞吐量崩塌。'
                },
                {
                  title: '不可持续的成本',
                  subtitle: 'The Cost Barrier',
                  highlight: '31%重复浪费',
                  description: '对海量原始数据进行Token化计费是昂贵的浪费。高达31%的请求是重复的，却依然在为每一次推理付费。'
                },
                {
                  title: '集成泥潭',
                  subtitle: 'Integration Complexity',
                  highlight: '集成困难',
                  description: '拼凑向量库、消息队列和模型API产生的"胶水代码"，让系统脆弱且难以维护。'
                }
              ].map((problem, index) => (
                <div
                  key={problem.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: theme.spacing['2xl'],
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
                    {/* Highlight标签 */}
                    <div style={{
                      display: 'inline-block',
                      background: 'transparent',
                      color: 'inherit',
                      border: '1px solid #3b82f6',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '16px'
                    }}>
                      {problem.highlight}
                    </div>

                    <h3 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}>
                      {problem.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}>
                      {problem.subtitle}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300" style={{
                      fontSize: '13px',
                      lineHeight: 1.6
                    }}>
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signal-Decision 架构 */}
      <section
        className="bg-white dark:bg-gray-900"
        style={{
          padding: '0px 24px 80px',
          position: 'relative',
          backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SignalFlowDemo isDark={isDark} />
        </div>
      </section>

      {/* 核心特性 - 2×2网格 */}
      <section
        className="bg-white dark:bg-gray-900"
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
              重新定义流计算标准
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              通过技术细节建立信任，展示具体优势
            </p>
          </div>

          {/* 2×2网格卡片布局 */}
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
                background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div
              className="bg-gray-100/50 dark:bg-gray-700/30"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '1px',
                position: 'relative',
                zIndex: 1
              }}>
              {[
                {
                  title: '语义缓存',
                  subtitle: 'Semantic Caching',
                  highlight: '理解"含义"而非"字面"',
                  description: '对重复意图实现 <50ms 的瞬时响应，成本降低 80%',
                  points: ['向量相似度模糊匹配', '<50ms 瞬时响应', '命中率自适应优化', '成本降低80%']
                },
                {
                  title: '认知防火墙',
                  subtitle: 'Cognitive Firewall',
                  highlight: '企业级数据安全',
                  description: '内置 PII 脱敏与提示词注入防御插件，确保企业级数据安全',
                  points: ['PII自动脱敏', 'Jailbreak防御', '审计日志完整']
                },
                {
                  title: '协议无关',
                  subtitle: 'Protocol Agnostic',
                  highlight: '统一接入，统一认知',
                  description: '无论是 Kafka 数据流还是 HTTP 请求，统一接入，统一认知',
                  points: ['HTTP/gRPC/MQTT', 'Webhook推送', '协议自动转换']
                },
                {
                  title: '混合智能路由',
                  subtitle: 'Hybrid Routing',
                  highlight: '平衡精度与成本',
                  description: '自动将任务分发给本地小模型 (SLM) 或云端大模型 (LLM)',
                  points: ['平均延迟降低47%', '准确率提升10%']
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: theme.spacing['2xl'],
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
                    {/* Highlight标签 */}
                    <div style={{
                      display: 'inline-block',
                      background: 'transparent',
                      color: 'inherit',
                      border: '1px solid #3b82f6',
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
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {feature.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}>
                      {feature.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {feature.description}
                    </p>

                    {/* 功能特性列表 */}
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
                            borderRadius: '50%',
                            background: '#3b82f6',
                            transform: 'translateY(-50%)'
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
        </div>
      </section>

      {/* 平台核心优势 - 简洁卡片布局 */}
      <section
        className="bg-white dark:bg-gray-900"
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
              平台核心优势
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              毫秒及完成感知     实时增强型AI接入动态变换数据，让 AI 掌握“此时此刻”发生的资料
            </p>
          </div>

          {/* 网格卡片布局 */}
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
                background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div
              className="bg-gray-100/50 dark:bg-gray-700/30"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1px',
                position: 'relative',
                zIndex: 1
              }}>
              {[
                {
                  title: '极致性价比',
                  subtitle: '降低存储与计算负担',
                  highlight: '延迟降低47%',
                  metrics: [
                    { label: '平均延迟降低', value: '47%' },
                    { label: '准确率提升', value: '10%' },
                    { label: '简单意图响应', value: '<50ms' }
                  ]
                },
                {
                  title: '认知经济性',
                  subtitle: '让智能变得可负担',
                  highlight: '成本削减66%',
                  metrics: [
                    { label: '成本削减', value: '66%' },
                    { label: '缓存命中率', value: '40-80%' }
                  ]
                },
                {
                  title: '架构统一',
                  subtitle: '开箱即用的认知总线',
                  highlight: '零学习成本',
                  metrics: [
                    { label: '多协议接入', value: '统一处理' },
                    { label: '学习成本', value: '零' }
                  ]
                }
              ].map((advantage, index) => (
                <div
                  key={advantage.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: theme.spacing['2xl'],
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
                    {/* Highlight标签 */}
                    <div style={{
                      display: 'inline-block',
                      background: 'transparent',
                      color: 'inherit',
                      border: '1px solid #3b82f6',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '16px'
                    }}>
                      {advantage.highlight}
                    </div>

                    <h3 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}>
                      {advantage.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      marginBottom: theme.spacing.lg
                    }}>
                      {advantage.subtitle}
                    </p>

                    <div style={{ display: 'grid', gap: theme.spacing.sm }}>
                      {advantage.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                          borderRadius: '6px'
                        }}>
                          <span className="text-gray-700 dark:text-gray-300" style={{ fontSize: '13px' }}>
                            {metric.label}
                          </span>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono, monospace)',
                            color: '#3b82f6'
                          }}>
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 典型场景深度解析 */}
      <section
        className="bg-white dark:bg-gray-900"
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
              典型场景领域
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              捕捉瞬时价值  实现在线进化
              极强时效性的场景数据，一旦错过，价值就会归零 
            </p>
          </div>

          {/* 网格卡片布局 */}
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
                background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 30%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <div
              className="bg-gray-100/50 dark:bg-gray-700/30"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '1px',
                position: 'relative',
                zIndex: 1
              }}>
              {[
                {
                  title: '智能硬件与IoT',
                  subtitle: 'IoT 中枢',
                  description: '在边缘网关实现毫秒级语音控制，仅将复杂分析上云。',
                  benefit: '隐私保护，带宽节省，零延迟体验'
                },
                {
                  title: '金融实时风控',
                  subtitle: 'Real-time Risk Control',
                  description: '实时向量化交易数据，识别异常模式并自动触发 Agent 调查。',
                  benefit: '降低误报率，实时阻断欺诈'
                },
                {
                  title: '企业情报与预警',
                  subtitle: 'Intelligence & Security',
                  description: '监控海量日志与市场信息，自动生成叙事性情报简报。',
                  benefit: '告别告警疲劳，自动化情报分析'
                }
              ].map((useCase, index) => (
                <div
                  key={useCase.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: theme.spacing['2xl'],
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
                    <h4
                      className="text-gray-900 dark:text-gray-100"
                      style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                      {useCase.title}
                    </h4>

                    <p
                      className="text-gray-600 dark:text-gray-300"
                      style={{
                        fontSize: '14px',
                        marginBottom: theme.spacing.lg
                      }}>
                      {useCase.subtitle}
                    </p>

                    <p
                      className="text-gray-700 dark:text-gray-300"
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.6,
                        marginBottom: theme.spacing.lg
                      }}>
                      {useCase.description}
                    </p>

                    <div style={{
                      padding: '12px',
                      background: 'rgba(59, 130, 246, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#3b82f6'
                      }}>
                        ✓ {useCase.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 集成生态 */}
      <section
        className="bg-white dark:bg-gray-900"
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
              融入您现有的技术栈
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: '18px'
              }}
            >
              原生集成，零重构成本
            </p>
          </div>

          {/* 统一的技术栈Logo墙 */}
          <div
            className="bg-white dark:bg-gray-800"
            style={{
              padding: theme.spacing['3xl'],
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
            }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
              gap: theme.spacing.xl
            }}>
              {['Kafka', 'Redpanda', 'PostgreSQL', 'Python', 'Node.js', 'Docker', 'Kubernetes', 'gRPC', 'MQTT', 'Webhooks', 'Redis', 'Pinecone'].map((tech) => (
                <div key={tech} style={{
                  padding: '20px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  cursor: 'default',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                }} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-blue-600 dark:bg-blue-700"
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
            准备好升级您的数据流了吗？
          </h2>
          <p
            className="text-white/90"
            style={{
              fontSize: '18px',
              marginBottom: '40px'
            }}
          >
            立即开始构建实时认知流应用，每月100信号免费
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
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/docs/Streamind'}
            >
              免费开始
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
              © 2025 SceneMesh Streamind
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
