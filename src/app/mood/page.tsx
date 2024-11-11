"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Mood = {
  name: string
  color: string
  face: string
}

const moods: Mood[] = [
  { name: 'Hopeful', color: 'bg-[#F4B183]', face: 'o_-' },
  { name: 'Happy', color: 'bg-[#FFE699]', face: 'o_o' },
  { name: 'Confident', color: 'bg-[#B8D293]', face: 'o_-' },
  { name: 'Nervous', color: 'bg-[#70AD47]', face: '-_o' },
  { name: 'Surprised', color: 'bg-[#5B9BD5]', face: 'o_o' },
  { name: 'Bored', color: 'bg-[#8497B0]', face: '-_-' },
  { name: 'Calm', color: 'bg-[#B4A7D6]', face: '-_-' },
  { name: 'Anger', color: 'bg-[#F08080]', face: '>_<' },
  { name: 'Indefinite', color: 'bg-gray-100', face: '?' },
]

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState('Moderate')
  const router = useRouter()

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    router.push('/chat')
  }

  return (
    <main className="flex min-h-screen flex-col bg-white px-4 pt-3">
      {/* 顶部状态栏 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#F4A261]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="text-xl font-medium text-[#2D3748]">What&apos;s Your Mood?</h1>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 强度选择器 */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Slight</span>
          <span className="font-medium">Moderate</span>
          <span className="text-gray-500">Strong</span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-[#F4A261] rounded-full -translate-x-1/2" />
        </div>
      </div>

      {/* 心情网格 */}
      <div className="grid grid-cols-3 gap-6">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className="flex flex-col items-center gap-2"
            onClick={() => handleMoodSelect(mood.name)}
          >
            <div className={`w-20 h-20 ${mood.color} rounded-full flex items-center justify-center text-lg`}>
              {mood.face}
            </div>
            <span className="text-gray-600">{mood.name}</span>
          </button>
        ))}
      </div>

      {/* Next 按钮 */}
      <div className="fixed bottom-8 right-4">
        <button className="flex items-center gap-2 text-gray-600">
          NEXT
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </main>
  )
} 