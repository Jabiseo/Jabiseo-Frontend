import { useEffect, useState } from "react";
import { mainfetch } from "../api/apis/mainFetch";

interface userInfo {
  nickname: string;
  profileImage: string;
}

const useAppbarState = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [certificate, setCertificate] = useState("");
  const [focusTap, setFocusTap] = useState("");
  const [userInfo, setUserInfo] = useState<userInfo>();

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
    } else if (path.includes("studyplan") || path.includes("analysis")) {
      focusTap = "학습비서";
    } else if (path.includes("learning") || path.includes("study") || path.includes("exam")) {
      focusTap = "문제풀이";
    } else {
      focusTap = "메인페이지";
    }

    if (focusTap) {
      setFocusTap(focusTap);
    }

    if (accessToken && refreshToken) {
      if (
        typeof localStorage.getItem("certificate") === "string" &&
        typeof localStorage.getItem("myInfo") === "undefined"
      ) {
        const certificate: CertificateType = JSON.parse(localStorage.getItem("certificate")!);
        const myInfo: userInfo = JSON.parse(localStorage.getItem("userInfo")!);
        setCertificate(certificate.name);
        setUserInfo(myInfo);
      } else {
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
            setUserInfo({ nickname: infoData.nickname, profileImage: infoData.profileImage });
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ nickname: infoData.nickname, profileImage: infoData.profileImage })
            );
          } catch (err: any) {
            throw new Error(err);
          }
        };

        getMyInfo();
      }
      setIsLogin(true);
    }
  }, []);

  return { isLogin, certificate, focusTap, userInfo };
};

export default useAppbarState;
