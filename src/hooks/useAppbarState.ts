import { useEffect, useState } from "react";

const useAppbarState = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [certificate, setCertificate] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (typeof localStorage.getItem("certificate") === "string") {
      const certificate: CertificateType = JSON.parse(localStorage.getItem("certificate")!);
      setCertificate(certificate.name);
    }
    if (accessToken && refreshToken) {
      setIsLogin(true);
    }
  }, []);

  return { isLogin, certificate };
};

export default useAppbarState;
