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
export const mainfetch = async <T>(url: string, options: Options<T>, needLogin: boolean) => {
  if (needLogin) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    // todo : accessToken 없을 경우 로그인 페이지로 이동
    if (!accessToken || !refreshToken) {
      throw new Error("accessToken or refreshToken is not exist");
    }
    const res = await fetch(url, {
      method: options.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: options.body ? JSON.stringify(options.body) : null,
    });
    if (res.status === 401) {
      if (!refreshToken) {
        throw new Error("accessToken or refreshToken is not exist");
      }
      const accessToken = await refreshTokenInterceptor();
      return await fetch(url, {
        method: options.method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    }
    return res;
  } else {
    return await fetch(url, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : null,
    });
  }
};
