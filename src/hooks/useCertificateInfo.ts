import { useState, useEffect } from "react";
import { mainfetch } from "../api/apis/mainFetch";

const useCertificateInfo = () => {
  const [certificateInfo, setCertificateInfo] = useState<CertificateInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const certificate = localStorage.getItem("certificate");
    const certificateId = certificate ? JSON.parse(certificate).certificateId : null;
    const fetchCertificates = async () => {
      try {
        const response = await mainfetch<null>(
          "/certificates/" + certificateId,
          { method: "GET" },
          false
        );
        const data = await response.json();
        data.exams.splice(0, 0, { examId: "0", description: "무작위 모의고사" });
        setCertificateInfo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return { certificateInfo, loading, error };
};

export default useCertificateInfo;
