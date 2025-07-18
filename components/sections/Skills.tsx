'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = {
  'Frontend': [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Vue.js', level: 75 },
  ],
  'Backend': [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'MongoDB', level: 75 },
  ],
  'Tools & Others': [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 75 },
    { name: 'CI/CD', level: 80 },
    { name: 'Agile/Scrum', level: 85 },
  ]
}

export default function Skills() {  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="skills" className="py-20 bg-accent/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                className="bg-card p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="bg-primary h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}