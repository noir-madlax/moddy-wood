import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // 这里可以添加实际的 AI API 调用
    // const response = await fetch('YOUR_AI_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message }),
    // })
    // const data = await response.json()

    // 临时返回模拟响应
    return NextResponse.json({
      reply: "I understand your concerns. Let's work through this together. Would you like to try some breathing exercises first?"
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 