import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "전서기 - AI 개발자 포트폴리오",
  description: "AI와 사람을 연결하는 개발자, 전서기의 포트폴리오입니다.",
  keywords: ["AI 개발자", "LLM", "Claude", "GPT-4", "프론트엔드", "포트폴리오"],
  authors: [{ name: "전서기" }],
  openGraph: {
    title: "전서기 - AI 개발자 포트폴리오",
    description: "AI와 사람을 연결하는 개발자",
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