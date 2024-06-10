"use client";

import Image from "next/image";
import KakaoLogin from "react-kakao-login";
import Icon from "@/public/kakaoIcon.png";

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
      <Image src={Icon} alt="kakao" width={300} height={45} />
    </button>
  );
};
export default KakaoButton;
