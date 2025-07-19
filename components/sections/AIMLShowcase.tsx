"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Link, Play, Github, BarChart3, Users, Cpu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const aimlProjects = [
  {
    id: 1,
    title: "기업 재고 판매 예측 시스템",
    subtitle: "AI 기반 수요 예측으로 재고 최적화",
    description: "시계열 분석과 머신러닝을 활용하여 기업의 재고 관리를 최적화하고 판매를 예측하는 시스템",
    videoId: "baJXYFqhmGc",
    thumbnail: "https://img.youtube.com/vi/baJXYFqhmGc/maxresdefault.jpg",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    stats: [
      { label: "예측 정확도", value: "92%" },
      { label: "재고 비용 절감", value: "30%" },
      { label: "처리 데이터", value: "100만건+" }
    ],
    technologies: [
      "Python", "TensorFlow", "Prophet", "LSTM",
      "Streamlit", "PostgreSQL", "Pandas", "Plotly"
    ],
    features: [
      "시계열 예측 모델 (LSTM, Prophet) 구현",
      "실시간 대시보드 및 시각화",
      "계절성 및 트렌드 분석",
      "자동 재고 보충 알림 시스템"
    ],
    achievements: [
      "예측 정확도 92% 달성으로 업계 평균 대비 15% 향상",
      "재고 부족 및 과잉 재고 문제 70% 감소",
      "의사결정 시간 80% 단축"
    ]
  },
  {
    id: 2,
    title: "아동학대 예측 방지 AI 시스템",
    subtitle: "머신러닝으로 아동을 보호하는 사회적 가치 창출",
    description: "빅데이터와 AI를 활용하여 아동학대 위험을 사전에 감지하고 예방하는 시스템",
    videoId: "fmlhbJH3Vrc",
    thumbnail: "https://img.youtube.com/vi/fmlhbJH3Vrc/maxresdefault.jpg",
    icon: <Shield className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "위험 감지율", value: "87%" },
      { label: "조기 개입", value: "150건+" },
      { label: "처리 시간", value: "실시간" }
    ],
    technologies: [
      "Python", "Scikit-learn", "XGBoost", "Random Forest",
      "Flask", "MongoDB", "React", "D3.js"
    ],
    features: [
      "다중 데이터 소스 통합 분석",
      "위험도 점수 실시간 계산",
      "지역별 히트맵 시각화",
      "관계 기관 자동 알림 시스템"
    ],
    achievements: [
      "False Positive를 25%로 낮춰 신뢰도 향상",
      "조기 개입으로 150건 이상의 사례 예방",
      "관련 기관과의 협업 시스템 구축"
    ]
  },
  {
    id: 3,
    title: "LangChain LLM 통합 플랫폼",
    subtitle: "최신 AI 기술을 활용한 차세대 대화형 AI",
    description: "LangChain과 최신 LLM을 통합하여 기업용 AI 어시스턴트를 구축한 플랫폼",
    videoId: "DW9xuorMC08",
    thumbnail: "https://img.youtube.com/vi/DW9xuorMC08/maxresdefault.jpg",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "응답 정확도", value: "95%" },
      { label: "처리 속도", value: "<2초" },
      { label: "일일 쿼리", value: "10K+" }
    ],
    technologies: [
      "LangChain", "GPT-4", "Claude", "Pinecone",
      "FastAPI", "React", "Redis", "Docker"
    ],
    features: [
      "RAG (검색 증강 생성) 시스템 구현",
      "멀티모달 AI 지원 (텍스트, 이미지, 코드)",
      "컨텍스트 유지 대화 관리",
      "커스텀 프롬프트 엔지니어링"
    ],
    achievements: [
      "응답 정확도 95%로 업계 최고 수준 달성",
      "토큰 사용량 최적화로 비용 60% 절감",
      "엔터프라이즈급 보안 및 확장성 확보"
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