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
      "현재 공개 근거는 QA-signed release APK와 에뮬레이터 검증입니다. production signing, 물리폰 2종, 중국망/provider latency는 POC 전 검증 항목으로 분리했습니다.",
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
  ["Review-Ready Scope", "실제 검증된 것과 아직 위험한 것을 분리해 제품/보안/운영 검토에서 과장 리스크를 줄입니다."],
];

const coreFeatures = [
  ["01", "촬영 번역", "CameraX 촬영에서 OCR 후보를 뽑고 번역 결과 화면으로 이어지는 기본 흐름입니다.", "CameraX / OCR / result UI"],
  ["02", "사진 번역", "갤러리 이미지를 선택해 같은 OCR/번역 파이프라인으로 처리하는 보조 입력 흐름입니다.", "Photo picker / ML Kit"],
  ["03", "화면 위 번역", "MediaProjection 동의 후 floating bubble과 overlay service로 앱 밖 화면 텍스트를 확인합니다.", "MediaProjection / overlay"],
  ["04", "Provider routing", "global/china flavor와 server proxy 경계를 나눠 키 노출 없이 번역 provider를 바꾸는 구조입니다.", "Flavor / proxy boundary"],
  ["05", "검증 패키징", "APK 메타데이터, SHA-256, release QA, privacy note를 같은 dossier에서 확인하게 만든 증거 흐름입니다.", "SHA / QA / privacy"],
];

const evidenceMatrix = [
  ["Product status", "Evaluation build, not a production-store release", "Scoped claim", "Production signing and distribution policy are still required"],
  ["Release build", "2026-05-23 KST China/Global release unit tests and assemble tasks", "Verified in QA", "QA signing only"],
  ["Device flow", "Medium_Phone_API_35 camera and screen-translate smoke tests", "Verified in emulator", "Physical Samsung/Pixel matrix still required"],
  ["Integrity", "apksigner, aapt metadata, SHA-256, APK secret scan over release evidence", "Verified in package", "Production key custody is not claimed"],
  ["Privacy", "Release build does not auto-save source capture images", "Improved", "OCR retention/deletion policy still needs customer approval"],
  ["Network", "Provider keys and China latency were not exercised", "Blocked", "Needs approved keys, China-network test, p50/p95 timeout data"],
];

const artifactManifest = [
  ["Evidence ZIP", "3,697,082 bytes", "4f0a1ea59fc7", "/downloads/lens-overlay-product-evidence-20260524.zip"],
  ["Enterprise PDF", "38,940 bytes", "af36851f49ba", "/downloads/lens-overlay-enterprise-readiness.pdf"],
  ["Release QA PDF", "5,321 bytes", "1667c93be472", "/downloads/lens-overlay-release-qa-addendum.pdf"],
  ["QR PNG", "6,983 bytes", "d893bc147c15", "/downloads/portfolio-site-qr.png"],
];

const reviewTracks = [
  ["5분", "제품 가치, 대표 화면, 검증된 release QA, 아직 production이 아닌 범위까지 한 번에 확인"],
  ["15분", "카메라/사진/화면 위 번역 흐름, 사용자가 얻는 결과, evidence 패키지와 실패 가능성 확인"],
  ["30분", "권한, OCR 텍스트 처리, 저장/삭제, server proxy, signing, 로그, rollback 전제까지 기술 검토"],
];

const enterpriseGates = [
  ["Production signing", "QA 서명이 아니라 조직 release key, Play/App distribution 정책, rollback 기준 필요"],
  ["Physical device QA", "삼성/Pixel급 2종 이상에서 카메라, overlay, orientation, low-memory 흐름 녹화 필요"],
  ["Data handling", "OCR 텍스트, 캡처 이미지, 로그의 저장 위치, 보존 기간, 삭제 정책을 환경별로 고정해야 함"],
  ["Provider latency", "중국망 MiniMax/proxy timeout, fallback, rate limit, 장애 UX를 실측해야 함"],
];

