"use client";
import KakaoLogin from "react-kakao-login";

const Test = () => {
  const kakaoClientId: string = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;

  const kakaoOnSuccess = async (data: any) => {
    const idToken = data.response.id_token;
    console.log(idToken);
  };
  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };
  return (
    <>
      <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
    </>
  );
};
export default Test;
