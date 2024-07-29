import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

interface BookMarkProblemsProps {
  selectedExamId: number;
  selectedSubjectsId: number[];
  page: number;
}
const useBookmarks = (props: BookMarkProblemsProps) => {
  const [bookmarkedProblems, setBookmarkedProblems] = useState<BookMarkProblem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  useEffect(() => {
    const fetchBookmarks = async (examId: number, subjectIds: number[], page: number) => {
      let path = "";
      if (subjectIds.length === 0) {
        setBookmarkedProblems([]);
        return;
      }
      if (examId == 0) {
        path = `/problems/bookmarked?&subject-id=${subjectIds}&page=${page}`;
      } else {
        path = `/problems/bookmarked?exam-id=${examId}&subject-id=${subjectIds}&page=${page}`;
      }
      const response = await mainfetch<null>(path, { method: "GET" }, true);
      if (response.ok) {
        const data = await response.json();
        setBookmarkedProblems(data.problems);
        setTotalPage(data.totalPage);
      } else {
        new Error("Failed to fetch bookmarks");
      }
    };
    fetchBookmarks(props.selectedExamId, props.selectedSubjectsId, props.page);
  }, [props.selectedExamId, props.selectedSubjectsId, props.page]);
  return { bookmarkedProblems, totalPage };
};

export default useBookmarks;
