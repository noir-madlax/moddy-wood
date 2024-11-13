"use client"

import Link from 'next/link'
import Image from 'next/image'

export default function JournalPage() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* 背景图片 */}
      <Image
        src="/journal.png"
        alt="Journal Background"
        fill
        priority
        className="object-cover"
      />

      {/* 底部导航栏 */}
      <div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-4 z-10">
        <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link href="/tarot" className="flex flex-col items-center text-gray-400 hover:text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
          <span className="text-xs mt-1">Relax</span>
        </Link>
        <div className="flex flex-col items-center text-[#F4A261]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 3h-6.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H3v18h18V3zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h2v3h10V5h2v14z" />
          </svg>
          <span className="text-xs mt-1">Journal</span>
        </div>
      </div>
    </main>
  )
} 