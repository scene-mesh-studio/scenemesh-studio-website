'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'


// 网格平面组件 - 创建空间扭曲效果
const WarpGrid: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  // 增强的自定义着色器材质 - 更强烈的视觉效果
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float distance = length(pos.xy);
      float warp = max(0.0, 1.0 - distance / 4.0);
      
      // 与光点传播同步的中心区域动态效果
      float waveInterval = 6.0; // 与光点传播间隔一致
      float syncedTime = uTime;
      float wavePhase = fract(syncedTime / waveInterval); // 0到1的光点发出周期
      
      // 在光点发出时增强中心波浪
      float waveBoost = smoothstep(0.0, 0.1, wavePhase) * smoothstep(0.3, 0.0, wavePhase);
      float centerWave = sin(distance * 2.0 - syncedTime * 1.2) * warp * (0.06 + waveBoost * 0.05);
      
      // 组合中心凹陷和中心波浪
      pos.z = -warp * warp * 2.0 + centerWave;
      
      // 与光点发出同步的螺旋效果
      float angle = atan(pos.y, pos.x);
      float centerSpiral = sin(angle * 4.0 + syncedTime * 0.3) * warp * (0.008 + waveBoost * 0.006);
      pos.z += centerSpiral;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `
  
  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uIsDark;
    
    void main() {
      float distance = length(vPosition.xy);
      float warp = max(0.0, 1.0 - distance / 4.0);
      
      // 更密集的网格线效果
      vec2 grid = abs(fract(vUv * 70.0) - 0.5);
      float line = smoothstep(0.0, 0.02, min(grid.x, grid.y));
      
      // 根据主题模式调整网格颜色
      vec3 baseColor1, baseColor2;
      if(uIsDark > 0.5) {
        // 深色模式：浅灰色
        baseColor1 = vec3(0.6, 0.6, 0.6);
        baseColor2 = vec3(0.5, 0.5, 0.5);
      } else {
        // 浅色模式：深灰色，提高对比度
        baseColor1 = vec3(0.2, 0.2, 0.25);
        baseColor2 = vec3(0.15, 0.15, 0.2);
      }

      // 基于距离和时间的简单颜色混合
      float colorMix = sin(uTime * 0.5 + distance * 1.5) * 0.5 + 0.5;
      vec3 gridBaseColor = mix(baseColor1, baseColor2, colorMix * warp);
      
      // 网格边界渐变 - 基于网格的实际边界
      float gridHalfWidth = 10.0;   // 网格宽度的一半
      float gridHalfHeight = 7.5;   // 网格高度的一半
      float fadeWidth = 2.5;        // 渐变区域宽度
      
      // 计算到网格边界的距离
      float distToEdgeX = min(gridHalfWidth - abs(vPosition.x), gridHalfWidth);
      float distToEdgeY = min(gridHalfHeight - abs(vPosition.y), gridHalfHeight);
      float distToEdge = min(distToEdgeX, distToEdgeY);
      
      // 边界渐变因子 - 在边界fadeWidth范围内渐变到0
      float edgeFade = smoothstep(0.0, fadeWidth, distToEdge);
      
      // 底部裁切 - 在Y轴负方向（底部）创建裁切效果
      float bottomCutoff = -2.5;  // 开始裁切的Y坐标
      float bottomFadeHeight = 1.5;  // 裁切渐变高度
      float bottomCut = smoothstep(bottomCutoff, bottomCutoff + bottomFadeHeight, vPosition.y);
      
      // 组合边界渐变和底部裁切
      edgeFade *= bottomCut;
      
      // 保持中心区域强度，只在很小范围内轻微调整
      float centerDistance = length(vPosition.xy);
      float centerFade = smoothstep(0.0, 0.5, centerDistance) * 0.1 + 0.9;
      
      // 温和的透明度和发光效果，应用边界渐变 - 深色模式下更明显
      float alpha = (1.0 - line) * (0.4 + warp * 0.2) * (0.8 + sin(uTime * 1.0) * 0.05);
      alpha *= edgeFade * centerFade;  // 应用边界渐变和中心衰减
      
      float glow = warp * 0.25 * (1.0 + sin(uTime * 1.5) * 0.15) * edgeFade;
      
      // 基于当前状态的连续传播效果
      float waveInterval = 6.0; // 每6秒开始一个新传播
      
      // 从网格中心向外传播的圆圈
      vec2 gridCoord = vUv * 70.0; // 使用与网格线相同的密度
      vec2 centerGrid = vec2(35.0, 35.0); // 网格中心位置
      float gridDistance = length(gridCoord - centerGrid); // 从网格中心的距离
      
      // 检查当前像素是否在网格线上 - 与网格渲染保持一致
      vec2 gridCheck = abs(fract(vUv * 70.0) - 0.5);
      float onGridLine = 1.0 - smoothstep(0.0, 0.02, min(gridCheck.x, gridCheck.y)); // 与网格线宽度一致
      
      // 计算累积的传播状态
      float totalTime = uTime;
      float waveCount = floor(totalTime / waveInterval); // 已完成的传播次数
      float currentWaveTime = mod(totalTime, waveInterval); // 当前传播的时间
      float currentWaveProgress = currentWaveTime / waveInterval; // 当前传播进度
      
      float maxDistance = 50.0; // 最大传播距离
      float currentDistance = currentWaveProgress * maxDistance;
      
      // 圆圈传播效果 - 只在圆圈边缘
      float ringWidth = 1.0; // 非常细的圆圈宽度
      float distanceToRing = abs(gridDistance - currentDistance);
      float ringEffect = smoothstep(ringWidth, 0.0, distanceToRing);
      
      // 计算每个网格点的累积颜色状态
      vec3 accumulatedColor = vec3(0.0);
      float accumulatedIntensity = 0.0;
      
      // 当前传播的颜色索引
      float currentWaveIndex = mod(waveCount, 2.0);
      vec3 currentWaveColor;

      // 根据主题模式选择颜色深度
      int colorIndex = int(currentWaveIndex);
      if(colorIndex == 0) {
        // 蓝色：浅色模式用深蓝色，深色模式用亮蓝色
        currentWaveColor = uIsDark > 0.5 ? vec3(0.3, 0.5, 1.0) : vec3(0.0, 0.2, 0.7);
      } else {
        // 紫色：浅色模式用深紫色，深色模式用亮紫色
        currentWaveColor = uIsDark > 0.5 ? vec3(0.7, 0.4, 1.0) : vec3(0.4, 0.1, 0.7);
      }

      // 只在圆圈传播路径上显示颜色 - 浅色模式下增强强度
      float intensityMultiplier = uIsDark > 0.5 ? 2.5 : 3.5;
      if(ringEffect > 0.0) {
        accumulatedColor = currentWaveColor;
        accumulatedIntensity = ringEffect * intensityMultiplier;
      } else {
        accumulatedColor = vec3(0.0);
        accumulatedIntensity = 0.0;
      }
      
      float totalEffect = accumulatedIntensity * onGridLine;
      
      // 组合网格颜色和传播效果
      vec3 colorWithFade = gridBaseColor * edgeFade * centerFade;

      // 传播区域用传播颜色替换，而不是叠加
      vec3 finalColor = colorWithFade;
      if(totalEffect > 0.0) {
        // 直接使用传播颜色，不要过度增强避免溢出变白
        vec3 propagationColor = accumulatedColor * edgeFade;
        // 使用更高的混合比例确保传播颜色占主导
        finalColor = mix(finalColor, propagationColor, min(totalEffect * 2.0, 1.0));
      } else {
        // 只在没有传播效果时添加白色glow，避免颜色发白
        finalColor += glow;
      }
      
      float finalAlpha = alpha + totalEffect * 0.3; // 光感也增加透明度
      
      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `

  const shaderMaterial = useMemo(() => 
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIsDark: { value: isDark ? 1.0 : 0.0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    }), [vertexShader, fragmentShader, isDark]
  )

  // 创建更大的网格几何体覆盖整个Hero区域
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(20, 15, 80, 60)
  }, [])

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
      shaderMaterial.uniforms.uIsDark.value = isDark ? 1.0 : 0.0
    }
    if (meshRef.current) {
      // 减少旋转动画
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.01
    }
  })

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={shaderMaterial}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -0.5, 0]}
      scale={[1.8, 2.0, 1]}
    >
      <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
    </mesh>
  )
}




