import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("sessionId")?.value;

  console.log(token);
  //   backend validation

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("status", "1");
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    const response = backendvalidate(token);
    console.log(response);

    if (response.status === "1" || response.status === "2") {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("status", response.status);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/outbound/:path*", "/about/:path*"],
};

function backendvalidate(token) {
  if (!token) {
    // expired
    return { status: "1" };
  } else if (token !== "abc123") {
    // unauthorized
    return { status: "2" };
  }

  return true;
}
