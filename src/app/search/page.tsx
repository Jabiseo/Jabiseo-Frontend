"use client";
import Appbar from "@/src/components/Appbar";
import Footer from "@/src/components/Footer";
import { globalTheme } from "@/src/components/globalStyle";
import { Box, CircularProgress, ThemeProvider, Typography } from "@mui/material";
import SearchInputBox from "./atom/searchInputBox";
import useSearchTextHooks from "./hooks/useSearchTextHooks";
import CertificateSelect from "./molecule/certificateSelect";
import SearchResultUI from "./organism/searchResultUI";

const SearchMainPage = () => {
  const {
    text,
    handleChangeText,
    searchResults,
    handleBookmark,
    getMoreData,
    handleCertificateSelect,
    selectedCertificate,
    certificates,
  } = useSearchTextHooks();

  if (!selectedCertificate) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
            width: "100%",
            marginTop: "80px",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "center",
            justifyContent: {
              md: "space-between",
            },
          }}
        >
          <CertificateSelect
            certificates={certificates}
            handleCertificateSelect={handleCertificateSelect}
            selectedCertificate={selectedCertificate}
          />
          <Box
            sx={{
              position: "relative",
              width: {
                xs: "100%",
                md: "70%",
              },
              maxWidth: 718,
              marginLeft: {
                xs: "0",
                md: "44px",
              },
            }}
          >
            <SearchInputBox text={text} handleChangeText={handleChangeText} />
          </Box>
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
            selectedCertificate={selectedCertificate}
          />
        )}
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default SearchMainPage;
