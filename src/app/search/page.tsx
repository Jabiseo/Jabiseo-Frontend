"use client";
import Appbar from "@/src/components/Appbar";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import { Box, ThemeProvider, Typography } from "@mui/material";
import SearchInputBox from "./atom/searchInputBox";
import useSearchTextHooks from "./hooks/useSearchTextHooks";
import SearchResultUI from "./organism/searchResultUI";
import { useRouter } from "next/navigation";

const SearchMainPage = () => {
  const { text, handleChangeText, searchResults, handleBookmark, getMoreData } =
    useSearchTextHooks();

  return (
    <ThemeProvider theme={globalTheme}>
      <Appbar background={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingX: "25px",
          marginTop: {
            xs: "120px",
            sm: "160px",
          },
          minHeight: "100vh",
          backgroundColor: "var(--c-gray1)",
          maxWidth: "1165px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h1"
          fontSize={{
            xs: "18px",
            sm: "32px",
          }}
          gutterBottom
        >
          자비서에서
        </Typography>
        <Typography
          variant="h1"
          fontSize={{
            xs: "18px",
            sm: "32px",
          }}
          gutterBottom
        >
          문제를 검색해보세요
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 718,
            marginTop: "80px",
          }}
        >
          <SearchInputBox text={text} handleChangeText={handleChangeText} />
        </Box>
        {searchResults.length === 0 ? (
          <Box
            marginTop={{
              xs: "35px",
              sm: "70px",
            }}
            height={{
              xs: "21px",
              sm: "35px",
            }}
          >
            <Typography>검색 결과가 없습니다.</Typography>
          </Box>
        ) : (
          <SearchResultUI
            text={text}
            searchResults={searchResults}
            handleBookmark={handleBookmark}
            getMoreData={getMoreData}
          />
        )}
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default SearchMainPage;
