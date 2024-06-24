// 자격증 타입 정의
interface CertificateType {
  certificateId: string;
  name: string;
}

// 자격증 정보 타입 정의
interface CertificateInfo {
  certificateId: string;
  name: string;
  exams: ExamInfo[];
  subjects: Subject[];
}
