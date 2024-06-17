interface ExamInfo {
  examId: number;
  description: string;
}

interface Subject {
  subjectId: number;
  name: string;
}

interface Problem {
  problemId: number;
  examInfo: ExamInfo;
  subject: Subject;
  isBookmark: boolean;
  description: string;
  choices: string[];
  answerNumber: number;
  theory: string;
  solution: string;
  chooseNumber: number;
}
