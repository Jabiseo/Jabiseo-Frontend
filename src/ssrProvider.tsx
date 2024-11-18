// src/ssrProvider.tsx
"use client";

import { globalTheme } from "@/src/components/globalStyle";
import createEmotionCache from "@/src/createEmotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const clientSideEmotionCache = createEmotionCache();

export default function SSRProvider({
  children,
  emotionCache = clientSideEmotionCache,
}: {
  children: ReactNode;
  emotionCache?: typeof clientSideEmotionCache;
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
