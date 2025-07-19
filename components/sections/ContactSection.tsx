"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, Github, MapPin, Send } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function ContactSection() {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">
              Get In Touch
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            새로운 기회와 도전을 기다리고 있습니다. 언제든지 연락주세요!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">연락처 정보</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <motion.a
                href={`mailto:${personal.email}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all touch-target"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">이메일</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800 break-all">{personal.email}</p>
                </div>
              </motion.a>

              <motion.a
                href={`tel:${personal.phone}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all touch-target"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">전화번호</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">{personal.phone}</p>
                </div>
              </motion.a>

              <motion.a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all touch-target"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">GitHub</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">github.com/seogidev</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg shadow-md"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-600">위치</p>
                  <p className="text-sm sm:text-base font-medium text-gray-800">{personal.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">메시지 보내기</h3>
            
            <form className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  제목
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  placeholder="문의 제목"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  메시지
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-sm sm:text-base"
                  placeholder="메시지를 입력해주세요..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 sm:px-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 touch-target text-sm sm:text-base"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
                메시지 보내기
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-white"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">함께 미래를 만들어갈 기회를 기다립니다</h3>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            AI 기술로 더 나은 세상을 만들고 싶은 열정적인 개발자와 함께하고 싶으시다면, 
            지금 바로 연락주세요!
          </p>
          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base touch-target"
          >
            <Mail size={18} className="sm:w-5 sm:h-5" />
            이메일 보내기
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}