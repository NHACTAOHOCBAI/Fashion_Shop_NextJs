import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString());
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  // const pathname = req.nextUrl.pathname;
  // const token = req.cookies.get("access_token")?.value;
  // // ❌ Chưa login
  // if (!token) {
  //   if (pathname.startsWith("/admin") || pathname.startsWith("/client")) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   return NextResponse.next();
  // }

  // const payload = decodeJWT(token);
  // if (!payload || !payload.role) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // const role = payload.role;

  // // 👤 USER → client
  // if (role === "role" && pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/client", req.url));
  // }

  // // 👮 ADMIN / STAFF → admin
  // if (role === "admin" && pathname.startsWith("/client")) {
  //   return NextResponse.redirect(new URL("/admin", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