// 主场景组件
const SpaceWarpScene: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { camera } = useThree()

  useEffect(() => {
    // 设置相机初始位置 - 调整为更好的网格观看角度
    camera.position.set(0, 3, 6)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return (
    <>
      {/* 环境光设置 - 增强整体亮度 */}
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* 主光源 - 增强网格效果 */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow
      />
      
      {/* 彩色辅助光源 - 突出网格色彩 */}
      <pointLight position={[-6, 4, 3]} intensity={1.0} color="#3b82f6" />
      <pointLight position={[4, -3, 5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 6, -3]} intensity={0.6} color="#ec4899" />
      <pointLight position={[2, 2, 8]} intensity={0.4} color="#06b6d4" />
      
      {/* 网格平面 - 主要视觉焦点 */}
      <WarpGrid isDark={isDark} />
      
      {/* 雾效增加深度感 - 调整范围 */}
      <fog attach="fog" args={['#000020', 10, 25]} />
    </>
  )
}

// 响应式设置Hook
const useResponsiveSize = () => {
  const [size, setSize] = useState({ width: 600, height: 400 })
  
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth * 0.8, 800)
      const height = Math.min(width * 0.6, 500)
      setSize({ width, height })
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  return size
}

// 主导出组件 - 作为Hero背景
export const SpaceWarpAnimation: React.FC<{ className?: string; isDark?: boolean }> = ({ className, isDark = false }) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    // SSR友好的占位符
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          zIndex: 0
        }}
      />
    )
  }

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 8, 12], 
          fov: 60,
          near: 0.1,
          far: 100
        }}
        style={{ 
          width: '100%',
          height: '100%'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.8 }}
      >
        <SpaceWarpScene isDark={isDark} />
      </Canvas>
    </div>
  )
}

export default SpaceWarpAnimation