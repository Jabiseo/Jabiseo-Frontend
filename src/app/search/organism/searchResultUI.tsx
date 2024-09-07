import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import SearchResultProblem from "../molecule/searchResultProblem";
import { useRouter } from "next/navigation";

interface SearchResultUIProps {
  text: string;
  searchResults: BookMarkProblem[];
  handleBookmark: (problemId: number) => void;
  getMoreData: () => void;
}

const SearchResultUI = ({
  text,
  searchResults,
  handleBookmark,
  getMoreData,
}: SearchResultUIProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const gotoDetailPage = useCallback(
    (problemId: number) => {
      router.push(`/search/${problemId}`);
    },
    [router]
  );
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          getMoreData();
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [searchResults]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          marginTop: {
            xs: "35px",
            sm: "70px",
          },
        }}
      >
        <Typography
          variant="subtitle1"
          fontSize={{
            xs: "12px",
            sm: "20px",
          }}
          color="var(--c-sub3)"
        >
          {text}
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={{
            xs: "12px",
            sm: "20px",
          }}
          sx={{ marginLeft: "4px" }}
        >
          에 대한 전체 검색 결과
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
        }}
      >
        {searchResults.map(problem => (
          <SearchResultProblem
            key={problem.problemId}
            problem={problem}
            handleBookmark={handleBookmark}
            gotoDetailPage={gotoDetailPage}
          />
        ))}
      </Box>
      <div ref={targetRef} style={{ height: "20px", marginTop: "20px" }} />
    </>
  );
};

export default SearchResultUI;
