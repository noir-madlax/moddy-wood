"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  const [bgIndex, setBgIndex] = useState(1)
  const [viewportHeight, setViewportHeight] = useState('100vh')

  // 处理移动端浏览器的视口高度问题
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setViewportHeight(`${window.innerHeight}px`)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <main 
      className="relative overflow-hidden" 
      style={{ height: viewportHeight }}
      onClick={() => setBgIndex(prev => prev === 1 ? 2 : 1)}
    >
      {/* 背景图片 */}
      <Image
        src={`/[page]/bg${bgIndex}.png`}
        alt="Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: 'center',
          minHeight: '100%',
          minWidth: '100%',
        }}
      />

      {/* 返回按钮 */}
      <div className="relative z-10 px-4 py-3 safe-top">
        <Link href="/tarot" className="w-10 h-10 bg-[#1E1E2F] rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </div>
    </main>
  )
} 