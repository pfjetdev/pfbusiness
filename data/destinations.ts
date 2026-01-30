export interface Destination {
  city: string;
  country: string;
  countryCode: string;
  imageUrl: string;
  fromPrice: number;
  airportCode: string;
}

export type RegionName = "Europe" | "Asia" | "Middle East" | "Africa" | "Oceania" | "Americas";

export const REGIONS: Record<RegionName, Destination[]> = {
  Europe: [
    { city: "London", country: "United Kingdom", countryCode: "GB", imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop", fromPrice: 2499, airportCode: "LHR" },
    { city: "Paris", country: "France", countryCode: "FR", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop", fromPrice: 2399, airportCode: "CDG" },
    { city: "Rome", country: "Italy", countryCode: "IT", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop", fromPrice: 2599, airportCode: "FCO" },
    { city: "Barcelona", country: "Spain", countryCode: "ES", imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop", fromPrice: 2299, airportCode: "BCN" },
    { city: "Amsterdam", country: "Netherlands", countryCode: "NL", imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop", fromPrice: 2449, airportCode: "AMS" },
    { city: "Munich", country: "Germany", countryCode: "DE", imageUrl: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400&h=300&fit=crop", fromPrice: 2549, airportCode: "MUC" },
  ],
  Asia: [
    { city: "Tokyo", country: "Japan", countryCode: "JP", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop", fromPrice: 3299, airportCode: "NRT" },
    { city: "Singapore", country: "Singapore", countryCode: "SG", imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop", fromPrice: 3199, airportCode: "SIN" },
    { city: "Bangkok", country: "Thailand", countryCode: "TH", imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop", fromPrice: 2899, airportCode: "BKK" },
    { city: "Hong Kong", country: "Hong Kong", countryCode: "HK", imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400&h=300&fit=crop", fromPrice: 3099, airportCode: "HKG" },
    { city: "Seoul", country: "South Korea", countryCode: "KR", imageUrl: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7?w=400&h=300&fit=crop", fromPrice: 3149, airportCode: "ICN" },
    { city: "Bali", country: "Indonesia", countryCode: "ID", imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop", fromPrice: 2999, airportCode: "DPS" },
  ],
  "Middle East": [
    { city: "Dubai", country: "UAE", countryCode: "AE", imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop", fromPrice: 2799, airportCode: "DXB" },
    { city: "Abu Dhabi", country: "UAE", countryCode: "AE", imageUrl: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&h=300&fit=crop", fromPrice: 2699, airportCode: "AUH" },
    { city: "Doha", country: "Qatar", countryCode: "QA", imageUrl: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=300&fit=crop", fromPrice: 2849, airportCode: "DOH" },
    { city: "Tel Aviv", country: "Israel", countryCode: "IL", imageUrl: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=300&fit=crop", fromPrice: 2599, airportCode: "TLV" },
    { city: "Amman", country: "Jordan", countryCode: "JO", imageUrl: "https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=400&h=300&fit=crop", fromPrice: 2449, airportCode: "AMM" },
    { city: "Riyadh", country: "Saudi Arabia", countryCode: "SA", imageUrl: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop", fromPrice: 2749, airportCode: "RUH" },
  ],
  Africa: [
    { city: "Cape Town", country: "South Africa", countryCode: "ZA", imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop", fromPrice: 3499, airportCode: "CPT" },
    { city: "Marrakech", country: "Morocco", countryCode: "MA", imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400&h=300&fit=crop", fromPrice: 2399, airportCode: "RAK" },
    { city: "Cairo", country: "Egypt", countryCode: "EG", imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&h=300&fit=crop", fromPrice: 2299, airportCode: "CAI" },
    { city: "Nairobi", country: "Kenya", countryCode: "KE", imageUrl: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=400&h=300&fit=crop", fromPrice: 3199, airportCode: "NBO" },
    { city: "Johannesburg", country: "South Africa", countryCode: "ZA", imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=400&h=300&fit=crop", fromPrice: 3299, airportCode: "JNB" },
    { city: "Casablanca", country: "Morocco", countryCode: "MA", imageUrl: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400&h=300&fit=crop", fromPrice: 2199, airportCode: "CMN" },
  ],
  Oceania: [
    { city: "Sydney", country: "Australia", countryCode: "AU", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop", fromPrice: 3699, airportCode: "SYD" },
    { city: "Melbourne", country: "Australia", countryCode: "AU", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop", fromPrice: 3599, airportCode: "MEL" },
    { city: "Auckland", country: "New Zealand", countryCode: "NZ", imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300&fit=crop", fromPrice: 3799, airportCode: "AKL" },
    { city: "Fiji", country: "Fiji", countryCode: "FJ", imageUrl: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&h=300&fit=crop", fromPrice: 3499, airportCode: "NAN" },
    { city: "Queenstown", country: "New Zealand", countryCode: "NZ", imageUrl: "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=400&h=300&fit=crop", fromPrice: 3899, airportCode: "ZQN" },
    { city: "Perth", country: "Australia", countryCode: "AU", imageUrl: "https://images.unsplash.com/photo-1573935448851-d3c46e0aee4b?w=400&h=300&fit=crop", fromPrice: 3449, airportCode: "PER" },
  ],
  Americas: [
    { city: "New York", country: "USA", countryCode: "US", imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop", fromPrice: 1899, airportCode: "JFK" },
    { city: "Miami", country: "USA", countryCode: "US", imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop", fromPrice: 1799, airportCode: "MIA" },
    { city: "Cancun", country: "Mexico", countryCode: "MX", imageUrl: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=400&h=300&fit=crop", fromPrice: 1699, airportCode: "CUN" },
    { city: "Rio de Janeiro", country: "Brazil", countryCode: "BR", imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop", fromPrice: 2899, airportCode: "GIG" },
    { city: "Buenos Aires", country: "Argentina", countryCode: "AR", imageUrl: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=400&h=300&fit=crop", fromPrice: 2799, airportCode: "EZE" },
    { city: "Vancouver", country: "Canada", countryCode: "CA", imageUrl: "https://images.unsplash.com/photo-1559511260-66a68e582973?w=400&h=300&fit=crop", fromPrice: 2099, airportCode: "YVR" },
  ],
};

export const REGION_NAMES = Object.keys(REGIONS) as RegionName[];
