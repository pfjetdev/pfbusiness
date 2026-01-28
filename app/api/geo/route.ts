import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const { city, country } = geolocation(request);
  return NextResponse.json({ city: city || "", country: country || "" });
}
