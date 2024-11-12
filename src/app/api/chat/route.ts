import { NextRequest, NextResponse } from 'next/server'

const COZE_API_URL = 'https://api.coze.com/v3/chat'

// 定义事件类型
type CozeEvent = 
  | 'conversation.chat.created'
  | 'conversation.chat.in_progress'
  | 'conversation.message.delta'
  | 'conversation.message.completed'
  | 'conversation.chat.completed'
  | 'conversation.chat.failed'
  | 'conversation.chat.requires_action'
  | 'error'
  | 'done'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    if (!messages || messages.length === 0) {
      throw new Error('Messages array is empty')
    }

    const apiKey = process.env.COZE_API_KEY
    if (!apiKey) {
      throw new Error('COZE_API_KEY is not set in environment variables')
    }

    const requestBody = {
      bot_id: process.env.COZE_BOT_ID,
      user_id: "123456789",
      stream: true,
      auto_save_history: true,
      additional_messages: [{
        role: "user",
        content: messages[messages.length - 1].content,
        content_type: "text"
      }]
    }

    console.log('Request body:', JSON.stringify(requestBody, null, 2))

    const response = await fetch(COZE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Coze API error:', errorData)
      throw new Error(`Coze API error: ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            let buffer = ''
            let isCompleted = false // 标记是否已经收到完成事件

            while (true) {
              const { done, value } = await reader!.read()
              if (done) break

              const chunk = decoder.decode(value, { stream: true })
              console.log('Raw chunk received:', chunk)

              buffer += chunk
              const lines = buffer.split('\n')
              buffer = lines.pop() || ''

              for (const line of lines) {
                if (line.trim() === '') continue

                console.log('Processing line:', line)
                if (line.startsWith('event:')) {
                  // 解析事件类型
                  const event = line.slice(6).trim() as CozeEvent
                  console.log('Event type:', event)

                  // 如果收到完成事件，标记为完成
                  if (event === 'conversation.message.completed') {
                    isCompleted = true
                  }

                  // 如果是错误或需要操作的事件，发送给前端
                  if (event === 'error' || event === 'conversation.chat.failed' || 
                      event === 'conversation.chat.requires_action') {
                    const nextLine = lines[lines.indexOf(line) + 1]
                    if (nextLine?.startsWith('data:')) {
                      const errorData = JSON.parse(nextLine.slice(5))
                      controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(errorData)}\n\n`))
                    }
                  }
                  continue
                }

                if (line.startsWith('data:') && !isCompleted) {
                  try {
                    const data = JSON.parse(line.slice(5))
                    console.log('Parsed data:', data)
                    
                    // 只处理助手的回答内容
                    if (data.role === 'assistant' && data.type === 'answer' && data.content) {
                      const content = data.content
                      console.log('Content to send:', content)
                      controller.enqueue(encoder.encode(`data: ${content}\n\n`))
                    }
                  } catch (e) {
                    console.error('JSON parse error:', e)
                    continue
                  }
                }
              }
            }

            // 处理剩余的缓冲区数据
            if (buffer && !isCompleted) {
              try {
                if (buffer.startsWith('data:')) {
                  const data = JSON.parse(buffer.slice(5))
                  if (data.role === 'assistant' && data.type === 'answer' && data.content) {
                    controller.enqueue(encoder.encode(`data: ${data.content}\n\n`))
                  }
                }
              } catch (e) {
                console.error('Final JSON parse error:', e)
              }
            }
          } catch (error) {
            console.error('Stream processing error:', error)
          } finally {
            controller.close()
          }
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    )

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 