const pocCriteria = [
  ["Install", "10분 안에 QA-signed APK 설치와 앱 첫 화면 진입"],
  ["Camera flow", "카메라 촬영 또는 사진 선택 후 OCR/번역 결과 화면 확인"],
  ["Screen flow", "MediaProjection 동의, floating bubble, 번역 결과, 중지/정리 확인"],
  ["Evidence review", "SHA-256, apksigner/aapt, secret scan, privacy note를 같은 패키지에서 확인"],
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
          <a href="#features">Features</a>
          <a href="#evidence">Evidence</a>
          <a href="#projects">Projects</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Core feature showcase / Android AI</p>
          <h1>LensOverlay Translate</h1>
          <p className="lead">
            촬영, 사진, 화면 위 번역이 어떤 순서로 동작하는지 첫 화면에서 바로 보이게 정리했습니다.
            release QA와 production gap은 아래 evidence 영역에 보조 증거로 분리했습니다.
          </p>
          <div className="hero-feature-strip" aria-label="LensOverlay 핵심 기능">
            {coreFeatures.map(([index, title]) => (
              <span key={title}>
                <i>{index}</i>
                {title}
              </span>
            ))}
          </div>
          <div className="cta-row">
            <a className="primary-button" href="#features">핵심 기능 보기</a>
            <a className="secondary-button" href="#evidence">검증 자료 보기</a>
          </div>
        </div>

        <aside className="hero-proof-panel" aria-label="LensOverlay 핵심 기능 미리보기">
          <p className="eyebrow">Feature preview</p>
          <h2>LensOverlay Translate</h2>
          <p>
            앱 설치 없이도 촬영, 사진, 화면 위 번역이 어떤 흐름으로 이어지는지 먼저 보여줍니다. 검증 자료와 production gap은 아래 evidence 영역에서 확인합니다.
          </p>
          <ProjectVisual project={lensOverlay} />
          <dl className="proof-stack">
            <div>
              <dt>Status</dt>
              <dd>Medium_Phone_API_35, emulator-5554, com.lensoverlay.translate.china, versionName 0.1.0-china 기준 설치, 홈 화면, 카메라, 화면 위 번역 실행 확인</dd>
            </div>
            <div>
              <dt>Gate</dt>
              <dd>QA-signed release APK와 에뮬레이터 검증. production signing, 실기기, 중국망은 POC 전 blocker로 고정 표시</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section id="features" className="section-block feature-showcase-section">
        <div className="section-head">
          <p className="eyebrow">What the app does</p>
          <h2>직접 설치하지 않아도 핵심 기능이 먼저 보이게 했습니다.</h2>
          <p>
            QR로 들어온 검토자가 가장 먼저 봐야 하는 것은 다운로드 버튼이 아니라 앱이 해결하는 흐름입니다. 각 기능은 구현 범위와 검증 경계를 함께 표시합니다.
          </p>
        </div>
        <div className="core-feature-grid">
          {coreFeatures.map(([index, title, text, proof]) => (
            <article className="core-feature-card" key={title}>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <code>{proof}</code>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-block">
        <div className="section-head">
          <p className="eyebrow">Representative work</p>
          <h2>대표 프로젝트</h2>
          <p>실제 링크, 실행 증거, 데이터 경계, 정직한 제한 범위가 있는 프로젝트만 앞에 배치했습니다. LensOverlay가 대표 제품 증거이고 나머지는 보조 역량 사례입니다.</p>
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
          <h2>다운로드보다 먼저 검증 상태를 보여줍니다.</h2>
          <p>
            대기업 검토자가 바로 막을 질문을 `Area / Evidence / Status / Residual risk`로 분리했습니다. APK는 공개 웹 배포가 아니라 별도 로컬 검토 패키지에 보관한 QA-signed release evaluation build입니다.
          </p>
        </div>
        <div className="evidence-matrix" role="table" aria-label="LensOverlay 검증 매트릭스">
          <div className="evidence-matrix-head" role="row">
            <span role="columnheader">Area</span>
            <span role="columnheader">Evidence</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Residual risk</span>
          </div>
          {evidenceMatrix.map(([area, evidence, status, risk]) => (
            <div className="evidence-matrix-row" role="row" key={area}>
              <strong role="cell">{area}</strong>
              <span role="cell">{evidence}</span>
              <em role="cell">{status}</em>
              <span role="cell">{risk}</span>
            </div>
          ))}
        </div>
        <div className="qr-scan-card evidence-qr-card" aria-label="포트폴리오 사이트 QR 코드와 검증 매니페스트">
          <Image
            src="/downloads/portfolio-site-qr.png"
            alt="https://portfolio-site-bay-seven.vercel.app QR code"
            width={132}
            height={132}
            className="qr-code-image"
          />
          <div>
            <strong>Share live dossier</strong>
            <span>QR opens this portfolio. If scanning fails, use the direct URL or manifest below.</span>
            <a className="mini-link" href="https://portfolio-site-bay-seven.vercel.app/">Open live URL</a>
            <a className="mini-link" href="/downloads/lens-overlay-evidence-manifest.json">Open manifest JSON</a>
          </div>
        </div>
        <div className="case-files">
          <a className="primary-button" href="/downloads/lens-overlay-enterprise-readiness.pdf">Enterprise review PDF</a>
          <a className="secondary-button" href="/downloads/lens-overlay-evidence-manifest.json">Evidence manifest JSON</a>
          <a className="secondary-button" href="/downloads/lens-overlay-case-study.pdf">Case study PDF 256KB</a>
          <a className="secondary-button" href="/downloads/lens-overlay-release-qa-addendum.pdf">Release QA PDF</a>
          <a className="secondary-button" href="/downloads/lens-overlay-privacy-security-note.pdf">Privacy note</a>
          <a className="secondary-button" href="/downloads/lens-overlay-product-evidence-20260524.zip" download>Product evidence ZIP 3.5MB</a>
          <a className="secondary-button" href="/downloads/lens-overlay-architecture-summary.pdf">Architecture PDF</a>
        </div>
        <div className="artifact-manifest" aria-label="공개 증거 파일 매니페스트">
          {artifactManifest.map(([label, size, sha, href]) => (
            <a href={href} key={label}>
              <strong>{label}</strong>
              <span>{size}</span>
              <code>sha256 {sha}</code>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block demo-readiness-section">
        <div className="section-head">
          <p className="eyebrow">Enterprise review readiness</p>
          <h2>제품팀, 보안팀, 운영팀이 막을 질문을 먼저 열어둡니다.</h2>
          <p>
            이 프로젝트는 상용 출시 완료 제품이라고 포장하지 않습니다. 대신 지금 검증된 흐름, POC 성공 기준, production 전 blocker를 분리해 검토자가 바로 판단할 수 있게 합니다.
          </p>
        </div>
        <div className="readiness-grid">
          <div className="readiness-panel">
            <h3>검토 트랙</h3>
            {reviewTracks.map(([time, text]) => (
              <div className="readiness-row" key={time}>
                <span>{time}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="readiness-panel">
            <h3>POC 전 blocker</h3>
            {enterpriseGates.map(([label, text]) => (
              <div className="readiness-row" key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="readiness-panel readiness-panel-wide">
            <h3>POC 성공 기준</h3>
            {pocCriteria.map(([label, text]) => (
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
            단순한 AI 데모가 아니라, 모바일/웹 기능을 만들고 검증하고 데이터·운영·보안 경계를 설명할 수 있다는 증거로 구성했습니다.
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
          <h2>Android AI 구현과 검증 범위를 함께 보여줍니다.</h2>
          <p>
            대기업 검토용으로는 LensOverlay case study와 evidence package를 먼저 보여주고, 웹/RAG/B2B 프로젝트는 같은 검증 습관을 다른 업무 흐름으로 확장한 사례로 연결합니다.
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
