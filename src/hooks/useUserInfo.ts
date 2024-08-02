import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<string>("");
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const [infoResponse, certificateResponse, certificatesResponse] = await Promise.all([
          mainfetch("/members/myinfo", { method: "GET" }, true),
          mainfetch("/members/myinfo/certificates", { method: "GET" }, true),
          mainfetch(
            "/certificates",
            {
              method: "GET",
            },
            false
          ),
        ]);

        if (infoResponse.status === 401 || certificateResponse.status === 401) {
          window.location.href = "/login";
          return;
        }

        if (!infoResponse.ok || !certificateResponse.ok || !certificatesResponse.ok) {
          throw new Error("Failed to get user information, certificate, or certificates");
        }
        const infoData = await infoResponse.json();
        const certificateData = await certificateResponse.json();
        const certificatesData = await certificatesResponse.json();
        if (certificateData.certificateId) {
          const cert = certificatesData.find(
            (certificate: any) => certificate.certificateId === certificateData.certificateId
          );
          localStorage.setItem("certificate", JSON.stringify(cert));
          setCertificate(cert.name);
        }
        setUserInfo(infoData);
        setCertificates(certificatesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMyInfo();
  }, []);

  return { userInfo, loading, error, certificate, certificates };
};

export default useUserInfo;
