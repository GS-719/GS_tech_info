// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      // Returns true if a legitimate internal cryptographic payload exists
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login", // Automated fallback routing trigger destination
    },
  }
);

// Gated Paths: Defines exactly what locations trigger the server verification check
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/settings/:path*",
    "/api/user/:path*" // Keeps custom interaction paths locked behind authorization tokens
  ],
};