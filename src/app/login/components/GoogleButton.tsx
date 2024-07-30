"use client";

import { mainfetch } from "@/src/api/apis/mainFetch";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleButton = () => {
  const googleID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  /**
   * @param idToken
   * @todo idToken 서버로 전송 및 토큰 받아오기
   */
  const submitIdToken = async (idToken: string) => {
    const res = await mainfetch(
      "/auth/login",
      { method: "POST", body: { idToken, oauthServer: "GOOGLE" } },
      false
    );

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/";
    } else {
      alert("로그인에 실패했습니다.");
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId={googleID!}>
        <GoogleLogin
          onSuccess={data => {
            submitIdToken(data.credential ?? "");
          }}
          onError={() => {}}
          width="300"
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleButton;
