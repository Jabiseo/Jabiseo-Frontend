"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleButton = () => {
  const googleID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  /**
   * @param idToken
   * @todo Submit the idToken to the backend
   */
  const submitIdToken = async (idToken: string) => {};
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
