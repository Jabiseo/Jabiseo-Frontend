import { useCallback, useEffect, useState } from "react";
import { debounce } from "@/src/api/apis/debounce";
import { mainfetch } from "@/src/api/apis/mainFetch";
const tem = [
  {
    problemId: 1,
    examInfo: {
      examId: 1,
      description: "2020년 1,2회차",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "소프트웨어 설계",
    },
    isBookmark: false,
    description:
      "검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은?",
  },
  {
    problemId: 2,
    examInfo: {
      examId: 1,
      description: "2020년 1,2회차",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "소프트웨어 설계",
    },
    isBookmark: true,
    description: "코드 설계에서 일정한 일련번호를 부여하는 방식의 코드는?",
  },
  {
    problemId: 3,
    examInfo: {
      examId: 1,
      description: "2020년 1,2회차",
    },
    subjectInfo: {
      subjectId: 1,
      sequence: 1,
      name: "소프트웨어 설계",
    },
    isBookmark: false,
    description: "객체지향 프로그램에서 데이터를 추상화하는 단위는?",
  },
];
const useSearchTextHooks = () => {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState<BookMarkProblem[]>(tem);
  const [isLastResult, setIsLastResult] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const getMoreData = useCallback(() => {
    if (searchResults.length === 0 || isLastResult) return;
    setSearchResults(prevResults => [...prevResults, ...tem]);
    // getData(text, searchResults[searchResults.length - 1].problemId);
  }, [searchResults, isLastResult]);
  const handleBookmark = useCallback(
    async (problemId: number) => {
      if (isBookmarkLoading) return;
      let method: "DELETE" | "POST" = "POST";
      setIsBookmarkLoading(true);

      const newSearchResults = searchResults.map(problem => {
        if (problem.problemId === problemId) {
          method = problem.isBookmark === true ? "DELETE" : "POST";
        }
        return problem.problemId === problemId
          ? { ...problem, isBookmark: !problem.isBookmark }
          : problem;
      });
      setSearchResults(newSearchResults);

      try {
        const response = await mainfetch(
          "/bookmarks",
          {
            method,
            body: { problemId: problemId },
          },
          true
        );

        if (!response.ok) {
          throw new Error("북마크 요청 실패");
        }
      } catch (error) {
        setSearchResults(prevResults =>
          prevResults.map(problem =>
            problem.problemId === problemId
              ? { ...problem, isBookmark: !problem.isBookmark }
              : problem
          )
        );
      } finally {
        setIsBookmarkLoading(false);
      }
    },
    [isBookmarkLoading]
  );
  const getData = useCallback(
    async (searchText: string, lastId?: number) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const response = await mainfetch(
          `/problems/search?title=${searchText}&last-id=${lastId ? lastId : ""}`,
          {
            method: "GET",
          },
          true
        );
        if (!response.ok) {
          throw new Error("검색 요청에 실패했습니다.");
        }
        const data = await response.json();
        if (data.length === 0) {
          setIsLastResult(true);
          return;
        }
        setIsLastResult(false);
        setSearchResults(prevResults => [...prevResults, ...data]);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );
  const debouncedSearch = useCallback(
    debounce(async (searchText: string, lastId?: number) => {
      getData(searchText);
    }, 300),
    []
  );

  useEffect(() => {
    if (text) {
      debouncedSearch(text);
    }
  }, [text, debouncedSearch]);

  return { text, handleChangeText, searchResults, handleBookmark, getMoreData };
};

export default useSearchTextHooks;
