import Image from "next/image";

type VisualType = "mobile" | "lab" | "funnel" | "risk" | "transit";

type PrimaryProject = {
  title: string;
  role: string;
  href: string;
  cta: string;
  stack: string[];
  summary: string;
  proof: string;
  caveat: string;
  visual: {
    type: VisualType;
    label: string;
    headline: string;
    items: string[];
    metrics: string[];
    image?: string;
  };
};

const primaryProjects: PrimaryProject[] = [
  {
    title: "LensOverlay Translate",
    role: "Android / AI translation case study",
    href: "/downloads/lens-overlay-case-study.pdf",
    cta: "Case study PDF",
    stack: ["Kotlin", "Compose", "CameraX", "ML Kit", "MediaProjection", "Overlay"],
    summary:
      "카메라 촬영, 사진 선택, 화면 위 번역을 하나의 Android 앱 흐름으로 묶은 번역 보조 앱입니다. AI 호출보다 권한, OCR 후보 선택, 번역 라우팅, 실행 증거를 함께 관리한 점을 대표 역량으로 배치했습니다.",
    proof:
      "Release unit test/build, QA-signed China/Global APK, apksigner/aapt 검증, secret scan 0건, 에뮬레이터 카메라/MediaProjection 실행 증거.",
    caveat:
      "현재 공개 근거는 QA-signed release APK와 에뮬레이터 검증입니다. 물리폰 카메라 QA, 중국망/provider 지연, production signing은 다음 검증 항목입니다.",
    visual: {
      type: "mobile",
      label: "Android evidence",
      headline: "촬영, 사진, 화면 위 번역을 하나의 앱 첫 화면에 정리",
      items: ["Capture", "OCR", "Translate", "Overlay"],
      metrics: ["Release QA", "Secret scan", "Risk stated"],
      image: "/project-screens/lens-overlay-home.webp",
    },
  },
  {
    title: "AI Portfolio Lab",
    role: "AI service demo workbench",
    href: "https://ai-portfolio-lab.vercel.app",
    cta: "라이브 데모 보기",
    stack: ["Static Web", "RAG Demo", "LLM Eval", "Automation"],
    summary:
      "RAG 검색, LLM 응답 평가, AI CS CRM, 콘텐츠 제작, 업무 자동화를 한 화면에서 조작 가능한 정적 포트폴리오 데모로 묶었습니다.",
    proof: "Vercel production 배포와 desktop/mobile 브라우저 QA를 기준으로 제출 가능한 링크를 유지합니다.",
    caveat: "외부 LLM/API 과금 없이 동작하는 deterministic demo입니다. 실시간 모델 정확도 주장은 하지 않습니다.",
    visual: {
      type: "lab",
      label: "AI Workbench",
      headline: "5개 AI 업무 흐름을 한 데모로 압축",
      items: ["RAG", "Eval", "CS", "Content", "Automation"],
      metrics: ["5 workflows", "Deterministic", "Browser checked"],
    },
  },
  {
    title: "ConsultFlow",
    role: "상담 전환 흐름 데모",
    href: "https://consult-flow-app.vercel.app",
    cta: "서비스 열기",
    stack: ["Next.js", "Prisma", "Gemini", "Analytics"],
    summary:
      "상담 문의부터 후속 액션까지의 전환 흐름을 화면으로 구조화한 AI 보조 업무 데모입니다.",
    proof: "실제 배포 URL을 기준으로 서비스 접근성을 확인할 수 있습니다.",
    caveat: "고객 운영 지표나 유료 전환 수치가 아니라 제품 흐름 구현 사례로 말합니다.",
    visual: {
      type: "funnel",
      label: "Lead Funnel",
      headline: "문의부터 후속 액션까지 전환 흐름 관리",
      items: ["문의", "상담", "분석", "후속", "등록"],
      metrics: ["8-stage", "Gemini", "Export"],
    },
  },
  {
    title: "FairSign",
    role: "계약 문구 리스크 체크 데모",
    href: "https://fairsign-topaz.vercel.app",
    cta: "서비스 열기",
    stack: ["Next.js", "OCR Intake", "Rule Scoring", "PDF"],
    summary:
      "프리랜서 계약서 문구의 위험 신호를 rule 기반으로 빠르게 확인하는 스크리닝 UX입니다.",
    proof: "배포된 URL에서 계약서 분석 UX와 결과 구조를 확인할 수 있습니다.",
    caveat: "법률 자문이 아니라 계약서 위험 신호를 빠르게 보는 screening 도구로 제한합니다.",
    visual: {
      type: "risk",
      label: "Risk Screen",
      headline: "계약서 문구를 위험 신호와 리포트로 정리",
      items: ["입소 조항", "지급 지연", "권리 양도", "해지 조건"],
      metrics: ["Rule-based", "PDF", "Korean"],
    },
  },
  {
    title: "K-Transit",
    role: "외국인 대상 교통 안내",
    href: "https://k-transit.vercel.app",
    cta: "서비스 열기",
    stack: ["Next.js", "Localization", "Route UX", "TTS Flow"],
    summary:
      "한국 방문자가 공항 이동, 막차, 경로 안내, 음성 안내를 빠르게 이해하도록 만든 모바일 우선 교통 안내 웹앱입니다.",
    proof: "배포된 URL에서 모바일 경로 UX와 다국어 안내 흐름을 확인할 수 있습니다.",
    caveat: "현재는 mock fallback 기반입니다. 실시간 교통 정확도는 검증 범위 밖으로 분리합니다.",
    visual: {
      type: "transit",
      label: "Transit Guide",
      headline: "방문자를 위한 경로 후보와 다국어 안내",
      items: ["Start", "Transfer", "Last train", "Voice"],
      metrics: ["Mobile UX", "3 locales", "Fallback stated"],
    },
  },
];

