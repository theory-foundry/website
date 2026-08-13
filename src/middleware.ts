import { NextResponse, type NextRequest } from "next/server";

const LEGACY_HOSTNAMES = new Set(["rjlssystems.com", "www.rjlssystems.com"]);

export function middleware(request: NextRequest) {
  const requestHostname = request.headers.get("host")?.split(":", 1)[0] ?? request.nextUrl.hostname;

  if (!LEGACY_HOSTNAMES.has(requestHostname)) {
    return NextResponse.next();
  }

  const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, "https://theoryfoundry.com");

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
