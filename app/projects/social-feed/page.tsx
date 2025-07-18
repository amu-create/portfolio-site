'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SocialFeedPage() {
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
              <h1 className="text-4xl font-bold mb-4">Social Feed Platform</h1>
              <p className="text-lg text-muted-foreground mb-6">
                현대적인 소셜 미디어 피드 플랫폼으로, 포스트 작성, 좋아요, 댓글, 공유 등의 
                인터랙션을 구현했습니다. 반응형 디자인과 부드러운 애니메이션을 특징으로 합니다.
              </p>
              
              <div className="flex gap-4 mb-8">
                <Button className="gap-2">
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
                    {['React', 'Redux', 'MongoDB', 'Express', 'Node.js'].map((tech) => (
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
                    <li>포스트 작성 및 미디어 업로드</li>
                    <li>실시간 피드 업데이트</li>
                    <li>좋아요, 댓글, 공유 기능</li>
                    <li>사용자 프로필 및 팔로우 시스템</li>
                    <li>무한 스크롤 및 레이지 로딩</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <iframe
                src="/projects/social-feed"
                className="w-full h-[600px] rounded"
                title="Social Feed Platform Demo"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}