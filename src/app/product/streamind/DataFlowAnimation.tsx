import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 信号类型
type SignalType = 'cache' | 'small-model' | 'large-model'

interface ParticleMetadata {
  signalType: SignalType
  targetColor: [number, number, number]
  laneIndex: number // 0=上车道(缓存), 1=中车道(小模型), 2=下车道(大模型)
  activationTriggered: boolean // 是否已触发点亮效果
  activationTime: number // 点亮触发的时间戳
  activationX: number // 点亮时的X位置
  activationY: number // 点亮时的Y位置
  activationZ: number // 点亮时的Z位置
  shouldGlow: boolean // 是否应该显示光晕（只有部分粒子显示）
}

// 主粒子组件
function CognitiveFlowParticles({
  isDark,
  particlesRef,
  metadata
}: {
  isDark: boolean
  particlesRef: React.RefObject<THREE.Points>
  metadata: ParticleMetadata[]
}) {
  const particleCount = metadata.length

  // 初始化粒子数据
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // 均匀分布在整个管道
      positions[i * 3] = -25 + Math.random() * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24 // 扩大到-12到12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // 初始颜色：深灰色
      const gray = isDark ? 0.15 : 0.2
      colors[i * 3] = gray
      colors[i * 3 + 1] = gray
      colors[i * 3 + 2] = gray
    }

    return { positions, colors }
  }, [particleCount, isDark])

  useFrame((state) => {
    if (!particlesRef.current) return

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
    const colorArray = particlesRef.current.geometry.attributes.color.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const x = posArray[i * 3]
      const meta = metadata[i]

      // 左侧区域（x < -5）：原始数据流
      if (x < -5) {
        // 直接向右流动，无抖动
        posArray[i * 3] += 0.12

        // 保持深灰色
        const gray = isDark ? 0.15 : 0.2
        colorArray[i * 3] = gray
        colorArray[i * 3 + 1] = gray
        colorArray[i * 3 + 2] = gray
      }
      // 中间区域（-5 到 5）：信号识别与分类
      else if (x >= -5 && x < 5) {
        // 检测是否刚进入中间区域，触发点亮
        if (!meta.activationTriggered && x >= -5 && x < -4.5) {
          meta.activationTriggered = true
          meta.activationTime = state.clock.elapsedTime
          // 记录激活时的位置（光晕将留在这里）
          meta.activationX = posArray[i * 3]
          meta.activationY = posArray[i * 3 + 1]
          meta.activationZ = posArray[i * 3 + 2]
        }

        // 中间区域移动速度
        posArray[i * 3] += 0.12

        // 计算进度
        const progress = (x + 5) / 10
        const gray = isDark ? 0.15 : 0.2

        // 直接使用颜色渐变，不再有粒子本身的白色闪烁
        colorArray[i * 3] = gray + (meta.targetColor[0] - gray) * progress
        colorArray[i * 3 + 1] = gray + (meta.targetColor[1] - gray) * progress
        colorArray[i * 3 + 2] = gray + (meta.targetColor[2] - gray) * progress

        // 逐渐向目标车道移动 - 更强的归集力度
        const targetY = meta.laneIndex === 0 ? 10 : (meta.laneIndex === 1 ? 0 : -10)
        posArray[i * 3 + 1] += (targetY - posArray[i * 3 + 1]) * 0.12 * progress
      }
      // 右侧区域（x >= 5）：认知流 - 三条车道
      else {
        // 根据信号类型设置不同速度
        let speed = 0.12
        if (meta.signalType === 'cache') {
          speed = 0.20 // 缓存命中：最快
        } else if (meta.signalType === 'small-model') {
          speed = 0.16 // 小模型：快
        } else {
          speed = 0.12 // 大模型：正常
        }

        posArray[i * 3] += speed

        // 完全使用目标颜色
        colorArray[i * 3] = meta.targetColor[0]
        colorArray[i * 3 + 1] = meta.targetColor[1]
        colorArray[i * 3 + 2] = meta.targetColor[2]

        // 进入目标车道 - 更强的吸附力
        const targetY = meta.laneIndex === 0 ? 10 : (meta.laneIndex === 1 ? 0 : -10)
        posArray[i * 3 + 1] += (targetY - posArray[i * 3 + 1]) * 0.15

        // Z轴也归位到0（让车道更平整）
        posArray[i * 3 + 2] += (0 - posArray[i * 3 + 2]) * 0.05
      }

      // 循环：粒子到达右端后重置到左端
      if (posArray[i * 3] > 25) {
        posArray[i * 3] = -25 + Math.random() * 2
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 24 // 扩大到-12到12
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 10

        const gray = isDark ? 0.15 : 0.2
        colorArray[i * 3] = gray
        colorArray[i * 3 + 1] = gray
        colorArray[i * 3 + 2] = gray

        // 重置点亮状态
        meta.activationTriggered = false
        meta.activationTime = 0
        meta.activationX = 0
        meta.activationY = 0
        meta.activationZ = 0
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 激活光晕组件 - 固定3个位置同步闪烁
function ActivationGlow({
  isDark
}: {
  isDark: boolean
}) {
  const glowRef = useRef<THREE.Points>(null)
  const glowCount = 3 // 固定3个光晕

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(glowCount * 3)
    const colors = new Float32Array(glowCount * 3)
    const sizes = new Float32Array(glowCount)

    // 初始化3个光晕的固定位置
    // 上车道 (Y=10)
    positions[0] = -4.5
    positions[1] = 10
    positions[2] = -0.5

    // 中车道 (Y=0)
    positions[3] = -4.5
    positions[4] = 0
    positions[5] = -0.5

    // 下车道 (Y=-10)
    positions[6] = -4.5
    positions[7] = -10
    positions[8] = -0.5

    // 颜色：白色
    for (let i = 0; i < glowCount; i++) {
      colors[i * 3] = 1
      colors[i * 3 + 1] = 1
      colors[i * 3 + 2] = 1
      sizes[i] = 0
    }

    return { positions, colors, sizes }
  }, [glowCount])

  useFrame((state) => {
    if (!glowRef.current) return

    const glowSizes = glowRef.current.geometry.attributes.size.array as Float32Array

    // 统一的闪烁周期：1.5秒一次
    const cycleDuration = 1.5
    const timeInCycle = state.clock.elapsedTime % cycleDuration
    const progress = timeInCycle / cycleDuration

    // 只在前0.3秒显示光晕
    const glowDuration = 0.3
    if (timeInCycle < glowDuration) {
      const glowProgress = timeInCycle / glowDuration
      const expandCurve = Math.sin(glowProgress * Math.PI)
      const size = 0.1 + expandCurve * 0.3

      // 3个光晕同时闪烁，大小一致
      glowSizes[0] = size
      glowSizes[1] = size
      glowSizes[2] = size
    } else {
      // 其他时间隐藏光晕
      glowSizes[0] = 0
      glowSizes[1] = 0
      glowSizes[2] = 0
    }

    glowRef.current.geometry.attributes.size.needsUpdate = true
  })

  return (
    <points ref={glowRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={glowCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={glowCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={glowCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;

          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 80.0 * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;

          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center) * 2.0;

            if (dist > 1.0) discard;

            // 径向渐变：中心亮，边缘透明，提高透明度让识别带更明显
            float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
            alpha = pow(alpha, 2.5) * 0.4;

            gl_FragColor = vec4(vColor, alpha);
          }
        `}
      />
    </points>
  )
}

// 主数据流动画组件
export function DataFlowAnimation({ isDark }: { isDark: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 300 // 减少到300个粒子

  // 生成粒子元数据：30% 缓存，40% 小模型，30% 大模型
  const metadata = useMemo(() => {
    return Array.from({ length: particleCount }, () => {
      const rand = Math.random()

      let signalType: SignalType
      let targetColor: [number, number, number]
      let laneIndex: number

      if (rand < 0.3) {
        // 30% - 语义缓存（蓝色，上车道）
        signalType = 'cache'
        laneIndex = 0
        // 使用 #3b82f6 蓝色 = rgb(59, 130, 246)
        targetColor = [0.23, 0.51, 0.96]
      } else if (rand < 0.7) {
        // 40% - 小模型（紫色，中车道）
        signalType = 'small-model'
        laneIndex = 1
        // 使用 #8b5cf6 紫色 = rgb(139, 92, 246)
        targetColor = [0.55, 0.36, 0.96]
      } else {
        // 30% - 大模型（金色，下车道）
        signalType = 'large-model'
        laneIndex = 2
        // 使用 #f59e0b 金色 = rgb(245, 158, 11)
        targetColor = [0.96, 0.62, 0.04]
      }

      // 只有5%的粒子显示光晕，在固定区域形成稀疏的识别带
      const shouldGlow = Math.random() < 0.05

      return {
        signalType,
        targetColor,
        laneIndex,
        activationTriggered: false,
        activationTime: 0,
        activationX: 0,
        activationY: 0,
        activationZ: 0,
        shouldGlow
      }
    })
  }, [particleCount])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 1.0
    }}>
      <Canvas
        camera={{ position: [0, 1, 15], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <CognitiveFlowParticles isDark={isDark} particlesRef={particlesRef} metadata={metadata} />
        {/* 去掉光斑效果 */}
        {/* <ActivationGlow isDark={isDark} /> */}
      </Canvas>
    </div>
  )
}
