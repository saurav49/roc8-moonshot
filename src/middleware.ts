import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("access_token")?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith("/category")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (
    currentUser &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register") ||
      request.nextUrl.pathname.startsWith("/otp"))
  ) {
    return Response.redirect(new URL("/category", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
