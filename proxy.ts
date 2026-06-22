import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


// with the help of this : it can automatically redirect my url 
export function proxy(req: NextRequest) {
  const session = getSessionCookie(req);
  const { pathname } = req.nextUrl;
  if (!session) {
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/Dashboard", "/dashboard/:path*"],
};
