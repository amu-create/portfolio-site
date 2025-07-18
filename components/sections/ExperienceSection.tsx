"use client";

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Shield } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function ExperienceSection() {
  const { experience, military } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-white">
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
              Experience
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            다양한 경험을 통한 성장
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Work Experience */}
          <div className="space-y-8 mb-12">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                
                {/* Experience Card */}
                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2 sm:mt-0">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium ml-2">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Military Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">병역</h3>
                <p className="text-gray-600">{military.service}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {military.period}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {military.duration}
              </span>
            </div>
          </motion.div>

          {/* Experience Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              3년간의 서비스업 경험을 통해 배운 <span className="font-semibold text-blue-600">고객 중심 사고</span>와 
              <span className="font-semibold text-purple-600"> 커뮤니케이션 능력</span>을 
              개발에 접목하여, 사용자가 진정으로 필요로 하는 서비스를 만들고 있습니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}