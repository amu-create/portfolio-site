"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Zap, Layers } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "최신 기술 스택",
    description: "Next.js 14, TypeScript, Tailwind CSS를 활용한 모던 웹 개발",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "인터랙티브 디자인",
    description: "Framer Motion으로 구현한 부드러운 애니메이션과 3D 효과",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "최적화된 성능",
    description: "서버 컴포넌트와 이미지 최적화로 빠른 로딩 속도",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "반응형 디자인",
    description: "모든 디바이스에서 완벽하게 작동하는 적응형 레이아웃",
    color: "from-green-500 to-emerald-500"
  }
];

export default function FrontendShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              Frontend Excellence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            이 포트폴리오 사이트 자체가 저의 프론트엔드 역량을 보여주는 작품입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all h-full">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-2xl p-8 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{`// 이 포트폴리오에 적용된 최신 기술들
const techStack = {
  framework: "Next.js 14 (App Router)",
  language: "TypeScript",
  styling: "Tailwind CSS",
  animation: "Framer Motion",
  deployment: "Vercel",
  features: [
    "서버 컴포넌트",
    "3D 카드 효과",
    "타이핑 애니메이션",
    "패럴랙스 스크롤",
    "반응형 디자인",
    "SEO 최적화"
  ]
};`}</code>
          </pre>
        </motion.div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-8">
            스크롤하고, 호버하고, 클릭해보세요. 모든 인터랙션이 세심하게 디자인되었습니다.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg cursor-pointer"
            >
              호버 효과
            </motion.div>
            
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.5)",
                  "0 0 0 20px rgba(59, 130, 246, 0)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-3 bg-white text-gray-800 rounded-full font-medium shadow-lg border-2 border-blue-600"
            >
              펄스 애니메이션
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-lg"
            >
              플로팅 효과
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}