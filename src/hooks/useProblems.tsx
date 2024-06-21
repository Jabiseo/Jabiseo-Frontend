import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

const useProblems = () => {
  const [Problems, setProblems] = useState<ProblemWithChooseNumber>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const path = usePathname().split("/study/")[1];
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await mainfetch<null>("/problems/set?" + path, { method: "GET" }, false);
        const data = await response.json();
        // 선택 정답을 추가한 데이터
        const modifyData = data.map((problem: Problem) => {
          return { ...problem, chooseNumber: 0 };
        });
        setProblems(modifyData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return { Problems, loading, error };
};
export default useProblems;
