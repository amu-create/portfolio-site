"use client";

import { motion } from 'framer-motion';
import { ChevronDown, Github, Mail, Phone } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import Typewriter from '@/components/ui/Typewriter';
import Parallax from '@/components/ui/Parallax';

export default function HeroSection() {
  const { personal } = portfolioData;

  const titles = [
    "AI 개발자",
    "LLM 연구자",
    "풀스택 개발자를 향한 노력",
    "Claude MCP 얼리어답터"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <Parallax offset={100} className="absolute top-20 left-20">
          <motion.div
            className="w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </Parallax>
        
        <Parallax offset={-100} className="absolute bottom-20 right-20">
          <motion.div
            className="w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </Parallax>
        
        <Parallax offset={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </Parallax>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {personal.name}
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 mb-4 h-10">
            <Typewriter texts={titles} />
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {personal.subtitle}
          </p>

          {/* Achievement Badges with 3D effect */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {personal.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-2xl transition-all"
              >
                <span className="text-lg mr-2">{achievement.icon}</span>
                <span className="text-sm font-medium">{achievement.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Mail size={20} />
              <span>{personal.email}</span>
            </motion.a>
            <motion.a
              href={`tel:${personal.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone size={20} />
              <span>{personal.phone}</span>
            </motion.a>
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </motion.a>
          </div>

          {/* CTA Buttons with glow effect */}
          <div className="flex gap-4 justify-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              프로젝트 보기
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(107, 114, 128, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all border border-gray-200"
            >
              연락하기
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}