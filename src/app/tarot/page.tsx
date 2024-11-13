"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const cards = [
  { id: 1, image: '/tarot/card1.png' },
  { id: 2, image: '/tarot/card2.png' },
  { id: 3, image: '/tarot/card3.png' },
]

export default function TarotPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null)
  const router = useRouter()

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 100
    
    if (info.offset.x < -swipeThreshold) {
      if (currentCard < cards.length - 1) {
        setDragDirection('left')
        setCurrentCard(prev => prev + 1)
      }
    } else if (info.offset.x > swipeThreshold) {
      if (currentCard > 0) {
        setDragDirection('right')
        setCurrentCard(prev => prev - 1)
      }
    }
  }

  const handleCardClick = (cardId: number) => {
    switch(cardId) {
      case 1:
        router.push('/draw')
        break
      case 2:
        router.push('/breath')
        break
      case 3:
        router.push('/burn')
        break
    }
  }

  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -1000 : 1000,
      opacity: 0
    })
  }

  return (
    <main className="h-screen relative overflow-hidden flex flex-col">
      {/* 背景图片 */}
      <Image
        src="/tarot/bg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* 顶部导航 */}
      <div className="relative z-10 px-4 py-3">
        <Link href="/" className="w-10 h-10 bg-[#1E1E2F] rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </div>

      {/* 卡片区域 */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-8">
        <div className="flex flex-col items-center">
          {/* 滑动指示器移到这里 */}
          <div className="flex justify-center gap-2 mb-4">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentCard ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* 卡片 */}
          <AnimatePresence initial={false} custom={dragDirection} mode="wait">
            <motion.div
              key={currentCard}
              custom={dragDirection}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(cards[currentCard].id)}
              className="w-full max-w-[380px] aspect-[3/4] flex items-center justify-center cursor-pointer"
            >
              <Image
                src={cards[currentCard].image}
                alt={`Tarot Card ${currentCard + 1}`}
                width={380}
                height={507}
                className="object-contain w-full h-full"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 