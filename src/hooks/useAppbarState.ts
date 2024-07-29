import { useEffect, useState } from "react";

const useAppbarState = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [focusTap, setFocusTap] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const focusTap = localStorage.getItem("focusTap");

    if (focusTap) {
      setFocusTap(focusTap);
    }

    if (typeof localStorage.getItem("certificate") === "string") {
      const certificate: CertificateType = JSON.parse(localStorage.getItem("certificate")!);
      setCertificate(certificate.name);
    }
    if (accessToken && refreshToken) {
      setIsLogin(true);
    }
  }, []);

  return { isLogin, certificate, focusTap };
};

export default useAppbarState;
