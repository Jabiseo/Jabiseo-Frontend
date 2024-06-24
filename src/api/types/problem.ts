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

interface ProblemWithChooseNumber extends Problem {
  chooseNumber: number;
}
