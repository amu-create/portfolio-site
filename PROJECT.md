# Portfolio Site

## 목적

전서기 신입 AI 서비스 개발자 지원용 대표 포트폴리오 사이트.

자소서의 주장만으로는 약하므로, 채용 담당자가 실제 링크와 화면으로 확인할 수 있는 프로젝트 증빙을 한 페이지에 정리한다.

## 현재 상태

- 상태: 진행중
- 배포: Vercel
- 대표 URL: https://portfolio-site-bay-seven.vercel.app
- 로컬 URL: http://127.0.0.1:3000

## 스택

- Next.js 16 App Router
- React 18
- TypeScript
- Tailwind CSS
- Python Playwright QA

## 환경 변수

불필요.

## 실행

```powershell
npm install
npm run dev
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

## 포트폴리오 판단

대표 프로젝트는 다음 순서로 보여준다.

1. AI Portfolio Lab
2. ConsultFlow
3. FairSign
4. K-Transit

보조 프로젝트는 기술 폭을 증명하는 용도로만 둔다. 과장된 트랙션, 법률 자문, 실시간 API 정확도는 주장하지 않는다.
