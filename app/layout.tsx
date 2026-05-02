import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "전서기 | AI 서비스 개발자 포트폴리오",
  description: "RAG, LLM 평가, AI 고객응대, 콘텐츠 제작, 업무 자동화 데모를 배포하고 검증한 전서기의 포트폴리오입니다.",
  keywords: ["AI 서비스 개발자", "RAG", "LLM 평가", "AI 자동화", "포트폴리오"],
  authors: [{ name: "전서기" }],
  openGraph: {
    title: "전서기 | AI 서비스 개발자 포트폴리오",
    description: "AI 기능을 만들고, 검증하고, 배포 가능한 데모로 정리하는 신입 개발자",
    type: "website",
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
