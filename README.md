# 전서기 Android AI 서비스 포트폴리오

Android / AI 서비스 개발자 지원용 단일 페이지 포트폴리오 사이트입니다.

이 사이트는 단순 자기소개보다 채용 담당자가 바로 확인할 수 있는 대표 사례, 배포 링크, 실제 화면, 구현 범위, 한계 사항을 앞에 배치합니다.

## 대표 링크

- Portfolio Site: https://portfolio-site-bay-seven.vercel.app
- LensOverlay Translate: 사이트 내 case study PDF 및 evidence package
- AI Portfolio Lab: https://ai-portfolio-lab.vercel.app
- ConsultFlow: https://consult-flow-app.vercel.app
- FairSign: https://fairsign-topaz.vercel.app
- K-Transit: https://k-transit.vercel.app

## 기술 스택

- Next.js 16 App Router
- React 18
- TypeScript
- Tailwind CSS
- Vercel
- Python Playwright QA scripts

## 주요 구성

- 첫 화면: Android / AI 서비스 개발자 포지셔닝, LensOverlay case study CTA, 배포/QA 증빙
- 대표 프로젝트: LensOverlay Translate, AI Portfolio Lab, ConsultFlow, FairSign, K-Transit
- 보조 프로젝트: Fishing Helper, Media Node Studio, VoxCPM Local, Excel Automation Pro
- 역량 정리: Android AI, RAG/LLM 평가, B2B workflow, evidence packaging, honest scope control

## 로컬 실행

```powershell
npm install
npm run lint
npm run build
npm run start -- -p 3000
```

## 검증

```powershell
npm audit
npm run lint
npm run build
py -3 scripts\capture_project_screens.py
py -3 scripts\qa_portfolio_site.py http://127.0.0.1:3000
```

검증 스크립트 산출물:

- `public/project-screens/*.png`: 대표 프로젝트 실제 배포 화면 캡처
- `public/project-screens/lens-overlay-home.webp`: LensOverlay 홈 화면 증거 이미지
- `public/downloads/*`: LensOverlay case study, architecture, evidence package
- `qa/desktop.png`: 데스크톱 렌더링 QA
- `qa/mobile.png`: 모바일 렌더링 QA

## 문서

- `DESIGN.md`: UI 방향과 디자인 기준
- `PROJECT.md`: Portfolio 작업 인덱스용 프로젝트 설명
- `SUBMISSION-PACK.md`: 이력서/자소서/면접에 바로 쓰는 요약
