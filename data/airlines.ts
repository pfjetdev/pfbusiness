export interface Airline {
  name: string;
  logo: string;
  image: string;
  route: string;
  saving: string;
}

export const airlines: Airline[] = [
  {
    name: "Emirates",
    logo: "emirates.svg",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?w=600&q=80",
    route: "Dubai · First & Business",
    saving: "Save up to 60%",
  },
  {
    name: "Qatar Airways",
    logo: "Qatar Airways.svg",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=80",
    route: "Doha · QSuites Business",
    saving: "Save up to 55%",
  },
  {
    name: "Singapore Airlines",
    logo: "Singapore Airlines.svg",
    image: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=600&q=80",
    route: "Singapore · Suites & Business",
    saving: "Save up to 50%",
  },
  {
    name: "Turkish Airlines",
    logo: "Turkish Airlines.svg",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    route: "Istanbul · Business Class",
    saving: "Save up to 45%",
  },
  {
    name: "Air France",
    logo: "Air France.svg",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    route: "Paris · La Première & Business",
    saving: "Save up to 50%",
  },
  {
    name: "Cathay Pacific",
    logo: "Cathay Pacific.svg",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80",
    route: "Hong Kong · Business Class",
    saving: "Save up to 55%",
  },
  {
    name: "Korean Air",
    logo: "Korean Air.svg",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80",
    route: "Seoul · Prestige Suite",
    saving: "Save up to 50%",
  },
  {
    name: "Japan Airlines",
    logo: "Japan Airlines.svg",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    route: "Tokyo · First & Business",
    saving: "Save up to 45%",
  },
  {
    name: "All Nippon Airways",
    logo: "All Nippon Airways.svg",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80",
    route: "Tokyo · The Room Business",
    saving: "Save up to 50%",
  },
  {
    name: "Hainan Airlines",
    logo: "Hainan Airlines.svg",
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80",
    route: "Beijing · Business Class",
    saving: "Save up to 45%",
  },
];
