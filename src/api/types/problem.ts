interface ExamInfo {
  examId: string;
  description: string;
}

interface Subject {
  subjectId: string;
  sequence: number;
  name: string;
}

interface Problem {
  problemId: string;
  examInfo: ExamInfo;
  subject: Subject;
  isBookmark: boolean;
  description: string;
  choices: string[];
  answerNumber: number;
  theory: string;
  solution: string;
}

/**
 * Backend의 ProblemType에서 이론, 해설 보기 선택을 위한 viewSolution, viewTheory가 추가된 타입입니다.
 */
interface ProblemViewType extends Problem {
  chooseNumber: number;
  viewSolution: boolean;
  viewTheory: boolean;
}
