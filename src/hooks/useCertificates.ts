import { useState, useEffect } from "react";
import { mainfetch } from "../api/apis/mainFetch";

const useCertificates = () => {
  const [certificates, setCertificates] = useState<CertificateInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await mainfetch<null>("/certificates", { method: "GET" }, false);
        const data = await response.json();
        setCertificates(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return { certificates, loading, error };
};

export default useCertificates;
