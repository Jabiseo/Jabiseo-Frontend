"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleButton = () => {
  const googleID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  /**
   * @param idToken
   * @todo Submit the idToken to the backend
   */
  const submitIdToken = async (idToken: string) => {
    console.log(idToken);
  };
  return (
    <GoogleOAuthProvider clientId={googleID || ""}>
      <div>
        <GoogleLogin
          onSuccess={data => {
            submitIdToken(data.credential ?? "");
          }}
          onError={() => {}}
          type="icon"
          shape="circle"
          size="small"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
