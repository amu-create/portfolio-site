import Image from 'next/image';

const primaryProjects = [
  {
    title: 'AI Portfolio Lab',
    role: '포트폴리오 보강 데모',
    href: 'https://ai-portfolio-lab.vercel.app',
    image: '/project-screens/ai-portfolio-lab.png',
    stack: ['Static Web', 'RAG Demo', 'LLM Eval', 'Automation'],
    summary: 'RAG 검색, LLM 답변 평가, AI CS CRM, 콘텐츠 제작, 업무 자동화를 한 링크에서 조작할 수 있게 만든 정적 포트폴리오 데모입니다.',
    proof: 'Vercel production 배포, desktop/mobile browser QA 통과',
    caveat: '외부 LLM/API 호출 없는 deterministic demo입니다.'
  },
  {
    title: 'ConsultFlow',
    role: 'AI 상담 전환 OS',
    href: 'https://consult-flow-app.vercel.app',
    image: '/project-screens/consult-flow.png',
    stack: ['Next.js', 'Prisma', 'Gemini', 'Analytics'],
    summary: '학원 문의부터 등록까지의 상담 퍼널을 관리하고 AI 분석과 후속 행동 추천으로 전환 관리를 돕는 서비스입니다.',
    proof: '실제 배포 URL 200 확인',
    caveat: '고객 트랙션이나 운영 지표는 주장하지 않습니다.'
  },
  {
    title: 'FairSign',
    role: '계약서 위험 조항 분석',
    href: 'https://fairsign-topaz.vercel.app',
    image: '/project-screens/fairsign.png',
    stack: ['Next.js', 'OCR Intake', 'Rule Scoring', 'PDF'],
    summary: '프리랜서 계약서의 위험 문구를 패턴 기반으로 점검하고 위험 점수와 리포트로 정리하는 법률 리스크 스크리닝 도구입니다.',
    proof: '실제 배포 URL 200 확인',
    caveat: '법률 자문이 아닌 rule-based screening입니다.'
  },
  {
    title: 'K-Transit',
    role: '외국인 대상 교통 안내',
    href: 'https://k-transit.vercel.app',
    image: '/project-screens/k-transit.png',
    stack: ['Next.js', 'Localization', 'Route UX', 'TTS Flow'],
    summary: '한국 방문자가 경로 후보, 공항 이동, 막차, 음성 안내 흐름을 이해할 수 있도록 만든 모바일 우선 교통 웹앱입니다.',
    proof: '실제 배포 URL 200 확인',
    caveat: '현재 mock fallback이 기본이라 실시간 교통 정확도는 주장하지 않습니다.'
  }
];

const supportProjects = [
  ['Fishing Helper', 'Expo React Native 낚시 출조 MVP. 5탭 구조, 체크리스트, 예약/피드 prototype, AsyncStorage persistence.'],
  ['Media Node Studio', '이미지/영상 생성 작업을 노드 워크플로우로 조립하는 로컬 AI 콘텐츠 제작 도구.'],
  ['VoxCPM Local', 'Windows RTX 3070 Ti 환경에서 VoxCPM 1.5/2를 FastAPI TTS 서버로 실행한 로컬 음성 백엔드.'],
  ['Excel Automation Pro', 'Python/CustomTkinter/PyInstaller 기반 Excel/CSV 보고서 자동화 데스크톱 앱.']
];

const capabilities = [
  ['RAG', '문서 입력, chunking, 검색, citation, 근거 기반 답변 UX를 구현했습니다.'],
  ['LLM Evaluation', '테스트 케이스와 rubric으로 답변 품질을 비교하고 실패 원인을 기록하는 흐름을 만들었습니다.'],
  ['AI CS', '문의 분류, 긴급도 판단, 답변 초안, 다음 액션 제안을 CRM 카드로 정리했습니다.'],
  ['AI Content', '상품 목표를 카피, 이미지 프롬프트, 쇼츠 대본, TTS 스크립트로 연결했습니다.'],
  ['Automation', 'CSV 요약, 회의록 액션 추출, 이메일 초안, 파일명 정리 같은 반복 업무를 자동화했습니다.']
];

