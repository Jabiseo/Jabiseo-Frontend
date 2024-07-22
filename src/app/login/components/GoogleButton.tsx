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
    )
      .then(res => res.json())
      .catch();

    if (res.status === 200) {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      window.location.href = "/";
    } else {
      // todo : 회원 탈퇴
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
