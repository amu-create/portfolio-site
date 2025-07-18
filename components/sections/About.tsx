'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="about" className="py-20 bg-accent/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                5년 이상의 경력을 가진 풀스택 개발자로서, 복잡한 비즈니스 문제를 
                혁신적인 기술 솔루션으로 해결하는 것을 즐깁니다.
              </p>
              <p className="text-lg text-muted-foreground">
                React, Next.js, Node.js 등 최신 웹 기술을 활용하여 
                확장 가능하고 사용자 친화적인 애플리케이션을 구축합니다.              </p>
              <p className="text-lg text-muted-foreground">
                팀 협업을 중시하며, 애자일 환경에서 효율적으로 일하는 것을 선호합니다.
                지속적인 학습과 성장을 통해 기술 트렌드를 따라가고 있습니다.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}