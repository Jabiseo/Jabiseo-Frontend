interface BookMarkProblem {
  problemId: number;
  examInfo: ExamInfo;
  subjectInfo: Subject;
  isBookmark: boolean;
  description: string;
}

interface handleBookmarkProps {
  targetProblem: Problem;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  callbackArray?: React.Dispatch<React.SetStateAction<Problem[]>>;
  callbackObject?: React.Dispatch<React.SetStateAction<Problem>>;
}
