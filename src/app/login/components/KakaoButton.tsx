"use client";

import Image from "next/image";
import KakaoLogin from "react-kakao-login";

import { mainfetch } from "@/src/api/apis/mainFetch";

const KakaoButton: React.FC = () => {
  const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

  /**
   *
   * @param data
   * @todo idToken 서버로 전송 및 토큰 받아오기
   */
  const kakaoOnSuccess = async (data: any) => {
    const idToken = data.response.id_token;
    submitIdToken(idToken);
  };

  const submitIdToken = async (idToken: string) => {
    const res = await mainfetch(
      "/auth/login",
      { method: "POST", body: { idToken, oauthServer: "KAKAO" } },
      false
    )
      .then(res => res.json())
      .catch();

    if (res.status === 200) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      window.location.href = "/";
    } else {
      // todo : error handling
    }
  };

  const kakaoOnFailure = (error: any) => {};
  return (
    <KakaoLogin
      token={kakaoClientId!.toString()}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      render={props => (
        <div style={{ width: "300px", height: "45px" }}>
          <KaKaoIcon onClick={props.onClick} />
        </div>
      )}
    />
  );
};

interface props {
  onClick: () => void;
}

const KaKaoIcon: React.FC<props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      <Image src="/kakaoIcon.png" alt="kakao" width={300} height={45} />
    </button>
  );
};
export default KakaoButton;
