// 자격증 타입 정의
interface CertificateType {
  certificateId: number;
  name: string;
}

// 자격증 정보 타입 정의
interface CertificateInfo {
  certificateId: number;
  name: string;
  exams: ExamInfo[];
  subjects: Subject[];
}
