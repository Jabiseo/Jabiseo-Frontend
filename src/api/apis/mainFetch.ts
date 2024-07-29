import { refreshTokenInterceptor } from "./interceptor";

interface Options<T> {
  method: string;
  body?: T;
}

/**
 *
 * @param url api/ 이후 부터 url을 붙입니다.
 * @param options method, body를 붙입니다, body의 타입은 mainfetch<T>의 T에 따라 달라집니다.
 * @param needLogin 로그인이 필수인 경우 true를 붙입니다.
 * @returns fetch의 결과인 Promise<Response>를 반환합니다. 이후 .then을 통해 데이터를 받아옵니다.
 * @example
 * const res = await mainfetch("/auth/login", { method: "POST", body: { email, password } }, false);
 * const data = await res.json();
 */
export const mainfetch = async <T>(
  path: string,
  options: Options<T>,
  needLogin: boolean
): Promise<Response> => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + path;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (needLogin) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) {
      window.location.href = "/login";
      throw new Error("Access token or refresh token is missing");
    }
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const fetchOptions: RequestInit = {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : null,
  };

  let response = await fetch(url, fetchOptions);
  if (response.status === 401 && needLogin) {
    const newAccessToken = await refreshTokenInterceptor();
    headers.Authorization = `Bearer ${newAccessToken}`;
    response = await fetch(url, { ...fetchOptions, headers });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }

  return response;
};
