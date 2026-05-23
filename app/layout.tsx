import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "전서기 | Android AI 서비스 포트폴리오",
  description:
    "LensOverlay Translate를 중심으로 Android 권한, OCR, 화면 캡처, 번역 라우팅, QA 증거를 정리한 AI 앱/서비스 개발 포트폴리오입니다.",
  keywords: [
    "Android 개발자",
    "AI 서비스 개발",
    "OCR 번역 앱",
    "Kotlin",
    "Jetpack Compose",
    "ML Kit",
    "포트폴리오",
  ],
  authors: [{ name: "전서기" }],
  creator: "전서기",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "전서기 | Android AI 서비스 포트폴리오",
    description:
      "AI 기능을 실제 사용자 흐름에서 검증 가능한 앱과 서비스로 만드는 개발자 포트폴리오.",
    type: "website",
    locale: "ko_KR",
    siteName: "전서기 Android AI 서비스 포트폴리오",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