const supportProjects = [
  ["Fishing Helper", "Expo React Native 낚시 준비 MVP. 체크리스트, 예약/필드 prototype, AsyncStorage persistence를 검증했습니다."],
  ["Media Node Studio", "이미지/영상 생성 작업을 노드 워크플로우로 조립하는 로컬 AI 콘텐츠 제작 도구입니다."],
  ["VoxCPM Local", "Windows RTX 3070 Ti 환경에서 VoxCPM 1.5/2를 FastAPI TTS 서버로 실행한 로컬 음성 백엔드 실험입니다."],
  ["Excel Automation Pro", "Python 기반 Excel/CSV 보고서 자동화 데스크톱 앱 실험입니다."],
];

const capabilities = [
  ["Android AI", "권한, 카메라, OCR, 화면 캡처, overlay, APK 검증까지 모바일 AI 기능의 실제 사용 흐름을 다룹니다."],
  ["RAG / LLM Eval", "검색 근거, 응답 평가, 실패 원인 기록을 UI와 QA 기준으로 묶어 보여줍니다."],
  ["B2B Workflow", "상담, 계약, 고객 응대처럼 구매자가 이해하는 업무 흐름에 AI 기능을 붙입니다."],
  ["Evidence Packaging", "링크, 스크린샷, 로그, SHA, 테스트 결과를 같은 폴더와 사이트 CTA에서 확인 가능하게 정리합니다."],
  ["Honest Scope Control", "실제 검증된 것과 아직 위험한 것을 분리해 면접과 POC에서 과장 리스크를 줄입니다."],
];

const lensEvidence = [
  ["APK", "com.lensoverlay.translate.china / versionName 0.1.0-china"],
  ["Build", "China/Global release unit tests and assemble tasks PASS"],
  ["Device", "Medium_Phone_API_35 / camera and screen translate smoke PASS"],
  ["Integrity", "apksigner, aapt, SHA-256, APK secret scan evidence"],
  ["Privacy", "Release build no longer auto-saves source capture images"],
];

const demoScripts = [
  ["5분", "문제, 첫 화면, APK 검증, 왜 Android AI 역량인지 설명"],
  ["15분", "카메라/사진/화면 위 번역 흐름과 QA evidence 패키지 설명"],
  ["30분", "권한, 로그/캐시, server proxy, release 전 보안 체크리스트 질의 대응"],
];

