"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Link, Play, Github, BarChart3, Users, Cpu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const aimlProjects = [
  
    
  {
    id: 1,
    title: "RAG / LLM 평가 데모",
    subtitle: "검색 근거와 응답 품질을 확인하는 실험",
    description: "문서 검색, 답변 초안, 평가 로그를 한 화면에서 확인하는 포트폴리오 데모",
    videoId: "DW9xuorMC08",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "검증 범위", value: "Demo" },
      { label: "외부 과금", value: "Off" }
    ],
    technologies: [
      "LangChain", "LLM Eval", "RAG", "Prompting",
      "FastAPI", "React", "Redis", "Docker"
    ],
    features: [
      "RAG (검색 증강 생성) 시스템 구현",
      "답변 초안과 근거 표시",
      "컨텍스트 유지 대화 관리",
      "커스텀 프롬프트 엔지니어링"
    ],
    achievements: [
      "모델 성능 수치 대신 검증 절차를 화면화",
      "실시간 API 과금 없이 설명 가능한 데모 유지",
      "면접에서 한계와 다음 검증 항목을 분리해 설명"
    ]
  },
  {
    id: 2,
    title: "업무 데이터 분석 데모",
    subtitle: "CSV/Excel 데이터를 정리하고 요약하는 실험",
    description: "테이블 입력을 정리하고 요약, 차트, 검토 포인트로 바꾸는 업무 자동화 데모",
    videoId: "baJXYFqhmGc",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    stats: [
      { label: "입력", value: "CSV" },
      { label: "결과", value: "Report" }
      
    ],
    technologies: [
      "Python", "TensorFlow", "Prophet", "LSTM",
      "Streamlit", "PostgreSQL", "Pandas", "Plotly"
    ],
    features: [
      "CSV/Excel 데이터 정리",
      "요약 리포트와 차트 구성",
      "이상치와 누락값 확인",
      "수작업 보고서 흐름을 데모로 재현"
    ],
    achievements: [
      "정량 성과 대신 재현 가능한 입력/출력 흐름 제시",
      "업무 자동화 화면 구조를 빠르게 검증",
      "추가 검증 전 상용 성과 주장은 하지 않음"
    ]
  },
  {
    id: 3,
    title: "리스크 신호 분류 데모",
    subtitle: "민감 도메인은 예측보다 검토 절차를 우선",
    description: "위험 신호를 rule 기반으로 분류하고 검토 상태를 관리하는 화면 실험",
    videoId: "fmlhbJH3Vrc",
    thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "모드", value: "Rule" },
      { label: "범위", value: "Demo" }
      
    ],
    technologies: [
      "Python", "Scikit-learn", "XGBoost", "Random Forest",
      "Flask", "MongoDB", "React", "D3.js"
    ],
    features: [
      "문구 기반 위험 신호 분류",
      "검토 상태와 우선순위 표시",
      "사용자에게 다음 확인 항목 안내",
      "민감 도메인에서는 자동 판단보다 사람 검토를 전제"
    ],
    achievements: [
      "검증되지 않은 예측 성과 수치 제거",
      "민감한 의사결정은 자동화하지 않는 범위로 제한",
      "데모와 상용 시스템의 차이를 명확히 분리"
    ]
  }
];

// YouTube 모달 컴포넌트
function YouTubeModal({ isOpen, onClose, videoId, title }: {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50"
            onClick={onClose}
          />
          
          {/* 모달 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
              {/* 헤더 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              {/* YouTube 플레이어 */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AIMLShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(null);

  const openVideo = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-blue-400" />
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI/ML Solutions Showcase
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            실제 비즈니스 문제를 해결하는 AI 솔루션 - 데이터에서 가치를 창출합니다
          </p>
        </motion.div>

        <div className="space-y-20">
          {aimlProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* 비디오/이미지 섹션 */}
                <motion.div 
                  className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                       onClick={() => openVideo(project.videoId, project.title)}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-20`}></div>
                    
                    <div className="relative aspect-video">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg"
                        >
                          <Play className="w-12 h-12 text-gray-900" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 통계 카드 */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-11/12">
                    <div className="bg-gray-800 bg-opacity-95 backdrop-blur-md rounded-lg p-4 shadow-xl">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {project.stats.map((stat, i) => (
                          <div key={i}>
                            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 콘텐츠 섹션 */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-xl text-gray-400">{project.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* 주요 기능 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-400">주요 기능</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">▸</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 성과 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-purple-400">주요 성과</h4>
                    <ul className="space-y-2">
                      {project.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">★</span>
                          <span className="text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 기술 스택 */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-400">기술 스택</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openVideo(project.videoId, project.title)}
                      className={`px-6 py-3 rounded-lg bg-gradient-to-r ${project.color} text-white font-semibold flex items-center gap-2`}
                    >
                      <Play className="w-5 h-5" />
                      데모 영상 보기
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold flex items-center gap-2 hover:bg-gray-800"
                    >
                      <Github className="w-5 h-5" />
                      코드 보기
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* YouTube 모달 */}
      <YouTubeModal
        isOpen={!!selectedVideo}
        onClose={closeVideo}
        videoId={selectedVideo?.videoId || ''}
        title={selectedVideo?.title || ''}
      />
    </section>
  );
}
