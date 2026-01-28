import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const { city, country, latitude, longitude } = geolocation(request);
  return NextResponse.json({
    city: city || "",
    country: country || "",
    latitude: latitude || "",
    longitude: longitude || "",
  });
}
