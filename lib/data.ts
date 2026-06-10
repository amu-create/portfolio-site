export const portfolioData = {
  personal: {
    name: "전서기",
    title: "Android / AI 서비스 개발자",
    subtitle: "Android AI 기능을 제품 검토 가능한 증거와 함께 구현합니다.",
    email: "jsg5080@gmail.com",
    phone: "",
    github: "https://github.com/amu-create",
    location: "대한민국",
    about: `Android 권한, OCR, 화면 캡처, 번역 라우팅, QA evidence를 하나의 사용자 흐름으로 묶는 데 집중합니다.
    포트폴리오에서는 검증된 범위와 아직 남은 리스크를 분리해 설명합니다.`,
    achievements: [
      { icon: "AI", text: "Android AI evaluation build" },
      { icon: "QA", text: "Release QA evidence" },
      { icon: "UX", text: "사용자 행동 중심 화면 설계" },
      { icon: "EV", text: "Evidence package" },
      { icon: "SC", text: "Production gap 분리" },
    ],
  },

  education: [
    {
      degree: "AI 서비스 개발 학습 및 프로젝트 과정",
      school: "프로젝트 기반 학습",
      period: "2025 - 2026",
      status: "포트폴리오 프로젝트 진행",
      details: [
        "RAG, LLM 평가, OCR, Android 앱, 업무 자동화 프로젝트를 작은 MVP와 검증 로그 중심으로 정리했습니다.",
      ],
    },
    {
      degree: "컴퓨터공학",
      school: "전공 학습",
      period: "2012 - 2016",
      status: "학사 과정",
      details: [],
    },
  ],

  skills: {
    languages: [
      { name: "Kotlin", level: 74, category: "applied" },
      { name: "JavaScript / TypeScript", level: 72, category: "applied" },
      { name: "Python", level: 70, category: "applied" },
      { name: "SQL", level: 62, category: "working" },
    ],
    ai: [
      { name: "ML Kit OCR / Translate", icon: "OCR" },
      { name: "RAG workflow", icon: "RAG" },
      { name: "LLM evaluation", icon: "EVAL" },
      { name: "Prompt workflow", icon: "PROMPT" },
    ],
    llm: [
      { name: "OpenAI API", icon: "API" },
      { name: "Gemini integration", icon: "LLM" },
      { name: "Server proxy boundary", icon: "SEC" },
      { name: "Evidence logging", icon: "LOG" },
    ],
    devops: [
      { name: "Vercel", icon: "WEB" },
      { name: "Gradle / Android build", icon: "APK" },
      { name: "Browser QA", icon: "QA" },
      { name: "GitHub", icon: "GIT" },
    ],
  },

  projects: [
    {
      title: "LensOverlay Translate",
      type: "개인 프로젝트",
      period: "2026.05",
      description:
        "카메라 촬영, 사진 선택, 화면 위 번역을 하나의 Android 앱 흐름으로 묶은 OCR 번역 evaluation build입니다.",
      achievements: [
        "Kotlin, Compose, CameraX, ML Kit, MediaProjection, Overlay Service 기반 구현",
        "global/china product flavor와 번역 provider routing 구조 분리",
        "Medium_Phone_API_35 release 설치/실행, 카메라, 화면 위 번역, UIAutomator, logcat evidence 확보",
        "QA-signed release 범위와 physical-device, China-network, production-signing blocker를 명시",
      ],
      technologies: ["Kotlin", "Compose", "ML Kit", "CameraX", "MediaProjection", "Android QA"],
      link: "/downloads/lens-overlay-case-study.pdf",
      image: "/project-screens/lens-overlay-home.webp",
    },
    {
      title: "AI Portfolio Lab",
      type: "정적 AI 서비스 데모",
      period: "2026.05",
      description: "RAG, LLM 평가, CS, 콘텐츠, 자동화 흐름을 과금 없는 deterministic demo로 정리한 사이트입니다.",
      achievements: [
        "기술 검토자가 빠르게 기능 흐름과 검증 범위를 훑을 수 있도록 모듈형 구성",
        "실시간 모델 정확도 주장을 하지 않고 데모 범위를 명확히 분리",
      ],
      technologies: ["Static Web", "RAG demo", "LLM eval", "Vercel"],
      link: "https://ai-portfolio-lab.vercel.app",
      image: "/project-screens/ai-portfolio-lab.png",
    },
    {
      title: "ConsultFlow",
      type: "B2B SaaS 데모",
      period: "2026.05",
      description: "상담 문의부터 후속 액션까지의 전환 흐름을 관리하는 AI 상담 OS 시나리오입니다.",
      achievements: [
        "상담 funnel, 분석, 후속 행동 추천을 하나의 업무 흐름으로 구성",
        "운영 지표가 아니라 제품 흐름 구현 사례로 제한해 설명",
      ],
      technologies: ["Next.js", "Prisma", "Gemini", "Analytics"],
      link: "https://consult-flow-app.vercel.app",
      image: "/project-screens/consult-flow.png",
    },
  ],

  experience: [
    {
      position: "현장 고객 응대 및 커뮤니케이션",
      company: "관광/서비스 현장 경험",
      period: "2016 - 2019",
      duration: "약 4년",
      details: [
        "외국인 방문객 안내와 고객 커뮤니케이션 경험을 사용자 흐름 설계 감각으로 연결했습니다.",
      ],
    },
  ],

  military: {
    service: "병역 의무 이행",
    period: "2014 - 2015",
    duration: "21개월",
  },
};
