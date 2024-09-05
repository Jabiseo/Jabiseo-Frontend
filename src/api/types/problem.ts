interface ExamInfo {
  examId: number;
  description: string;
}

interface Subject {
  subjectId: number;
  sequence: number;
  name: string;
}

interface Chocice {
  choice: string;
}

interface Problem {
  problemId: number;
  examInfo: ExamInfo;
  subjectInfo: Subject;
  isBookmark: boolean;
  description: string;
  choices: Chocice[];
  answerNumber: number;
  theory: string;
  solution: string;
}

/**
 * Backend의 ProblemType에서 이론, 해설 보기 선택을 위한 viewSolution, viewTheory, 문제 번호를 위한 problemNumber가 추가된 타입입니다.
 */
interface ProblemViewType extends Problem {
  chooseNumber: number;
  viewSolution: boolean;
  viewTheory: boolean;
  problemNumber: number;
}

interface SubmitResultType {
  learningTime: number;
  certificateId: number;
  learningMode: "STUDY" | "EXAM";
  problems: { problemId: number; choice: number }[];
}
