'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AIDashboardPage() {
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
              <h1 className="text-4xl font-bold mb-4">AI Dashboard</h1>
              <p className="text-lg text-muted-foreground mb-6">
                실시간 데이터 시각화와 AI 기반 분석을 제공하는 대시보드입니다. 
                다양한 차트와 그래프를 통해 복잡한 데이터를 직관적으로 표현하며, 
                머신러닝 모델을 활용한 예측 분석 기능을 포함합니다.
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
                    {['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'TensorFlow.js'].map((tech) => (
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
                    <li>실시간 데이터 스트리밍 및 업데이트</li>
                    <li>다양한 차트 타입 지원 (라인, 바, 파이, 히트맵)</li>
                    <li>AI 기반 데이터 패턴 분석</li>
                    <li>커스터마이징 가능한 위젯 시스템</li>
                    <li>데이터 필터링 및 드릴다운 기능</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <div className="w-full h-[600px] rounded bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                <p className="text-muted-foreground">AI Dashboard Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}