export const refreshTokenInterceptor = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + "/auth/reissue";
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  // todo : accessToken 또는 refreshToken 없을 경우 로그인 페이지로 이동
  if (!refreshToken || !accessToken) return;
  const token = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then(res => res.json())
    .then(data => data.accessToken)
    .catch(() => null);
  if (!token) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return new Error("토큰 재발급 실패");
  }
  localStorage.setItem("accessToken", token);
  return token;
};
