'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DiscordChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Discord Chat UI</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discord 스타일의 실시간 채팅 UI로, 서버 리스트, 채널 관리, 실시간 메시징 기능을 
                구현했습니다. 다크 테마와 함께 Discord의 특징적인 UI/UX를 재현했습니다.
              </p>
              
              <div className="flex gap-4 mb-8">                <Button className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
                <Button variant="outline" className="gap-2">
                  <Github className="w-4 h-4" />
                  View Code
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Socket.io', 'Node.js', 'CSS3'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">주요 기능</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>서버 및 채널 네비게이션</li>
                    <li>실시간 메시지 송수신</li>
                    <li>사용자 온라인 상태 표시</li>
                    <li>이모지 및 파일 공유 UI</li>
                    <li>다크 테마 인터페이스</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <iframe
                src="/projects/discord-chat"
                className="w-full h-[600px] rounded"
                title="Discord Chat UI Demo"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}