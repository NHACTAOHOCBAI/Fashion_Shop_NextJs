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
  // console.log(13);
  // const { pathname } = req.nextUrl;

  // const token = req.cookies.get("access_token")?.value;
  // const user = token ? decodeJWT(token) : null;
  // const role = user?.role;
  // console.log(token);
  // console.log(user);
  // // ============================
  // // 1. Chưa đăng nhập
  // // ============================
  // if (!token) {
  //   if (pathname.startsWith("/admin") || pathname.startsWith("/client")) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  //   return NextResponse.next();
  // }

  // // ============================
  // // 2. Đã đăng nhập nhưng vào login
  // // ============================
  // if (pathname.startsWith("/login")) {
  //   if (role === "admin")
  //     return NextResponse.redirect(new URL("/admin/dashboard/", req.url));
  //   if (role === "user")
  //     return NextResponse.redirect(new URL("/client/home", req.url));
  // }

  // // ============================
  // // 3. Phân quyền theo role
  // // ============================
  // if (pathname.startsWith("/admin") && role !== "admin") {
  //   return NextResponse.redirect(new URL("/403", req.url));
  // }

  // if (pathname.startsWith("/client") && role !== "user") {
  //   return NextResponse.redirect(new URL("/403", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/login"],
};
