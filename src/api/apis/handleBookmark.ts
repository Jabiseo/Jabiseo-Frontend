import { mainfetch } from "./mainFetch";

const handleBookmarkModule = async <T>(
  targetProblem: Problem | ProblemViewType | BookMarkProblem | ProblemDetailType,
  isProcessing: boolean,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  callbackArray?: React.Dispatch<React.SetStateAction<T[]>>,
  callbackObject?: React.Dispatch<React.SetStateAction<T>>
) => {
  if (isProcessing) return;

  setIsProcessing(true);
  if (callbackArray) {
    callbackArray((problems: any) => {
      return problems.map((problem: any) =>
        problem.problemId === targetProblem.problemId
          ? { ...problem, isBookmark: !targetProblem.isBookmark }
          : problem
      );
    });
  } else if (callbackObject) {
    callbackObject((targetProblem: any) => {
      return { ...targetProblem, isBookmark: !targetProblem.isBookmark };
    });
  }
  try {
    const method = targetProblem.isBookmark ? "DELETE" : "POST";
    const endpoint = "/bookmarks";

    const res = await mainfetch(
      endpoint,
      {
        method,
        body: {
          problemId: targetProblem.problemId,
        },
      },
      true
    );

    if (!res.ok) {
      if (callbackArray) {
        callbackArray((problems: any) => {
          const handledProblems = problems.map((problem: any) =>
            problem.problemId === targetProblem.problemId
              ? { ...problem, isBookmark: targetProblem.isBookmark }
              : problem
          );
          return handledProblems;
        });
      } else if (callbackObject) {
        callbackObject((targetProblem: any) => {
          return { ...targetProblem, isBookmark: targetProblem.isBookmark };
        });
      }
    }
  } catch (error) {
  } finally {
    setIsProcessing(false); // 처리 완료
  }
};

export default handleBookmarkModule;
