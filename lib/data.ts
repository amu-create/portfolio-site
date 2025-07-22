export const portfolioData = {
  personal: {
    name: "전서기",
    title: "AI 개발자 | LLM 전문가",
    subtitle: "사용자 중심 서비스 개발",
    email: "jsg5080@gmail.com",
    phone: "010-2000-6637",
    github: "https://github.com/amu-create",
    location: "대한민국",
    about: `컴퓨터공학 전공자로서 2025년 7월 AI 전문가 과정을 성적 상위권으로 우수 수료했습니다. 
    Claude MCP, GPT-4o, LangChain 등 최신 AI 기술을 신입 개발자 중 가장 앞서 습득하고 활용했으며, 
    특히 벡터 스토어와 회원 DB를 연동한 고도화된 RAG 시스템을 완성했습니다.`,
    achievements: [
      { icon: "🎓", text: "AI 과정 우수 수료" },
      { icon: "💯", text: "출석률 100%" },
      { icon: "🚀", text: "최신 AI 기술 선도" },
      { icon: "🔥", text: "Claude MCP 최초 적용" },
      { icon: "🏆", text: "프로젝트 우수상" }
    ]
  },
  
  education: [
    {
      degree: "AI 전문가 양성 과정",
      school: "AI 아카데미",
      period: "2025.02 - 2025.07",
      status: "우수 수료",
      details: [
        "성적 상위권, 출석률 100%",
        "Claude MCP, GPT-4o, LangChain, RAG, Vector DB 등 최신 기술을 신입 중 가장 빠르게 습득"
      ]
    },
    {
      degree: "컴퓨터공학과",
      school: "유한대학교",
      period: "2012.03 - 2016.02",
      status: "학사 졸업",
      details: []
    }
  ],
  
  skills: {
    languages: [
      { name: "Python", level: 90, category: "expert" },
      { name: "SQL", level: 75, category: "advanced" },
      { name: "JavaScript", level: 70, category: "advanced" },
      { name: "Java", level: 60, category: "intermediate" }
    ],
    ai: [
      { name: "PyTorch 2.0", icon: "🔥" },
      { name: "LangChain", icon: "🔗" },
      { name: "LlamaIndex", icon: "📚" },
      { name: "Hugging Face", icon: "🤗" }
    ],
    llm: [
      { name: "Claude MCP", icon: "🎭" },
      { name: "GPT-4o", icon: "🤖" },
      { name: "Gemini Pro", icon: "💎" },
      { name: "RAG + Vector Store", icon: "🎯" },
      { name: "Pinecone DB", icon: "🗄️" }
    ],
    devops: [
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "▲" },
      { name: "CI/CD", icon: "🔄" }
    ]
  },
  
  projects: [
    
    {
      title: "AI 헬스케어 어시스턴트 - HealthWise AI",
      type: "1인 개발",
      period: "2025.5 - 2025.7",
      
      description: "Claude MCP를 활용한 개인 맞춤형 건강 관리 AI 서비스 - 신입 개발자 중 최초로 MCP 기술 적용",
      achievements: [
        "Claude MCP를 활용한 고급 프롬프트 엔지니어링으로 응답 품질 40% 향상",
        "다국어 지원(한/영/중/일)으로 글로벌 서비스 확장 가능성 확보",
        "Netlify 배포로 실제 서비스 운영 - 신입으로서 배포까지 완성한 드문 케이스",
        "Vercel Edge Functions 활용으로 서버 비용 70% 절감"
      ],
      technologies: ["Claude MCP", "Next.js 14", "Vercel", "TypeScript", "Tailwind CSS"],
      link: "https://healthwiseaipro.netlify.app/",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      frontendShowcase: [
        {
          title: "AI 채팅 인터페이스",
          description: "실시간 스트리밍과 타이핑 애니메이션으로 자연스러운 대화 경험 제공",
          gradient: "from-blue-500 to-purple-500",
          icon: "sparkles",
          features: [
            "Claude MCP API 실시간 스트리밍 응답",
            "마크다운 렌더링 & 코드 하이라이팅",
            "대화 히스토리 자동 저장 및 검색",
            "음성 입력/출력 지원 (Web Speech API)"
          ]
        },
        {
          title: "반응형 디자인 & 다크모드",
          description: "모든 디바이스에서 완벽한 사용자 경험",
          gradient: "from-purple-500 to-pink-500",
          icon: "palette",
          features: [
            "Tailwind CSS로 구현한 반응형 레이아웃",
            "시스템 설정 연동 자동 다크모드",
            "Framer Motion 마이크로 인터랙션",
            "접근성 WCAG 2.1 AAA 준수"
          ]
        },
        {
          title: "고급 상태 관리",
          description: "Zustand와 React Query로 최적화된 성능",
          gradient: "from-green-500 to-blue-500",
          icon: "zap",
          features: [
            "Zustand 전역 상태 관리",
            "React Query 서버 상태 캐싱",
            "낙관적 업데이트로 즉각적인 UI 반응",
            "PWA 오프라인 지원"
          ]
        }
      ]
    },
    {
      title: "HealthWise AI Pro - Docker 기반 풀스택 시스템",
      type: "팀 프로젝트 (기여도 70%)",
      period: "2025.05 - 2025.07",
      award: "🏅 최우수 팀 프로젝트",
      description: "MediaPipe 기반 실시간 운동 자세 분석 및 AI 건강 상담 플랫폼",
      achievements: [
        "Docker Compose로 원클릭 설치 환경 구축 - API 키만 있으면 3분 내 실행 가능",
        "MediaPipe를 활용한 실시간 운동 자세 분석 (스쿼트, 푸쉬업 등 5종)",
        "벡터 스토어(Pinecone)와 PostgreSQL 회원 DB를 연동한 고도화된 RAG 시스템 구현",
        "Django REST API + React TypeScript로 견고한 풀스택 아키텍처 구축"
      ],
      technologies: ["Docker", "Django", "React", "MediaPipe", "PostgreSQL", "Redis", "OpenAI API"],
      link: "https://github.com/amu-create/healthwise-ai",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
      frontendShowcase: [
        {
          title: "실시간 모션 트래킹",
          description: "MediaPipe로 구현한 정확한 운동 자세 분석",
          gradient: "from-red-500 to-orange-500",
          icon: "zap",
          features: [
            "30FPS 실시간 관절 인식 및 추적",
            "Canvas API로 스켈레톤 시각화",
            "운동 카운트 & 자세 정확도 실시간 피드백",
            "WebGL 가속으로 모바일에서도 부드러운 성능"
          ]
        },
        {
          title: "인터랙티브 대시보드",
          description: "Chart.js와 D3.js로 만든 데이터 시각화",
          gradient: "from-teal-500 to-green-500",
          icon: "sparkles",
          features: [
            "실시간 운동 통계 차트",
            "히트맵으로 보는 주간 운동 패턴",
            "애니메이션 진행률 표시",
            "CSV/PDF 리포트 내보내기"
          ]
        },
        {
          title: "소셜 피트니스 기능",
          description: "함께하는 운동의 즐거움",
          gradient: "from-pink-500 to-purple-500",
          icon: "palette",
          features: [
            "실시간 그룹 운동 세션",
            "리더보드 & 배지 시스템",
            "운동 영상 공유 & 피드백",
            "친구 초대 및 챌린지 기능"
          ]
        }
      ]
    },{
      title: "종합 프론트엔드 실험실",
      type: "개인 프로젝트",
      period: "2025.07.10~20",
      award: "🔬 실험적 웹 기술 쇼케이스",
      description: "최신 웹 기술과 창의적인 인터랙션을 실험하는 종합 프론트엔드 실험실. 다크모드, 드래그앤드롭, Canvas 파티클, CSS 3D, WebGL 셰이더 등 5가지 핵심 기술 데모 포함",
      achievements: [
        "CSS Variables와 LocalStorage를 활용한 다크모드 시스템 구현",
        "HTML5 Drag & Drop API로 직관적인 인터랙션 디자인",
        "Canvas API를 활용한 파티클 물리 시뮬레이션 구현",
        "CSS 3D Transform으로 인터랙티브 3D 큐브 애니메이션 제작",
        "WebGL과 GLSL 셰이더로 GPU 가속 비주얼 이펙트 구현"
      ],
      technologies: ["WebGL", "GLSL", "Canvas API", "CSS 3D", "Web APIs", "JavaScript"],
      link: "/projects/frontend-lab",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      frontendShowcase: [
        {
          title: "다크모드 시스템",
          description: "CSS 변수와 LocalStorage를 활용한 테마 전환",
          gradient: "from-gray-800 to-gray-900",
          icon: "moon",
          features: [
            "CSS Custom Properties로 동적 테마 관리",
            "LocalStorage로 사용자 설정 영구 저장",
            "부드러운 전환 애니메이션",
            "시스템 설정 자동 감지"
          ]
        },
        {
          title: "WebGL 셰이더",
          description: "GPU 가속을 활용한 실시간 비주얼 이펙트",
          gradient: "from-purple-600 to-pink-600",
          icon: "cpu",
          features: [
            "GLSL Fragment Shader로 실시간 렌더링",
            "시간 기반 애니메이션 유니폼 변수",
            "모바일 GPU 최적화",
            "60FPS 부드러운 성능"
          ]
        }
      ]
    }
  ],
  
  experience: [
    {
      position: "보라카이(+팔라완) 현지 여행 가이드",
      company: "프리랜서",
      period: "2016.04 - 2019.07",
      duration: "4년",
      details: [
        "한국인 관광객 대상 투어 가이드 및 현지 정보 제공",
        "고객 응대를 통한 서비스 마인드 및 커뮤니케이션 스킬 향상",
        "다양한 연령대와 배경의 고객들과의 소통 경험"
      ]
    }
  ],
  
  military: {
    service: "육군 병장 만기전역",
    period: "2014.01 - 2015.10",
    duration: "21개월"
  }
};