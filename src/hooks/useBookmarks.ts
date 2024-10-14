import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

interface BookMarkProblemsProps {
  selectedExamId: number;
  selectedSubjectsId: number[];
  page: number;
}
const useBookmarks = (props: BookMarkProblemsProps) => {
  const [certificateInfo, setCertificateInfo] = useState<CertificateInfo>();
  const [bookmarkedProblems, setBookmarkedProblems] = useState<BookMarkProblem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isCertified, setIsCertified] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificateInfo = async () => {
      try {
        const response = await mainfetch<null>(
          "/members/myinfo/certificates",
          { method: "GET" },
          true
        );
        const data = await response.json();
        const certificateId = data.certificateId;

        const certificateResponse = await mainfetch<null>(
          `/certificates/${certificateId}`,
          { method: "GET" },
          false
        );
        const certificateData = await certificateResponse.json();
        certificateData.exams.splice(0, 0, { examId: 0, description: "전체 회차" });
        setCertificateInfo(certificateData);
      } catch (err: any) {
        setError(err.message);
        setIsCertified(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateInfo();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (props.selectedSubjectsId.length === 0) {
        setBookmarkedProblems([]);
        return;
      }

      const path =
        props.selectedExamId === 0
          ? `/problems/bookmarked?subject-id=${props.selectedSubjectsId}&page=${props.page}`
          : `/problems/bookmarked?exam-id=${props.selectedExamId}&subject-id=${props.selectedSubjectsId}&page=${props.page}`;

      try {
        const response = await mainfetch<null>(path, { method: "GET" }, true);
        if (response.ok) {
          const data = await response.json();
          setBookmarkedProblems(data.problems);
          setTotalPage(data.totalPage);
          setTotalCount(data.totalCount);
        } else {
          const data = await response.json();
          if (data.errorCode === "MEM_002") {
            setIsCertified(false);
          }
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (!loading) {
      fetchBookmarks();
    }
  }, [props.selectedExamId, props.selectedSubjectsId, props.page, loading]);
  return { bookmarkedProblems, totalPage, totalCount, isCertified, certificateInfo, loading };
};

export default useBookmarks;