const riskRegister = [
  ["실기기", "물리 Android 기기 2종 카메라/OCR/화면 위 번역 녹화 필요"],
  ["보안", "production signing, proxy auth/rate limit, physical-device privacy QA 필요"],
  ["개인정보", "화면 캡처와 OCR 텍스트의 저장 위치, 보존 기간, 삭제 정책 명시 필요"],
  ["중국망", "현지망 provider latency, timeout, fallback 성공률 실측 필요"],
];

function ProjectVisual({ project }: { project: PrimaryProject }) {
  const visual = project.visual;

  return (
    <div className={`project-visual visual-${visual.type}`} aria-label={`${project.title} 요약 시각화`}>
      <div className="visual-topline">
        <span>{visual.label}</span>
        <strong>{project.title}</strong>
      </div>

      {visual.type === "mobile" && (
        <div className="mobile-visual" aria-hidden="true">
          <div className="phone-frame">
            {visual.image ? (
              <Image src={visual.image} alt="" fill sizes="160px" className="phone-shot" />
            ) : null}
          </div>
          <div className="screen-points">
            {visual.items.map((item, index) => (
              <span key={item}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {visual.type === "lab" && (
        <div className="lab-visual" aria-hidden="true">
          <div className="lab-core">
            <span>Portfolio</span>
            <strong>AI Lab</strong>
          </div>
          <div className="lab-modules">
            {visual.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      )}

      {visual.type === "funnel" && (
        <div className="funnel-visual" aria-hidden="true">
          {visual.items.map((item, index) => (
            <div className="funnel-row" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      )}

      {visual.type === "risk" && (
        <div className="risk-visual" aria-hidden="true">
          <div className="risk-score">
            <span>Rule scan</span>
            <strong>Risk signals</strong>
            <div className="risk-bars">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="risk-items">
            {visual.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      )}

      {visual.type === "transit" && (
        <div className="transit-visual" aria-hidden="true">
          <div className="route-line">
            {visual.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="route-summary">
            <strong>Route options</strong>
            <span>compare / explain / speak</span>
          </div>
        </div>
      )}

      <p className="visual-headline">{visual.headline}</p>
      <div className="visual-metrics">
        {visual.metrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const lensOverlay = primaryProjects[0];

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="주요 이동">
        <a href="#top" className="brand">전서기</a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#evidence">Evidence</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Android / AI Service Developer</p>
          <h1>AI 기능을 실제 사용자 흐름에서 검증 가능한 앱과 서비스로 만듭니다.</h1>
          <p className="lead">
            LensOverlay Translate를 중심으로 Android 권한, OCR, 화면 캡처, 번역 라우팅, QA 증거를 하나의 대표 사례로 정리했습니다.
            기존 AI/RAG/B2B 데모는 지원 프로젝트로 재배치해 채용 담당자가 30초 안에 강점을 판단할 수 있게 만들었습니다.
          </p>
          <div className="cta-row">
            <a className="primary-button" href="/downloads/lens-overlay-case-study.pdf">검증 범위 포함 case study</a>
            <a className="secondary-button" href="/downloads/lens-overlay-evidence-summary.pdf">Evidence summary</a>
          </div>
          <div className="proof-row" aria-label="핵심 증거">
            <span>targetSdk 35</span>
            <span>Release QA PASS</span>
            <span>UIAutomator evidence</span>
            <span>Vercel demos</span>
          </div>
        </div>

        <aside className="hero-proof-panel" aria-label="대표 포트폴리오 증거">
          <p className="eyebrow">Main proof</p>
          <h2>LensOverlay Translate</h2>
          <p>
            AI를 붙인 앱이 아니라, AI 기능이 권한/입력/번역/결과/검증 흐름 안에서 어떻게 제품화되는지 보여주는 Android 케이스입니다.
          </p>
          <ProjectVisual project={lensOverlay} />
          <dl className="proof-stack">
            <div>
              <dt>검증</dt>
              <dd>Medium_Phone_API_35 설치, 홈 화면, 카메라, 화면 위 번역 실행 확인</dd>
            </div>
            <div>
              <dt>범위</dt>
              <dd>QA-signed release APK와 에뮬레이터 검증. 실기기, 중국망, production signing은 미검증으로 고정 표시</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="projects" className="section-block">
        <div className="section-head">
          <p className="eyebrow">Representative work</p>
          <h2>대표 프로젝트</h2>
          <p>실제 링크, 실행 증거, 정직한 제한 범위가 있는 프로젝트만 앞에 배치했습니다.</p>
        </div>
        <div className="project-grid">
          {primaryProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-visual-link">
                <ProjectVisual project={project} />
              </div>
              <div className="project-body">
                <p className="project-role">{project.role}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
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
                <a
                  className="text-link"
                  href={project.href}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  download={project.href.endsWith(".pdf") ? true : undefined}
                >
                  {project.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence" className="section-block evidence-section">
        <div className="section-head">
          <p className="eyebrow">Evidence package</p>
          <h2>지원서와 앱 검증을 한 묶음으로 정리했습니다.</h2>
          <p>
            사이트에서 바로 열 수 있는 증거 PDF와 문서 패키지를 제공합니다. APK는 공개 웹 배포가 아니라 별도 로컬 제출 패키지에 보관한 QA-signed release/demo 파일입니다.
          </p>
        </div>
        <div className="evidence-grid">
          {lensEvidence.map(([label, value]) => (
            <article className="evidence-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <div className="case-files">
          <a className="primary-button" href="/downloads/lens-overlay-case-study.pdf">Case study PDF 256KB</a>
          <a className="secondary-button" href="/downloads/lens-overlay-release-qa-addendum.pdf">Release QA PDF</a>
          <a className="secondary-button" href="/downloads/lens-overlay-privacy-security-note.pdf">Privacy note</a>
          <a className="secondary-button" href="/downloads/lens-overlay-portfolio-docs-20260523.zip" download>문서 ZIP 4.1MB</a>
          <a className="secondary-button" href="/downloads/lens-overlay-architecture-summary.pdf">Architecture PDF</a>
        </div>
      </section>

      <section className="section-block demo-readiness-section">
        <div className="section-head">
          <p className="eyebrow">Enterprise interview defense</p>
          <h2>대기업 면접에서 먼저 물어볼 질문을 화면에 올렸습니다.</h2>
          <p>
            이 프로젝트는 상용 출시 완료 제품이 아닙니다. 대신 무엇을 검증했고 무엇을 아직 검증하지 않았는지 먼저 밝히는 방식으로 신뢰를 만듭니다.
          </p>
        </div>
        <div className="readiness-grid">
          <div className="readiness-panel">
            <h3>데모 스크립트</h3>
            {demoScripts.map(([time, text]) => (
              <div className="readiness-row" key={time}>
                <span>{time}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="readiness-panel">
            <h3>남은 P0 검증</h3>
            {riskRegister.map(([label, text]) => (
              <div className="readiness-row" key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-block split-section">
        <div className="section-head sticky-head">
          <p className="eyebrow">Why this is stronger</p>
          <h2>포트폴리오가 보여주는 역량</h2>
          <p>
            단순히 AI를 좋아한다는 인상이 아니라, 모바일/웹 기능을 만들고 검증하고 제한 범위를 설명할 수 있다는 증거로 구성했습니다.
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
          <p className="eyebrow">Supporting work</p>
          <h2>Android 후보 스토리를 보조하는 프로젝트</h2>
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
          <h2>실행 증거까지 남기는 AI 앱/서비스 개발자</h2>
          <p>
            대기업 제출용으로는 LensOverlay case study와 증거 패키지를 먼저 보여주고, 웹/RAG/B2B 프로젝트는 확장 역량으로 이어서 설명하는 구성이 가장 강합니다.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-button" href="mailto:jsg5080@gmail.com">jsg5080@gmail.com</a>
          <a className="secondary-button" href="https://github.com/amu-create" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </main>
  );
}
