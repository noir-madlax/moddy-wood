"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [isWood, setIsWood] = useState(false)
  const router = useRouter()

  const handleLetsGo = () => {
    setIsWood(true)
    setTimeout(() => {
      router.push('/mood')
    }, 500)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#FDF8F4] relative overflow-hidden">
      {/* 背景椭圆 */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FEF1E6] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#FDEADB] rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FCE3D0] rounded-full -translate-y-1/4 translate-x-1/4" />

      {/* 顶部状态栏 */}
      <div className="relative w-full px-4 py-3 flex justify-between items-center">
        <span className="text-black text-sm">9:41</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor"/>
            </svg>
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 欢迎消息 */}
      <div className="relative w-full px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm relative">
          {/* 消息框尾巴 */}
          <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45" />
          <p className="text-gray-800 relative z-10">
            Hello, <span className="text-[#F4A261]">@muddy wood</span>
          </p>
        </div>
      </div>

      {/* Logo 和说明文字 */}
      <div className="relative flex flex-col items-start px-4 mt-12">
        <div className="w-20 h-20 mb-4">
          <Image
            src="/muddywood-logo.png" // 这里预留实际 LOGO 图片地址
            alt="MuddyWood Logo"
            width={80}
            height={80}
            className={`transform transition-transform duration-500 ${
              isWood ? 'rotate-180' : ''
            }`}
          />
        </div>
        <h1 className="text-2xl font-semibold mb-4">MuddyWood</h1>
        <p className="text-gray-600 leading-relaxed max-w-[80%]">
          Our app just requires a single click on the gray and muddy &quot;Mood&quot;, which then
          gets turned upside down to become &quot;Wood&quot;, and the color and scene
          change from the gray and muddy to a green forest.
        </p>
      </div>

      {/* Let's Go 按钮 */}
      <div className="relative w-full flex justify-end px-4 mt-8">
        <button
          className="px-6 py-2 rounded-full border border-[#F4A261] text-[#F4A261] flex items-center gap-2"
          onClick={handleLetsGo}
        >
          Let&apos;s Go
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 底部导航栏 */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-4">
        <Link href="/" className="flex flex-col items-center text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/tarot" className="flex flex-col items-center text-gray-400 hover:text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link href="/journal" className="flex flex-col items-center text-gray-400 hover:text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
          </svg>
          <span className="text-xs mt-1">Journal</span>
        </Link>
      </div>
    </main>
  )
}
