"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github, Award, Users, Zap, Globe } from 'lucide-react';
import Image from 'next/image';
import { portfolioData } from '@/lib/data';
import { useState } from 'react';
import ProjectModal from '@/components/ui/ProjectModal';

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    if (project.frontendShowcase) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            실제 배포하고 운영 중인 AI 서비스들
          </p>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Project Image */}
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                    project.frontendShowcase ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="aspect-video relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {project.award && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-semibold">{project.award}</span>
                    </div>
                  )}
                  {project.frontendShowcase && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="text-white text-center">
                        <Zap className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold">Frontend 쇼케이스 보기</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {project.type}
                    </span>
                    <span>•</span>
                    <span>{project.period}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 mb-3">주요 성과</h4>
                  {project.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm">{achievement}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">사용 기술</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  {project.link && project.link !== '#' && (
                    <>
                      {project.link.includes('github.com') ? (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <Github size={18} />
                          GitHub 보기
                        </motion.a>
                      ) : (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <ExternalLink size={18} />
                          배포 사이트 방문
                        </motion.a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold text-center mb-8">프로젝트 성과</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">2+</div>
              <div className="text-blue-100">완성된 프로젝트</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Netlify</div>
              <div className="text-blue-100">실제 배포 경험</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Docker</div>
              <div className="text-blue-100">원클릭 배포</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">MCP</div>
              <div className="text-blue-100">최신 AI 기술</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject || { title: '', image: '' }}
      />
    </section>
  );
}