import {  NextResponse } from "next/server";
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest){
//   Add a new header x-current-path which cntains the value of the current path. This header can be accessed by downstream components to find out the current path especially in server components. Read this for more information, https://www.propelauth.com/post/getting-url-in-next-server-components

const headers = new Headers(request.headers);
headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers})
}

export const config = {
    matcher: [
        // match all routes except static files and APIs
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};