import { useMemo } from "react";
import Fuse from "fuse.js";
import { cities, type City } from "@/data/airports";

// Flat record for Fuse indexing — one entry per city, with all searchable text
interface SearchRecord {
  city: City;
  cityName: string;
  cityCode: string;
  country: string;
  airportCodes: string;   // "JFK EWR LGA"
  airportNames: string;   // "John F Kennedy Newark Liberty LaGuardia"
  keywords: string;       // "manhattan brooklyn jersey nyc"
}

const searchRecords: SearchRecord[] = cities.map((city) => ({
  city,
  cityName: city.name,
  cityCode: city.code,
  country: city.country,
  airportCodes: city.airports.map((a) => a.code).join(" "),
  airportNames: city.airports.map((a) => a.name).join(" "),
  keywords: city.keywords?.join(" ") || "",
}));

// Single global Fuse instance — created once, reused across all renders
const fuse = new Fuse(searchRecords, {
  keys: [
    { name: "cityName", weight: 5 },
    { name: "cityCode", weight: 4 },
    { name: "airportCodes", weight: 3 },
    { name: "keywords", weight: 3 },
    { name: "airportNames", weight: 2 },
    { name: "country", weight: 1 },
  ],
  threshold: 0.35,        // tolerant enough for "new yors" → "New York"
  distance: 200,          // allow matches further into long strings
  minMatchCharLength: 2,
  includeScore: true,
  shouldSort: true,
});

export function useAirportSearch(query: string): City[] {
  return useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];

    // Exact IATA code match — prioritize (instant, no fuzz needed)
    const upper = trimmed.toUpperCase();
    if (upper.length === 3) {
      const exactCity = cities.find((c) => c.code === upper);
      if (exactCity) {
        const fuseResults = fuse.search(trimmed, { limit: 19 })
          .map((r) => r.item.city)
          .filter((c) => c.code !== upper);
        return [exactCity, ...fuseResults];
      }
      const exactAirport = cities.find((c) =>
        c.airports.some((a) => a.code === upper)
      );
      if (exactAirport) {
        const fuseResults = fuse.search(trimmed, { limit: 19 })
          .map((r) => r.item.city)
          .filter((c) => c.code !== exactAirport.code);
        return [exactAirport, ...fuseResults];
      }
    }

    return fuse.search(trimmed, { limit: 20 }).map((r) => r.item.city);
  }, [query]);
}
