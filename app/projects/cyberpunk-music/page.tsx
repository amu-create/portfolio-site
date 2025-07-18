'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CyberpunkMusicPage() {
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
              <h1 className="text-4xl font-bold mb-4">Cyberpunk Music Player</h1>
              <p className="text-lg text-muted-foreground mb-6">
                사이버펑크 테마의 인터랙티브 뮤직 플레이어로, 네온 효과와 글리치 애니메이션을 
                특징으로 합니다. Web Audio API를 활용한 실시간 오디오 시각화 기능을 포함합니다.
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
                    {['JavaScript', 'CSS3', 'Web Audio API', 'Canvas API'].map((tech) => (
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
                    <li>실시간 오디오 시각화</li>
                    <li>사이버펑크 테마 UI/UX</li>
                    <li>글리치 효과 애니메이션</li>
                    <li>플레이리스트 관리</li>                    <li>볼륨 컨트롤 및 재생 제어</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <iframe
                src="/projects/cyberpunk-music"
                className="w-full h-[600px] rounded"
                title="Cyberpunk Music Player Demo"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}