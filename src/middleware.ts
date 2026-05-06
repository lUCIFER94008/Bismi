import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Prevent logged in users from visiting login/register
  if ((pathname === "/login" || pathname === "/register") && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
