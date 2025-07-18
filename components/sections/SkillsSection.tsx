"use client";

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/data';
import Card3D from '@/components/ui/Card3D';

export default function SkillsSection() {
  const { skills } = portfolioData;

  const getSkillLevelColor = (level: number) => {
    if (level >= 80) return 'from-green-500 to-emerald-500';
    if (level >= 60) return 'from-blue-500 to-cyan-500';
    return 'from-purple-500 to-pink-500';
  };

  return (
    <section id="skills" className="py-20 bg-white">
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
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            최신 AI 기술과 프로그래밍 역량
          </p>
        </motion.div>

        {/* Programming Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            Programming Languages
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {skills.languages.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${getSkillLevelColor(skill.level)} rounded-full`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 capitalize">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI/ML Stack */}
          <Card3D>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl h-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-800">AI/ML</h3>
              <div className="space-y-3">
                {skills.ai.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="font-medium text-gray-800">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Card3D>

          {/* LLM Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-800">LLM</h3>
            <div className="space-y-3">
              {skills.llm.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-medium text-gray-800">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DevOps Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-green-800">DevOps</h3>
            <div className="space-y-3">
              {skills.devops.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-medium text-gray-800">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Frontend Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-orange-800">Frontend</h3>
            <div className="space-y-3">
              {[
                { name: "Next.js 14", icon: "⚡" },
                { name: "TypeScript", icon: "📘" },
                { name: "Tailwind CSS", icon: "🎨" },
                { name: "React", icon: "⚛️" }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-medium text-gray-800">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}