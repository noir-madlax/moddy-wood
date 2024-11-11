"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Message = {
  content: string
  isUser: boolean
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "I am currently studying abroad and facing academic pressure. I am very worried about failing exams.",
      isUser: true
    },
    {
      content: "I can feel the anxiety you have when facing academic and exam pressure. This feeling is really heavy. Let's discuss it together.",
      isUser: false
    },
    {
      content: "How can I overcome these pressures?",
      isUser: true
    },
    {
      content: "The process of overcoming pressure can be very complicated, but first of all, it is very important to find a relaxation method suitable for yourself. Have you ever tried some effective study methods or relaxation techniques?",
      isUser: false
    },
    {
      content: "I often relieve my stress by eating some delicious food. Are there any other ways to relieve stress?",
      isUser: true
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    try {
      setIsLoading(true)
      // 添加用户消息
      const userMessage = { content: inputValue, isUser: true }
      setMessages(prev => [...prev, userMessage])
      setInputValue('')

      // 调用后端 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      })

      if (!response.ok) throw new Error('Failed to send message')

      const data = await response.json()
      
      // 添加 AI 回复
      const aiMessage = { content: data.reply, isUser: false }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      // 可以添加错误提示
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <main className="flex flex-col h-screen bg-[#FDF8F4]">
      {/* 固定顶部区域 */}
      <div className="fixed top-0 left-0 right-0 bg-[#FEF1E6] rounded-b-[40px] px-4 pt-3 pb-8 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/mood" className="text-[#F4A261]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
            <Image
              src="/muddywood-logo.png"
              alt="MuddyWood Logo"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>

      {/* 消息列表 - 添加上下 padding 以避免被固定元素遮挡 */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4 mt-28 mb-24">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.isUser
                  ? 'bg-[#F4A261] text-white'
                  : 'bg-[#FEF1E6] text-gray-800 border border-dashed border-gray-300'
              }`}
            >
              {!message.isUser && (
                <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full mr-1">
                  ✨
                </span>
              )}
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 固定底部输入区域 */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-[#F4A261] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
          </svg>
        </button>
        <div className="flex-1 bg-gray-100 rounded-full px-6 py-3 flex items-center">
          <input
            type="text"
            placeholder="Share your happiness or troubles"
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ml-2 
              ${isLoading ? 'bg-gray-400' : 'bg-[#F4A261]'}`}
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  )
} 