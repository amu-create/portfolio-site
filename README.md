# 전서기 포트폴리오 사이트

AI 개발자 전서기의 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 주요 기능

- 🎨 **모던한 디자인**: 그라디언트와 애니메이션을 활용한 시각적 효과
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- ⚡ **빠른 성능**: Next.js 14의 서버 컴포넌트 활용
- 🌐 **SEO 최적화**: 메타데이터 설정으로 검색 엔진 최적화
- 🚀 **원페이지 스크롤**: 부드러운 스크롤 네비게이션

## 섹션 구성

1. **Hero**: 메인 인트로 섹션
2. **About**: 개인 소개 및 교육 이력
3. **Skills**: 기술 스택 시각화
4. **Projects**: 주요 프로젝트 소개
5. **Experience**: 경력 및 경험
6. **Contact**: 연락처 정보 및 문의 폼

## 로컬 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## Vercel 배포 방법

1. GitHub에 코드 푸시
2. Vercel 계정 생성/로그인
3. New Project > Import Git Repository
4. 환경 변수 설정 (필요시)
5. Deploy 클릭

## 폴더 구조

```
portfolio-site/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ExperienceSection.tsx
│       └── ContactSection.tsx
├── lib/
│   ├── data.ts
│   └── utils.ts
├── public/
│   └── (이미지 파일들)
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 커스터마이징

포트폴리오 데이터는 `lib/data.ts` 파일에서 수정할 수 있습니다.

## 라이선스

MIT License