"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function DrawPage() {
  const [bgIndex, setBgIndex] = useState(1)

  return (
    <main className="h-screen relative overflow-hidden" onClick={() => setBgIndex(prev => prev === 1 ? 2 : 1)}>
      {/* 背景图片 */}
      <Image
        src={`/draw/bg${bgIndex}.png`}
        alt="Background"
        fill
        priority
        className="object-cover transition-opacity duration-500"
      />

      {/* 返回按钮 */}
      <div className="relative z-10 px-4 py-3">
        <Link href="/tarot" className="w-10 h-10 bg-[#1E1E2F] rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </div>
    </main>
  )
} 