import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Metadata } from "next";
import GoogleAnalytics from "../components/google.analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 비서 자비서",
  description: `자격증 공부를 도와주는 AI 비서 자비서입니다. 실전과 같은 문제 풀이 환경과 AI가 제공하는 학습 추천 
  기능과 문제 해설 및 이론을 통해 효율적으로 자격증을 준비하세요.`,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics /> : <div>GA환경변수값필요</div>}
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
