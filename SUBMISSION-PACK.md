# Product Evidence Package

## 판단

이 패키지의 목적은 자기소개 보강이 아니라 `LensOverlay Translate`를 제품/보안/운영 검토자가 빠르게 판단할 수 있는 evidence package로 만드는 것이다.

공개 사이트에서는 검증된 범위, 데이터 경계, production 전 blocker, POC 성공 기준을 먼저 보여주고, 보조 프로젝트는 같은 구현/검증 습관을 다른 업무 흐름으로 확장한 사례로만 둔다.

## 대표 제품 증거

### 1. LensOverlay Translate

- 링크: portfolio-site 내 `Enterprise review PDF`, `Release QA PDF`, `Case study PDF`
- 한 줄 설명: Android 권한, OCR, 화면 캡처, 번역 라우팅, release QA evidence를 하나의 앱 흐름으로 검증한 모바일 AI evaluation build.
- 보여줄 역량: Kotlin/Compose, CameraX, ML Kit, MediaProjection, Overlay Service, APK integrity, privacy boundary, POC 기준 정리.
- 주의: production-ready 또는 store release라고 말하지 않는다. QA-signed release evaluation build와 에뮬레이터 검증 범위라고 명확히 말한다.

### 2. AI Portfolio Lab

- 링크: https://ai-portfolio-lab.vercel.app
- 한 줄 설명: RAG 검색, LLM 답변 평가, AI CS CRM, 콘텐츠 제작, 업무 자동화를 한 화면에서 조작할 수 있게 만든 정적 포트폴리오 데모.
- 보여줄 역량: AI 서비스 흐름 설계, 프롬프트/응답 검증, 기능별 UX 구성, 브라우저 QA.
- 주의: 외부 LLM/API 호출 없는 deterministic demo라고 명확히 말한다.

### 3. ConsultFlow

- 링크: https://consult-flow-app.vercel.app
- 한 줄 설명: 상담 문의부터 등록 전환까지의 퍼널을 관리하고 AI 분석과 후속 행동 추천으로 전환 관리를 돕는 서비스.
- 보여줄 역량: B2B SaaS 화면 구성, CRM 흐름 이해, AI 보조 기능 기획.
- 주의: 실제 고객 운영 지표는 주장하지 않는다.

### 4. FairSign

- 링크: https://fairsign-topaz.vercel.app
- 한 줄 설명: 프리랜서 계약서의 위험 문구를 패턴 기반으로 점검하고 위험 점수와 리포트로 정리하는 법률 리스크 스크리닝 도구.
- 보여줄 역량: 문서 분석 UX, 위험 분류, 리포트 구조화.
- 주의: 법률 자문이 아닌 rule-based screening이라고 말한다.

### 5. K-Transit

- 링크: https://k-transit.vercel.app
- 한 줄 설명: 한국 방문자가 경로 후보, 공항 이동, 막차, 음성 안내 흐름을 이해할 수 있도록 만든 모바일 우선 교통 웹앱.
- 보여줄 역량: 다국어/현지화 UX, 모바일 우선 설계, 사용자 상황 기반 기능 구성.
- 주의: 현재 mock fallback 기반이라 실시간 교통 정확도는 주장하지 않는다.

## 보조로만 말할 프로젝트

- Fishing Helper: Expo React Native 기반 낚시 준비 체크리스트 앱.
- Media Node Studio: 이미지/영상 생성 작업을 노드 워크플로우로 조립하는 로컬 AI 콘텐츠 제작 도구.
- VoxCPM Local: 로컬 GPU 환경에서 TTS 서버 실행을 검증한 음성 백엔드 실험.
- Excel Automation Pro: Excel/CSV 보고서 자동화 데스크톱 앱.

## 외부 검토자에게 줄 한 문장

LensOverlay는 Android AI evaluation build이며, CameraX/ML Kit/MediaProjection/overlay/provider routing을 release QA evidence, privacy boundary, explicit production gaps와 함께 검토할 수 있게 만든 제품 증거 패키지입니다.

## 기술 검토 순서

1. "대표 검토 대상은 LensOverlay Translate입니다."
2. "이 빌드는 production-ready가 아니라 QA-signed release evaluation build입니다."
3. "검증된 것은 release build/test, APK integrity, emulator camera flow, emulator screen-translate flow, secret scan, release no-auto-save fix입니다."
4. "아직 필요한 것은 production signing, physical-device matrix, China/provider latency, durable proxy auth/rate-limit, retention/deletion policy 확정입니다."
5. "보조 프로젝트는 같은 제품화/검증 습관을 웹/RAG/B2B 흐름으로 확장한 사례입니다."

## 다음으로 보강하면 좋은 제품 증거 5개

### 1. RAG 문서 QA 미니 백오피스

PDF/문서를 올리면 chunk, 검색 결과, citation, 답변 평가 로그가 보이는 백오피스. RAG 구현과 검증 역량을 가장 직접적으로 증명한다.

### 2. LLM 응답 평가 대시보드

같은 질문을 여러 모델/프롬프트에 던지고 정확성, 근거성, 톤, 실패 원인을 표로 비교하는 도구. "AI 기능 테스트" 직무에 강하게 맞는다.

### 3. AI 고객응대 티켓 분류기

문의 텍스트를 긴급도, 카테고리, 답변 초안, 다음 액션으로 나누는 CS 자동화 앱. 해외 고객응대 경험과 개발 포트폴리오를 연결하기 좋다.

### 4. AI 콘텐츠 제작 파이프라인

상품 설명 입력 -> 이미지 프롬프트 -> 쇼츠 대본 -> TTS 스크립트 -> 검수 체크리스트까지 이어지는 콘텐츠 워크플로우. AI 콘텐츠 활용형 인재 포지션에 맞다.

### 5. Excel/CSV 업무 자동화 웹 버전

파일 업로드 -> 정리 -> 차트 -> 요약 리포트까지 보여주는 웹 데모. 기존 Excel 자동화 경험을 기술 검토자가 브라우저에서 바로 볼 수 있게 만든다.

## 우선순위

지금 당장 새 프로젝트를 더 만들기보다, 현재는 `portfolio-site`와 `LensOverlay Translate`를 제품 검토 가능한 evidence package로 유지하는 것이 1순위다. 다음으로 만들 것은 물리 Android 기기 QA 영상, 중국망/provider latency 실측, production signing 증거다.
