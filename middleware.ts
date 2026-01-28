import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { city, country } = geolocation(request);

  const requestHeaders = new Headers(request.headers);
  if (city) requestHeaders.set("x-user-city", city);
  if (country) requestHeaders.set("x-user-country", country);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/"],
};
