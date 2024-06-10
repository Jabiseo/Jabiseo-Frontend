"use client";

import { SiKakaotalk } from "react-icons/si";
import KakaoLogin from "react-kakao-login";

const KakaoButton: React.FC = () => {
  const kakaoClientId: string | undefined = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

  /**
   *
   * @param data
   * @todo Submit the idToken to the backend
   */
  const kakaoOnSuccess = async (data: any) => {
    const idToken = data.response.id_token;
    console.log(idToken);
  };
  const kakaoOnFailure = (error: any) => {
    console.log(error);
  };
  return (
    <KakaoLogin
      token={kakaoClientId?.toString() || ""}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      render={props => (
        <div>
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
    <SiKakaotalk
      onClick={onClick}
      style={{ background: "black", color: "yellow", borderRadius: "9999px" }}
    />
  );
};
export default KakaoButton;
