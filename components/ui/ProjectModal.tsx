"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, Zap, Palette } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    image: string;
    frontendShowcase?: {
      title: string;
      description: string;
      gradient: string;
      icon: string;
      features: string[];
      demoImage?: string;
    }[];
  };
}

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={24} />,
  zap: <Zap size={24} />,
  palette: <Palette size={24} />
};

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-4xl mx-auto z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white text-center px-4">
                    {project.title} - Frontend Showcase
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="grid gap-8">
                  {project.frontendShowcase?.map((showcase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <div className={`relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${showcase.gradient} p-1`}>
                        <div className="bg-white rounded-2xl p-6">
                          {/* Showcase Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {iconMap[showcase.icon] || <Sparkles size={24} />}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {showcase.title}
                              </h3>
                              <p className="text-gray-600">
                                {showcase.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Features */}
                          <div className="space-y-2 mb-4">
                            {showcase.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + idx * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Demo Image if available */}
                          {showcase.demoImage && (
                            <div className="relative h-48 rounded-xl overflow-hidden shadow-inner bg-gray-100">
                              <Image
                                src={showcase.demoImage}
                                alt={showcase.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 text-center"
                >
                  <p className="text-gray-600 mb-4">
                    이 프로젝트의 더 많은 기능을 확인해보세요!
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      <ExternalLink className="inline-block w-4 h-4 mr-2" />
                      라이브 데모 보기
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      <Github className="inline-block w-4 h-4 mr-2" />
                      소스 코드 보기
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
