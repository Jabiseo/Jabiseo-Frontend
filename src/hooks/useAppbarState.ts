import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAppbarState = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [focusTap, setFocusTap] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const path = window.location.pathname;
    let focusTap;
    if (path.includes("bookmark")) {
      focusTap = "북마크";
    } else if (path.includes("search")) {
      focusTap = "검색";
    } else if (path.includes("mypage")) {
      focusTap = "마이페이지";
    } else if (path.includes("login")) {
      focusTap = "로그인";
    } else if (path.includes("learning") || path.includes("study") || path.includes("exam")) {
      focusTap = "문제풀이";
    } else if (path.includes("assistant")) {
      focusTap = "학습비서";
    } else {
      focusTap = "메인페이지";
    }

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
