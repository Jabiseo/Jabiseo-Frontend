import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  const res = NextResponse.next();

  if (accessToken) {
    res.headers.set("Authorization", `Bearer ${accessToken.value}`);
  }

  return res;
}
