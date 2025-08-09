import { NextResponse } from "next/server";

/**
 * Middleware function to protect private routes based on presence of a 'token' cookie
 */
export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Define public routes that don't require authentication
  const publicPaths = ["/login", "/signup", "/api", "/_next", "/favicon.ico"];

  // Allow public paths to proceed without authentication
  const isPublic = publicPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  if (isPublic) {
    return NextResponse.next();
  }

  // If no token found, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow access
  return NextResponse.next();
}

/**
 * Configure middleware to run for all routes except _next, favicon, api, etc.
 */
export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
