"use client";

import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function AboutSection() {
  const { personal, education } = portfolioData;

  return (
    <section id="about" className="py-20 bg-gray-50">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI와 사람을 연결하는 개발자
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">소개</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {personal.about}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-800">사용자 중심 개발</p>
                  <p className="text-gray-600 text-sm">3년간의 서비스업 경험을 바탕으로 사용자의 니즈를 정확히 파악하고 해결합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-800">최신 기술 습득</p>
                  <p className="text-gray-600 text-sm">Claude MCP, GPT-4o 등 최신 AI 기술을 빠르게 학습하고 프로젝트에 적용합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-800">실전 경험</p>
                  <p className="text-gray-600 text-sm">3개의 AI 서비스를 실제 배포하여 500명 이상의 사용자를 확보했습니다.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">교육</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800">{edu.degree}</h4>
                      <p className="text-gray-600 mb-2">{edu.school}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.period}
                        </span>
                        {edu.status && (
                          <span className="flex items-center gap-1">
                            <Award size={14} />
                            {edu.status}
                          </span>
                        )}
                      </div>
                      {edu.details.length > 0 && (
                        <ul className="space-y-1">
                          {edu.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              • {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}