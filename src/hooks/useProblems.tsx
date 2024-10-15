import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

const useProblems = () => {
  const [getProblems, setgetProblems] = useState<ProblemViewType[] & CertificateType>();
  const [certificateInfo, setCertificateInfo] = useState<CertificateType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const path = usePathname().split("/exam/")[1] ?? usePathname().split("/study/")[1];
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("accessToken") ? true : false;
    if (path.includes("bookmark")) {
      const problems = localStorage.getItem("bookmarkProblems");
      if (!problems) {
        router.push("/");
      }
      const getBookmarkProblems = problems ? JSON.parse(problems) : [];
      const newProblems = getBookmarkProblems.problems.map((problem: Problem, index: number) => {
        return {
          ...problem,
          chooseNumber: -1,
          viewSolution: false,
          viewTheory: false,
          problemNumber: index + 1,
        };
      });
      setgetProblems(newProblems);
      setCertificateInfo(getBookmarkProblems.certificateInfo);
      setLoading(false);
    } else if (path.includes("recommendations")) {
      const fetchProblems = async () => {
        try {
          const response = await mainfetch<null>(
            "/problems/recommendations",
            { method: "GET" },
            isLogin
          );
          const data = await response.json();
          const newProblems = data.problems.map((problem: Problem, index: number) => {
            return {
              ...problem,
              chooseNumber: -1,
              viewSolution: false,
              viewTheory: false,
              problemNumber: index + 1,
            };
          });
          setgetProblems(newProblems);
          setCertificateInfo(data.certificateInfo);
        } catch (err: any) {
          router.push("/");
        } finally {
          setLoading(false);
        }
      };
      fetchProblems();
    } else if (path.includes("vulnerable")) {
      const fetchProblems = async () => {
        try {
          const response = await mainfetch<null>("/problems/" + path, { method: "GET" }, isLogin);
          const data = await response.json();
          const newProblems = data.problems.map((problem: Problem, index: number) => {
            return {
              ...problem,
              chooseNumber: -1,
              viewSolution: false,
              viewTheory: false,
              problemNumber: index + 1,
            };
          });
          setgetProblems(newProblems);
          setCertificateInfo(data.certificateInfo);
        } catch (err: any) {
          router.push("/");
        } finally {
          setLoading(false);
        }
      };
      fetchProblems();
    } else {
      const fetchProblems = async () => {
        try {
          const response = await mainfetch<null>(
            "/problems/set?" + path,
            { method: "GET" },
            isLogin
          );
          const data = await response.json();
          // 선택 정답을 추가한 데이터
          const newProblems = data.problems.map((problem: Problem, index: number) => {
            return {
              ...problem,
              chooseNumber: -1,
              viewSolution: false,
              viewTheory: false,
              problemNumber: index + 1,
            };
          });
          setgetProblems(newProblems);
          setCertificateInfo(data.certificateInfo);
        } catch (err: any) {
          router.push("/");
        } finally {
          setLoading(false);
        }
      };

      fetchProblems();
    }
  }, []);

  return { getProblems, certificateInfo, loading, error };
};
export default useProblems;
