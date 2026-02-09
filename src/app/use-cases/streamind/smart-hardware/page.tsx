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

export default function SmartHardwarePage() {
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
          {/* 标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              background: isDark ? '#1e3a8a' : '#dbeafe',
              color: isDark ? '#93c5fd' : '#1e40af',
              padding: '8px 16px',
              borderRadius: theme.borderRadius.sm,
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '0.5px'
            }}
          >
            STREAMIND USE CASE
          </motion.div>

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
            基于 StreamInd 构建智能硬件
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
            From Data Stream to Cognitive Stream
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
            让嵌入式设备具备认知能力。5分钟接入云平台，轻量高效，适配 ESP32 系列等嵌入式平台。
            提供预编译 SDK，节省 3-5 分钟编译时间。
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
            <Button variant="primary" size="lg" href="/docs/SmartHardwarePlatform">
              了解更多
              <span>→</span>
            </Button>
          </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="bg-gray-50 dark:bg-gray-800/50" style={{
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
              为什么选择 StreamInd
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              专为 IoT 和嵌入式设备设计的认知增强框架
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

            {/* 2×2网格布局 (3个特性使用1x3布局) */}
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
                  title: '快速集成',
                  subtitle: 'Rapid Integration',
                  description: '预编译 SDK 节省 3-5 分钟编译时间，5 分钟内即可接入云平台，开箱即用的 ESP-IDF 组件支持',
                  highlight: '5分钟接入',
                  points: ['预编译 SDK', 'ESP-IDF 支持', '快速开发', '即插即用']
                },
                {
                  title: '轻量高效',
                  subtitle: 'Lightweight & Efficient',
                  description: '专为 ESP32 系列等嵌入式平台优化，支持 WebSocket 自动重连和 OPUS 音频流',
                  highlight: '嵌入式优化',
                  points: ['ESP32 优化', 'WebSocket', 'OPUS 音频', '低资源占用']
                },
                {
                  title: '认知增强',
                  subtitle: 'Cognitive Enhancement',
                  description: 'Signal-Directive 架构让设备具备认知能力，硬件适配器模式降低集成复杂度，支持异步任务管理',
                  highlight: 'AI赋能',
                  points: ['Signal 架构', '适配器模式', '异步管理', '认知能力']
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
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

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      {feature.subtitle}
                    </p>

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

      {/* 技术架构 */}
      <section className="bg-gray-50 dark:bg-gray-800/50" style={{
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
              技术架构
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              分层设计，清晰解耦
            </p>
          </motion.div>

          <div
            className="bg-white dark:bg-gray-800"
            style={{
              position: 'relative',
              borderRadius: '12px',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: isMobile ? '24px 20px' : '40px'
            }}>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {[
                {
                  layer: '云平台层',
                  subtitle: 'Cloud Platform',
                  description: 'WebSocket Server / 认知决策引擎'
                },
                {
                  layer: 'StreamInd SDK',
                  subtitle: 'SDK Core',
                  description: 'Signal 发送 / Directive 接收 / 能力注册'
                },
                {
                  layer: '硬件适配器层',
                  subtitle: 'Hardware Adapters',
                  description: '音频 / 显示 / 传感器 / 电机 / 舵机...'
                },
                {
                  layer: '物理硬件层',
                  subtitle: 'Physical Hardware',
                  description: 'ESP32-S3 / 外设驱动 / 传感器模块'
                }
              ].map((layer, index) => (
                <div
                  key={layer.layer}
                  className="bg-gray-50 dark:bg-gray-700/50"
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    border: `1px solid ${isDark ? '#444444' : '#E5E7EB'}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* 内部网格背景 */}
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

                  <div style={{
                    width: '4px',
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    borderRadius: '4px 0 0 4px',
                    zIndex: 1
                  }} />

                  <div style={{ paddingLeft: '16px', position: 'relative', zIndex: 1 }}>
                    <h4 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      {layer.layer}
                    </h4>
                    <div className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      {layer.subtitle}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400" style={{
                      fontSize: '14px'
                    }}>
                      {layer.description}
                    </p>
                  </div>

                  {index < 3 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-24px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: '#3b82f6',
                      fontSize: '20px',
                      zIndex: 2
                    }}>
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gray-100 dark:bg-gray-700/30" style={{
              marginTop: '32px',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${isDark ? '#444444' : '#E5E7EB'}`
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="text-blue-600 dark:text-blue-400" style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    ↑ Signal 上报
                  </div>
                  <div className="text-gray-600 dark:text-gray-400" style={{
                    fontSize: '12px'
                  }}>
                    事件 / 数据 / 状态
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="text-blue-600 dark:text-blue-400" style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '4px'
                  }}>
                    ↓ Directive 下发
                  </div>
                  <div className="text-gray-600 dark:text-gray-400" style={{
                    fontSize: '12px'
                  }}>
                    指令 / 控制 / 配置
                  </div>
                </div>
              </div>
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
              实战案例：星宝智能机器人
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              基于 ESP32-S3 的完整机器人控制系统
            </p>
          </motion.div>

          {/* 项目概述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            style={{
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.xl,
              marginBottom: '40px',
              boxShadow: theme.shadows.md
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
              gap: '32px',
              alignItems: 'center'
            }}>
              <div>
                <h3 className="text-gray-900 dark:text-gray-100" style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '16px'
                }}>
                  项目概述
                </h3>
                <p className="text-gray-600 dark:text-gray-400" style={{
                  fontSize: '15px',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}>
                  星宝是一个基于 ESP32-S3 的教育型智能机器人，集成了语音交互、麦克纳姆轮运动、表情显示、传感器融合等功能。
                  通过 StreamInd SDK，实现了 8 个硬件模块的快速集成和 20+ 控制指令的统一管理。
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  {[
                    { label: '8 个硬件适配器' },
                    { label: '20+ 控制指令' },
                    { label: '2663 行适配器代码' }
                  ].map(stat => (
                    <span
                      key={stat.label}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      style={{
                        fontSize: '13px',
                        padding: '6px 12px',
                        borderRadius: theme.borderRadius.sm,
                        fontWeight: 500
                      }}
                    >
                      {stat.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700" style={{
                borderRadius: theme.borderRadius.lg,
                padding: '40px',
                textAlign: 'center',
                border: `2px dashed ${isDark ? '#4b5563' : '#d1d5db'}`
              }}>
                <div className="text-gray-500 dark:text-gray-400" style={{
                  fontSize: '48px',
                  marginBottom: '8px'
                }}>
                  ◊
                </div>
                <div className="text-gray-600 dark:text-gray-400" style={{
                  fontSize: '14px'
                }}>
                  演示图片占位
                </div>
              </div>
            </div>
          </motion.div>

          {/* 技术亮点 */}
          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            style={{
              position: 'relative',
              border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`,
              overflow: 'hidden',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>

            {/* 3×2网格布局 */}
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
                  title: '麦克纳姆轮四向运动',
                  subtitle: 'Mecanum Wheel Control',
                  description: '实现前后、左右、斜向、原地旋转等全向运动能力',
                  highlight: '全向运动',
                  points: ['复杂运动算法', '时间-速度转换', '精确控制', '灵活移动']
                },
                {
                  title: '实时 TTS 音频处理',
                  subtitle: 'Real-time TTS Audio',
                  description: '接收云端 OPUS 音频流，实时解码播放',
                  highlight: 'OPUS 音频',
                  points: ['OPUS 解码', '异步队列管理', '实时播放', '低延迟']
                },
                {
                  title: 'ESP-NOW 多设备通信',
                  subtitle: 'ESP-NOW Communication',
                  description: '主板与摄像头板通过 ESP-NOW 协议无线通信',
                  highlight: '无线通信',
                  points: ['分片传输', '握手机制', '可靠传输', '低功耗']
                },
                {
                  title: '机器人表情系统',
                  subtitle: 'Expression System',
                  description: '14+ 种表情和运动模式，支持自动恢复',
                  highlight: '表情引擎',
                  points: ['表情引擎', '动画管理', '自动恢复', '14+ 模式']
                },
                {
                  title: '传感器融合',
                  subtitle: 'Sensor Fusion',
                  description: '超声波 + LD2410C 雷达双传感器融合',
                  highlight: '双传感器',
                  points: ['按需启动', '规则引擎', '数据融合', '精准检测']
                },
                {
                  title: '硬件适配器集成',
                  subtitle: 'Hardware Adapters',
                  description: '统一的硬件适配器架构，涵盖所有硬件模块',
                  highlight: '8个适配器',
                  points: ['统一接口', '易扩展', '模块化', '高复用']
                }
              ].map((highlight, index) => (
                <div
                  key={highlight.title}
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
                      {highlight.highlight}
                    </div>

                    <h4 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {highlight.title}
                    </h4>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '12px',
                      marginBottom: '16px'
                    }}>
                      {highlight.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {highlight.description}
                    </p>

                    {/* 功能特性 */}
                    <div>
                      {highlight.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="text-gray-700 dark:text-gray-300"
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            paddingLeft: '16px',
                            position: 'relative',
                            marginBottom: '8px'
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

          {/* GitHub链接 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '40px',
              textAlign: 'center'
            }}
          >
            <Button variant="outline" size="lg" href="/docs/SmartHardwarePlatform">
              了解更多
              <span>→</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SDK 快速预览 */}
      <section className="bg-gray-50 dark:bg-gray-800/50" style={{
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
              SDK 快速预览
            </h2>
            <p className="text-gray-600 dark:text-gray-400" style={{
              fontSize: '18px'
            }}>
              3 步完成集成
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

            {/* 装饰性渐变光晕 */}
            <div
              className="opacity-10 dark:opacity-5"
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
              }}
            />

            {/* 垂直排列的3个卡片 */}
            <div
              className="bg-gray-100/50 dark:bg-gray-700/30"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1px',
                position: 'relative',
                zIndex: 1
              }}>
              {[
                {
                  step: '01',
                  title: '配置 CMakeLists.txt',
                  subtitle: 'Configure Project',
                  description: '将 SDK 添加到项目依赖',
                  highlight: 'Step 1',
                  code: `idf_component_register(
  SRCS "main.cpp"
  INCLUDE_DIRS "."
  REQUIRES streamind_sdk
)`
                },
                {
                  step: '02',
                  title: '初始化 SDK',
                  subtitle: 'Initialize SDK',
                  description: '配置设备信息和 WebSocket 端点',
                  highlight: 'Step 2',
                  code: `#include <streamind.h>

auto& sdk = streamind::SDK::GetInstance();

streamind::Config config;
config.device_id = "my-device-001";
config.device_type = "robot";
config.endpoint = "ws://platform.com:8090/signals";

sdk.Initialize(config);
sdk.Connect();`
                },
                {
                  step: '03',
                  title: '注册硬件适配器',
                  subtitle: 'Register Hardware Adapters',
                  description: '注册您的硬件模块',
                  highlight: 'Step 3',
                  code: `auto& registry = sdk.GetRegistry();

// 注册音频适配器
streamind::RegisterHardwareAdapter<AudioStreamInd>(registry);

// 注册电机适配器
streamind::RegisterHardwareAdapter<MotorStreamInd>(registry);

// 完成初始化
sdk.InitializeCapabilities();`
                }
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white dark:bg-gray-800"
                  style={{
                    position: 'relative',
                    padding: isMobile ? '24px 20px' : '40px',
                    overflow: 'hidden',
                    border: `0.5px solid ${isDark ? '#444444' : '#E5E7EB'}`
                  }}>

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
                    {item.step}
                  </div>

                  {/* 点阵动画装饰 */}
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '70px',
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
                          borderRadius: '50%',
                          background: '#3b82f6',
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
                      border: '1px solid #3b82f6',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '16px'
                    }}>
                      {item.highlight}
                    </div>

                    <h3 className="text-gray-900 dark:text-gray-100" style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      lineHeight: 1.3
                    }}>
                      {item.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400" style={{
                      fontSize: '13px',
                      marginBottom: '16px'
                    }}>
                      {item.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300" style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      marginBottom: '24px'
                    }}>
                      {item.description}
                    </p>

                    {/* 代码块 */}
                    <pre className="text-gray-800 dark:text-gray-200" style={{
                      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.03)',
                      padding: '16px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      fontFamily: 'Monaco, Consolas, monospace',
                      border: `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
                    }}>
                      {item.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '40px',
              textAlign: 'center'
            }}
          >
            <Button variant="primary" size="lg" href="/docs/SmartHardwarePlatform">
              查看完整文档
              <span>→</span>
            </Button>
          </motion.div>
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
              下载 StreamInd SDK，5 分钟接入云平台
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button variant="primary" size="lg" href="/docs/SmartHardwarePlatform">
                查看文档
                <span>→</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
