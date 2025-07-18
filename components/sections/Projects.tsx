'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    title: 'AI Dashboard',
    description: '실시간 데이터 시각화와 AI 기반 분석을 제공하는 대시보드',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    demo: '/projects/ai-dashboard',
    github: 'https://github.com/yourusername/ai-dashboard',
    category: 'dashboard'
  },
  {
    title: 'Cyberpunk Music Player',
    description: '사이버펑크 테마의 인터랙티브 뮤직 플레이어',
    tech: ['JavaScript', 'CSS3', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&h=400&fit=crop',
    demo: '/projects/cyberpunk-music',
    github: 'https://github.com/yourusername/cyberpunk-music',
    category: 'entertainment'
  },
  {
    title: 'Discord Chat UI',
    description: '실시간 채팅 기능을 갖춘 Discord 스타일 UI',
    tech: ['React', 'Socket.io', 'Node.js'],    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
    demo: '/projects/discord-chat',
    github: 'https://github.com/yourusername/discord-chat',
    category: 'communication'
  },
  {
    title: 'Social Feed Platform',
    description: '소셜 미디어 피드와 인터랙션 기능을 갖춘 플랫폼',
    tech: ['React', 'Redux', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    demo: '/projects/social-feed',
    github: 'https://github.com/yourusername/social-feed',
    category: 'social'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={project.demo}>
                      <Button size="sm" variant="default" className="gap-2">
                        <ExternalLink className="w-4 h-4" />                      Live Demo
                      </Button>
                    </Link>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}