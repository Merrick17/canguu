import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  let token = await getToken({ req });
//   console.log("Token", token);
//   const url = req.nextUrl.clone();
//   url.pathname = "/";
//   if (token) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/create", "/marketplace", "/wallet"],
};