export default function Home() {
  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="주요 이동">
        <a href="#top" className="brand">전서기</a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">New AI Service Developer</p>
          <h1>AI 기능을 검증 가능한 서비스 데모로 만드는 신입 개발자</h1>
          <p className="lead">
            RAG, LLM 평가, AI 고객응대, 콘텐츠 제작, 업무 자동화를 직접 구현해본 경험을 바탕으로
            작은 기능부터 책임 있게 완성하는 AI 서비스 개발자를 지향합니다.
          </p>
          <div className="cta-row">
            <a className="primary-button" href="https://ai-portfolio-lab.vercel.app" target="_blank" rel="noreferrer">AI Portfolio Lab 보기</a>
            <a className="secondary-button" href="https://github.com/amu-create" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="proof-row" aria-label="핵심 증빙">
            <span>Vercel 배포</span>
            <span>브라우저 QA</span>
            <span>RAG/LLM/자동화</span>
            <span>Python · JavaScript</span>
          </div>
        </div>
        <aside className="hero-proof-panel" aria-label="대표 포트폴리오 증빙">
          <p className="eyebrow">Main proof</p>
          <h2>AI Portfolio Lab</h2>
          <p>
            RAG 검색, LLM 평가, AI CS, 콘텐츠 제작, 업무 자동화 흐름을 하나의 정적 데모로 묶었습니다.
          </p>
          <div className="hero-thumbs">
            <Image
              src="/project-screens/ai-portfolio-lab.png"
              alt="AI Portfolio Lab 화면"
              width={1366}
              height={850}
              priority
              unoptimized
            />
            <Image
              src="/project-screens/consult-flow.png"
              alt="ConsultFlow 화면"
              width={1366}
              height={850}
              unoptimized
            />
          </div>
          <dl className="proof-stack">
            <div>
              <dt>검증</dt>
              <dd>desktop/mobile browser QA 통과</dd>
            </div>
            <div>
              <dt>범위</dt>
              <dd>외부 API 과금 없는 deterministic demo</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="projects" className="section-block">
        <div className="section-head">
          <p className="eyebrow">Verified work</p>
          <h2>대표 프로젝트</h2>
          <p>실제로 열리는 링크와 검증 가능한 구현을 우선 배치했습니다.</p>
        </div>
        <div className="project-grid">
          {primaryProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <a className="project-image-link" href={project.href} target="_blank" rel="noreferrer">
                <Image
                  src={project.image}
                  alt={`${project.title} 화면`}
                  width={1366}
                  height={850}
                  sizes="(max-width: 920px) 100vw, 50vw"
                  unoptimized
                />
              </a>
              <div className="project-body">
                <p className="project-role">{project.role}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <dl className="proof-list">
                  <div>
                    <dt>Proof</dt>
                    <dd>{project.proof}</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>{project.caveat}</dd>
                  </div>
                </dl>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">프로젝트 열기</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="capabilities" className="section-block split-section">
        <div className="section-head sticky-head">
          <p className="eyebrow">Why this is enough</p>
          <h2>포트폴리오가 보여주는 것</h2>
          <p>
            단순히 AI를 써본 수준이 아니라, 기능 설계, 실패 방지, 검증, 배포 링크까지
            채용 담당자가 확인할 수 있는 형태로 묶었습니다.
          </p>
        </div>
        <div className="capability-list">
          {capabilities.map(([name, text]) => (
            <article className="capability-card" key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">Supporting evidence</p>
          <h2>보조 프로젝트</h2>
        </div>
        <div className="support-grid">
          {supportProjects.map(([name, text]) => (
            <article className="support-card" key={name}>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>작게 맡겨도 끝까지 검증하는 개발자</h2>
          <p>
            신입으로서 회사의 코드베이스와 업무 방식을 빠르게 익히고,
            반복 업무 자동화와 AI 기능 검증부터 실무 결과로 연결하겠습니다.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-button" href="mailto:jsg5080@gmail.com">jsg5080@gmail.com</a>
          <a className="secondary-button" href="https://ai-portfolio-lab.vercel.app" target="_blank" rel="noreferrer">대표 데모</a>
        </div>
      </section>
    </main>
  );
}
