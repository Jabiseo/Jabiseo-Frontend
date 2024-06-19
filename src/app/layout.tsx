// import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import GoogleAnalytics from "../components/google.analytics";
import "./globals.css";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 비서 자비서",
  description: `자격증 공부를 도와주는 AI 비서 자비서입니다. 실전과 같은 문제 풀이 환경과 AI가 제공하는 학습 추천 
  기능과 문제 해설 및 이론을 통해 효율적으로 자격증을 준비하세요.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics /> : <div>GA환경변수값필요</div>}
        <CssBaseline />
        {/* <AppRouterCacheProvider>{children}</AppRouterCacheProvider> */}
        {children}
      </body>
    </html>
  );
}
