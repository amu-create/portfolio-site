"use client";

import { motion } from 'framer-motion';
import { ChevronDown, Github, Mail, Phone } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import Typewriter from '@/components/ui/Typewriter';
import Parallax from '@/components/ui/Parallax';
import Image from 'next/image';

export default function HeroSection() {
  const { personal } = portfolioData;

  const titles = [
    "AI 개발자",
    "LLM 연구자",
    "풀스택 개발자를 향한 노력",
    "Claude MCP 얼리어답터"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 모바일 최적화된 애니메이션 배경 */}
      <div className="absolute inset-0 -z-10">
        {/* 모바일에서는 더 작은 블러 효과 사용 */}
        <Parallax offset={50} className="absolute top-10 left-10 hidden sm:block">
          <motion.div
            className="w-32 sm:w-72 h-32 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 sm:opacity-70"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </Parallax>
        
        <Parallax offset={-50} className="absolute bottom-10 right-10 hidden sm:block">
          <motion.div
            className="w-32 sm:w-72 h-32 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 sm:opacity-70"
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </Parallax>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* 프로필 이미지 - 모바일에서도 표시 */}
          <motion.div
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl sm:text-5xl text-white font-bold">전</span>
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-6">
            <span className="gradient-text">
              {personal.name}
            </span>
          </h1>
          
          <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-800 mb-3 sm:mb-4 h-8 sm:h-10 font-medium">
            <Typewriter texts={titles} />
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto">
            {personal.subtitle}
          </p>

          {/* 성과 배지 - 모바일 최적화 */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
            {personal.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all flex items-center gap-1 touch-target"
              >
                <span className="text-base sm:text-lg">{achievement.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-gray-800">{achievement.text}</span>
              </motion.div>
            ))}
          </div>

          {/* 연락처 정보 - 모바일 세로 정렬 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors touch-target px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Mail size={18} />
              <span className="text-sm sm:text-base">{personal.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${personal.phone}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors touch-target px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Phone size={18} />
              <span className="text-sm sm:text-base">{personal.phone}</span>
            </motion.a>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors touch-target px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Github size={18} />
              <span className="text-sm sm:text-base">GitHub</span>
            </motion.a>
          </div>

          {/* CTA 버튼 - 모바일 최적화 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base touch-target flex items-center justify-center"
            >
              프로젝트 보기
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-gray-800 px-6 sm:px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all border border-gray-300 text-sm sm:text-base touch-target flex items-center justify-center"
            >
              연락하기
            </motion.a>
          </div>
        </motion.div>

        {/* 스크롤 인디케이터 - 모바일에서 더 작게 */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-gray-600" />
        </motion.div>
      </div>
    </section>
  );
}