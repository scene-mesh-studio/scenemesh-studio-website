'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

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

// 主题配置
const theme = {
  colors: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8'
    },
    purple: {
      500: '#8b5cf6',
      600: '#7c3aed'
    },
    green: {
      500: '#10b981',
      600: '#059669'
    },
    orange: {
      500: '#f59e0b',
      600: '#d97706'
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
    xl: '16px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
  }
}

// Button组件
const Button: React.FC<{
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
}> = ({ children, variant = 'primary', size = 'md', onClick, href }) => {
  const sizes = {
    sm: { padding: '6px 12px', fontSize: '14px' },
    md: { padding: '10px 20px', fontSize: '15px' },
    lg: { padding: '12px 28px', fontSize: '16px' }
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

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        ...sizes[size],
        ...getVariantStyles(),
        borderRadius: theme.borderRadius.md,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      {children}
    </motion.button>
  )

  if (href) {
    return <Link href={href}>{buttonContent}</Link>
  }

  return buttonContent
}

export default function SmartHardwarePlatformPage() {
  const mounted = useIsMounted()
  const isMobile = useIsMobile()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className="nx-w-full bg-white dark:bg-gray-900"
      style={{
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}
    >
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900" style={{
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
          <div style={{
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

            {/* 内容区域 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm" style={{
              padding: isMobile ? '32px 24px' : '48px',
              position: 'relative',
              zIndex: 1
            }}>
          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-900 dark:text-gray-100"
            style={{
              fontSize: isMobile ? '36px' : '52px',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}
          >
            通用智能硬件AI应用平台
          </motion.h1>

          {/* 副标题 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-600 dark:text-blue-400"
            style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: 600,
              marginBottom: '20px'
            }}
          >
            让智能硬件拥有无限可能
          </motion.h2>

          {/* 描述 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400"
            style={{
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: 1.6,
              marginBottom: '40px',
              maxWidth: '800px'
            }}
          >
            硬件与智能分离，场景化动态响应，云端即时进化。基于 Streamind Agent 驱动。
          </motion.p>

          {/* CTA按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <Button variant="primary" size="lg" href="/docs/SmartHardwarePlatform/sdk/quick-start">
              立即体验
              <span>→</span>
            </Button>
          </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心特性 */}
      <section className="bg-white dark:bg-gray-900" style={{
        padding: '0px 24px 80px',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              让智能设备拥有自己的决策中枢
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              无限想象空间，突破传统硬编码限制
            </p>
          </motion.div>

          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{
              position: 'relative',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              overflow: 'hidden',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>

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
              {[
                {
                  title: '硬件与智能分离',
                  description: '硬件只需要暴露基础能力，Agent负责理解用户意图并调用相应能力。硬件不需要处理业务逻辑，只负责执行具体操作。',
                  highlight: '设备端只做驱动'
                },
                {
                  title: '场景化响应',
                  description: 'Agent理解当前环境，动态调整响应方式。同样一句"前进"，在开阔地带全速前进，在狭窄空间减速慢行，遇到障碍物自动绕行。',
                  highlight: '同样的话，不同场景不同应'
                },
                {
                  title: '动态进化',
                  description: '设备能力可以随时更新，不需要重新烧录。云端更新策略，设备立即获得新能力，无需触碰硬件即可持续优化。',
                  highlight: '不受硬件限制，一切都是动态的'
                },
                {
                  title: '极速响应',
                  description: '常见指令瞬时响应，像真人对话一样自然流畅，没有延迟感。',
                  highlight: '<50ms 响应'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: isMobile ? '20px 18px' : '32px',
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

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      marginBottom: '0'
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 工作原理 */}
      <section className="bg-white dark:bg-gray-900" style={{
        padding: '0px 24px 80px',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              动态规划
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              用户意图 → Agent 理解 → 硬件执行
            </p>
          </motion.div>

          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{
              position: 'relative',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              overflow: 'hidden',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>

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
              {[
                {
                  title: '用户输入',
                  subtitle: 'User Input',
                  description: '用自然语言表达需求，无需考虑具体实现细节',
                  example: '"小心点走，前面有障碍"'
                },
                {
                  title: 'Agent 理解',
                  subtitle: 'Streamind Agent',
                  description: '理解用户意图，分析当前场景，规划最优策略。一次性生成多个操作指令序列',
                  steps: '1. 扫描环境 → 2. 降低速度 → 3. 计算路径 → 4. 避开障碍 → 5. 恢复速度'
                },
                {
                  title: '多指令下发',
                  subtitle: 'Multiple Commands',
                  description: '一次性下发多个操作指令，硬件按顺序执行。不是预设程序，而是根据场景动态生成',
                  result: '超声波扫描 + 电机减速 + 路径规划 + 转向避障'
                },
                {
                  title: '硬件执行',
                  subtitle: 'Hardware Execution',
                  description: '硬件层执行具体操作，完成任务。每个细节都由 Agent 决策，实现真正的场景化响应',
                  highlight: '根据场景动态调整，无需预设'
                }
              ].map((step, index) => (
                <div
                  key={step.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: isMobile ? '20px 18px' : '32px',
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
                    <h3 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {step.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      {step.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      {step.description}
                    </p>

                    {/* 示例展示 */}
                    <div style={{
                      padding: '12px 16px',
                      background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#3b82f6',
                        marginBottom: '6px',
                        fontWeight: 600
                      }}>
                        {step.example ? '示例' : step.steps ? '指令序列' : step.result ? '执行结果' : '特点'}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300" style={{
                        fontSize: '13px',
                        lineHeight: 1.5
                      }}>
                        {step.example || step.steps || step.result || step.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 适用场景 */}
      <section className="bg-white dark:bg-gray-900" style={{
        padding: '0px 24px 80px',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              适用场景
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              广泛应用于各类智能硬件领域
            </p>
          </motion.div>

          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{
              position: 'relative',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              overflow: 'hidden',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>

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
              {[
                {
                  title: 'IoT 中枢设备',
                  subtitle: 'IoT Hub Devices',
                  description: '作为智能家居、工业物联网的核心控制节点，统一管理多种传感器和执行器',
                  highlight: '中枢控制',
                  points: ['传感器融合', '多设备管理', '实时控制', '边缘计算']
                },
                {
                  title: '智能机器人',
                  subtitle: 'Smart Robotics',
                  description: '教育机器人、服务机器人等场景，支持语音交互、运动控制、表情显示等综合功能',
                  highlight: '机器人平台',
                  points: ['语音交互', '运动控制', 'AI 集成', '多模态交互']
                },
                {
                  title: '智能家居控制器',
                  subtitle: 'Smart Home Controller',
                  description: '连接各类智能设备，提供统一的语音控制和自动化场景配置',
                  highlight: '家居智能',
                  points: ['语音控制', '场景联动', '设备互联', '自动化']
                },
                {
                  title: '边缘计算节点',
                  subtitle: 'Edge Computing Node',
                  description: '在网络边缘进行数据预处理和实时决策，降低云端压力和延迟',
                  highlight: '边缘智能',
                  points: ['边缘 AI', '实时处理', '低延迟', '本地决策']
                }
              ].map((useCase, index) => (
                <div
                  key={useCase.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: isMobile ? '20px 18px' : '32px',
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
                      border: '1px solid #3b82f6',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '16px'
                    }}>
                      {useCase.highlight}
                    </div>

                    <h3 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {useCase.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      {useCase.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {useCase.description}
                    </p>

                    {/* 功能特性 */}
                    <div>
                      {useCase.points.map((point, pointIndex) => (
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

      {/* 实战案例：星宝智能机器人 */}
      <section className="bg-white dark:bg-gray-900" style={{
        padding: '0px 24px 80px',
        backgroundColor: isDark ? undefined : 'rgb(248, 248, 247)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              星宝智能机器人
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              让机器人理解场景，做出智能决策
            </p>
          </motion.div>

          {/* 星宝智能机器人 */}
          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{
              position: 'relative',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              overflow: 'hidden',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>

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
              {[
                {
                  title: '自然语言对话',
                  subtitle: 'Natural Language Dialogue',
                  description: '你可以说"小心点走，前面有障碍"，星宝会理解并减速、扫描障碍物、规划路径，而不是死板地执行预设的"前进"指令。',
                  example: '"小心点走，前面有障碍" → 减速 + 扫描 + 绕行'
                },
                {
                  title: '场景化运动',
                  subtitle: 'Context-Aware Movement',
                  description: '在开阔地带全速前进，在狭窄空间减速慢行，遇到障碍物自动绕行。星宝根据环境动态调整运动策略。',
                  example: '开阔地带 → 全速 | 狭窄空间 → 减速 | 遇到障碍 → 绕行'
                },
                {
                  title: '情感表达',
                  subtitle: 'Emotional Expression',
                  description: '星宝有14种表情模式。当你和它说话时，它会显示"开心"；当它遇到困难时，会显示"思考"；完成任务后，会显示"自豪"。',
                  example: '对话时 → 开心 | 困难时 → 思考 | 完成后 → 自豪'
                },
                {
                  title: '感知环境',
                  subtitle: 'Environment Awareness',
                  description: '通过超声波和雷达双传感器，星宝能够感知周围环境。当检测到有人靠近时，它会主动打招呼；发现障碍物时，会自动避障。',
                  example: '有人靠近 → 打招呼 | 发现障碍 → 自动避障'
                }
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: isMobile ? '20px 18px' : '32px',
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

                  {/* 内容 */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h4 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      marginBottom: '6px',
                      lineHeight: 1.3
                    }}>
                      {item.title}
                    </h4>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '12px',
                      marginBottom: '16px'
                    }}>
                      {item.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      {item.description}
                    </p>

                    {/* 示例 */}
                    <div style={{
                      padding: '12px 16px',
                      background: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#3b82f6',
                        marginBottom: '6px',
                        fontWeight: 600
                      }}>
                        实际表现
                      </div>
                      <div className="text-gray-700 dark:text-gray-300" style={{
                        fontSize: '13px',
                        lineHeight: 1.5
                      }}>
                        {item.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA 区段 */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 40px',
        background: isDark
          ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        borderTop: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(0, 0, 0, 0.05)'}`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-gray-900 dark:text-gray-100" style={{
              fontSize: isMobile ? '32px' : '42px',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              立即开始构建您的智能硬件
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              下载 SDK，5 分钟接入，让设备拥有无限可能
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button variant="primary" size="lg" href="https://github.com/streamind/sdk">
                下载 SDK
              </Button>
              <Button variant="outline" size="lg" href="/docs/SmartHardwarePlatform/sdk">
                查看 API 文档
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
