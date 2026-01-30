export interface Deal {
  imageUrl: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  countryCode: string;
  cabinClass: string;
  publicFare: number;
  pfPrice: number;
  href: string;
  themeColor: string;
}

export const deals: Deal[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    origin: "New York",
    originCode: "JFK",
    destination: "London",
    destinationCode: "LHR",
    countryCode: "GB",
    cabinClass: "Business Class",
    publicFare: 8900,
    pfPrice: 3200,
    href: "/deals/new-york-london",
    themeColor: "220 40% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    origin: "Los Angeles",
    originCode: "LAX",
    destination: "Tokyo",
    destinationCode: "NRT",
    countryCode: "JP",
    cabinClass: "Business Class",
    publicFare: 9400,
    pfPrice: 3800,
    href: "/deals/los-angeles-tokyo",
    themeColor: "0 50% 30%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    origin: "New York",
    originCode: "JFK",
    destination: "Paris",
    destinationCode: "CDG",
    countryCode: "FR",
    cabinClass: "Business Class",
    publicFare: 7800,
    pfPrice: 2900,
    href: "/deals/new-york-paris",
    themeColor: "240 30% 20%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    origin: "New York",
    originCode: "JFK",
    destination: "Dubai",
    destinationCode: "DXB",
    countryCode: "AE",
    cabinClass: "First Class",
    publicFare: 14500,
    pfPrice: 5800,
    href: "/deals/new-york-dubai",
    themeColor: "35 60% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    origin: "Los Angeles",
    originCode: "LAX",
    destination: "Sydney",
    destinationCode: "SYD",
    countryCode: "AU",
    cabinClass: "Business Class",
    publicFare: 11200,
    pfPrice: 4200,
    href: "/deals/los-angeles-sydney",
    themeColor: "190 50% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    origin: "San Francisco",
    originCode: "SFO",
    destination: "Singapore",
    destinationCode: "SIN",
    countryCode: "SG",
    cabinClass: "Business Class",
    publicFare: 8900,
    pfPrice: 3400,
    href: "/deals/san-francisco-singapore",
    themeColor: "150 40% 22%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80",
    origin: "New York",
    originCode: "JFK",
    destination: "Hong Kong",
    destinationCode: "HKG",
    countryCode: "HK",
    cabinClass: "Business Class",
    publicFare: 10200,
    pfPrice: 4100,
    href: "/deals/new-york-hong-kong",
    themeColor: "0 40% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    origin: "Miami",
    originCode: "MIA",
    destination: "São Paulo",
    destinationCode: "GRU",
    countryCode: "BR",
    cabinClass: "Business Class",
    publicFare: 6400,
    pfPrice: 2600,
    href: "/deals/miami-sao-paulo",
    themeColor: "120 40% 22%",
  },
];
