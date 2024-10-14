interface VulnerableSubject {
  subjectId: number;
  subjectName: string;
  vulnerableRate: number;
}

interface VulnerableTag {
  tagId: number;
  tagName: string;
  vulnerableRate: number;
}

interface AnalysisToday {
  studyModeCount: number;
  examModeCount: number;
  studyModeCorrectRate: number;
  examModeCorrectRate: number;
}
