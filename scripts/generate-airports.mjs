import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, "../airports (5).csv");
const outPath = resolve(__dirname, "../data/airports.ts");

// Parse CSV (handle quoted fields)
function parseCSV(text) {
  const lines = text.split("\n");
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => (row[h] = values[idx] || ""));
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current.trim());
  return result;
}

const csv = readFileSync(csvPath, "utf-8");
const rows = parseCSV(csv);

// Filter: large + medium airports with IATA code and scheduled service
const filtered = rows.filter((r) => {
  const type = r.type;
  const iata = r.iata_code;
  const scheduled = r.scheduled_service;
  return (
    (type === "large_airport" || type === "medium_airport") &&
    iata &&
    iata.length === 3 &&
    scheduled === "yes"
  );
});

console.log(`Total rows: ${rows.length}`);
console.log(`Filtered (large+medium, IATA, scheduled): ${filtered.length}`);

// Country code -> country name mapping (top countries)
const countryNames = {
  US: "United States", CA: "Canada", MX: "Mexico", BR: "Brazil", AR: "Argentina",
  CO: "Colombia", CL: "Chile", PE: "Peru", EC: "Ecuador", VE: "Venezuela",
  GB: "United Kingdom", FR: "France", DE: "Germany", ES: "Spain", IT: "Italy",
  NL: "Netherlands", BE: "Belgium", CH: "Switzerland", AT: "Austria", PT: "Portugal",
  GR: "Greece", TR: "Turkey", SE: "Sweden", NO: "Norway", DK: "Denmark",
  FI: "Finland", IE: "Ireland", PL: "Poland", CZ: "Czech Republic", HU: "Hungary",
  RO: "Romania", BG: "Bulgaria", HR: "Croatia", RS: "Serbia", SK: "Slovakia",
  SI: "Slovenia", LT: "Lithuania", LV: "Latvia", EE: "Estonia", IS: "Iceland",
  UA: "Ukraine", BY: "Belarus", MD: "Moldova", GE: "Georgia", AM: "Armenia",
  AZ: "Azerbaijan", RU: "Russia", KZ: "Kazakhstan", UZ: "Uzbekistan",
  JP: "Japan", CN: "China", KR: "South Korea", TW: "Taiwan", HK: "Hong Kong",
  MO: "Macau", IN: "India", TH: "Thailand", VN: "Vietnam", SG: "Singapore",
  MY: "Malaysia", ID: "Indonesia", PH: "Philippines", KH: "Cambodia", MM: "Myanmar",
  LA: "Laos", BD: "Bangladesh", LK: "Sri Lanka", NP: "Nepal", PK: "Pakistan",
  AU: "Australia", NZ: "New Zealand", FJ: "Fiji", PG: "Papua New Guinea",
  AE: "United Arab Emirates", SA: "Saudi Arabia", QA: "Qatar", KW: "Kuwait",
  BH: "Bahrain", OM: "Oman", JO: "Jordan", LB: "Lebanon", IL: "Israel",
  EG: "Egypt", MA: "Morocco", TN: "Tunisia", DZ: "Algeria", ZA: "South Africa",
  NG: "Nigeria", KE: "Kenya", ET: "Ethiopia", GH: "Ghana", TZ: "Tanzania",
  UG: "Uganda", RW: "Rwanda", SN: "Senegal", CI: "Ivory Coast", CM: "Cameroon",
  AO: "Angola", MZ: "Mozambique", MU: "Mauritius", SC: "Seychelles",
  CU: "Cuba", JM: "Jamaica", DO: "Dominican Republic", PR: "Puerto Rico",
  TT: "Trinidad and Tobago", PA: "Panama", CR: "Costa Rica", GT: "Guatemala",
  HN: "Honduras", SV: "El Salvador", NI: "Nicaragua", BZ: "Belize",
  BS: "Bahamas", BB: "Barbados", KY: "Cayman Islands", AW: "Aruba",
  CW: "Curaçao", BM: "Bermuda", TC: "Turks and Caicos", AG: "Antigua and Barbuda",
  LC: "Saint Lucia", GD: "Grenada", VC: "Saint Vincent", DM: "Dominica",
  MT: "Malta", CY: "Cyprus", LU: "Luxembourg", AL: "Albania", MK: "North Macedonia",
  ME: "Montenegro", BA: "Bosnia and Herzegovina", XK: "Kosovo",
  LY: "Libya", SD: "Sudan", IQ: "Iraq", IR: "Iran", AF: "Afghanistan",
  TM: "Turkmenistan", TJ: "Tajikistan", KG: "Kyrgyzstan", MN: "Mongolia",
  BN: "Brunei", TL: "Timor-Leste", MV: "Maldives", BT: "Bhutan",
  MW: "Malawi", ZM: "Zambia", ZW: "Zimbabwe", BW: "Botswana", NA: "Namibia",
  SZ: "Eswatini", LS: "Lesotho", MG: "Madagascar", RE: "Réunion",
  GP: "Guadeloupe", MQ: "Martinique", GF: "French Guiana", YT: "Mayotte",
  NC: "New Caledonia", PF: "French Polynesia", WS: "Samoa", TO: "Tonga",
  VU: "Vanuatu", SB: "Solomon Islands", GU: "Guam", MP: "Northern Mariana Islands",
  AS: "American Samoa", UM: "US Minor Outlying Islands",
  BO: "Bolivia", PY: "Paraguay", UY: "Uruguay", GY: "Guyana", SR: "Suriname",
  FK: "Falkland Islands", HT: "Haiti", ML: "Mali", BF: "Burkina Faso",
  NE: "Niger", TD: "Chad", CF: "Central African Republic", CG: "Republic of the Congo",
  CD: "DR Congo", GA: "Gabon", GQ: "Equatorial Guinea", ST: "São Tomé and Príncipe",
  ER: "Eritrea", DJ: "Djibouti", SO: "Somalia", SS: "South Sudan",
  BI: "Burundi", GM: "Gambia", GW: "Guinea-Bissau", GN: "Guinea",
  SL: "Sierra Leone", LR: "Liberia", TG: "Togo", BJ: "Benin",
  MR: "Mauritania", CV: "Cape Verde", KM: "Comoros",
  PS: "Palestine", SY: "Syria", YE: "Yemen",
};

// Metro area mapping — merge satellite municipalities into main metro entry
// Keys are exact "municipality__country" from CSV
const metroAreas = {
  // === North America ===
  "New York__US":         { name: "New York", code: "NYC", primary: "JFK", mergeFrom: ["Newark__US", "Newburgh__US", "White Plains__US", "Islip__US"], keywords: ["manhattan", "brooklyn", "queens", "bronx", "jersey", "nyc"] },
  "Los Angeles__US":      { name: "Los Angeles", code: "LAX", primary: "LAX", mergeFrom: ["Burbank__US", "Long Beach__US", "Ontario__US", "Santa Ana__US"], keywords: ["hollywood", "la", "socal", "orange county", "lax"] },
  "San Francisco__US":    { name: "San Francisco", code: "SFO", primary: "SFO", mergeFrom: ["Oakland__US", "San Jose__US"], keywords: ["bay area", "silicon valley", "sf", "sfo"] },
  "Washington__US":       { name: "Washington D.C.", code: "WAS", primary: "IAD", mergeFrom: ["Dulles__US", "Baltimore__US"], keywords: ["dc", "virginia", "maryland", "dmv", "arlington", "dulles", "bwi"] },
  "Miami__US":            { name: "Miami", code: "MIA", primary: "MIA", mergeFrom: ["Fort Lauderdale__US", "West Palm Beach__US"], keywords: ["south florida", "ft lauderdale", "mia"] },
  "Dallas-Fort Worth__US":{ name: "Dallas / Fort Worth", code: "DFW", primary: "DFW", mergeFrom: ["Dallas__US", "Fort Worth__US"], keywords: ["dfw", "texas", "dallas", "love field"] },
  "Houston__US":          { name: "Houston", code: "IAH", primary: "IAH", mergeFrom: [], keywords: ["texas", "hobby", "intercontinental"] },
  "Toronto__CA":          { name: "Toronto", code: "YTO", primary: "YYZ", mergeFrom: ["Hamilton__CA"], keywords: ["gta", "ontario", "pearson", "yyz"] },
  "Montreal__CA":         { name: "Montreal", code: "YMQ", primary: "YUL", mergeFrom: [], keywords: ["quebec", "trudeau", "mirabel"] },

  // === Europe ===
  "London__GB":           { name: "London", code: "LON", primary: "LHR", mergeFrom: ["London, Essex__GB", "Luton, Bedfordshire__GB", "Southend-on-Sea, Essex__GB"], keywords: ["uk", "england", "heathrow", "gatwick", "stansted", "luton", "city airport", "lhr", "lgw", "stn", "ltn"] },
  "Paris (Roissy-en-France, Val-d'Oise)__FR": { name: "Paris", code: "PAR", primary: "CDG", mergeFrom: ["Paris (Orly, Val-de-Marne)__FR", "Paris__FR", "Beauvais__FR"], keywords: ["france", "cdg", "charles de gaulle", "orly", "beauvais", "roissy", "le bourget"] },
  "Rome__IT":             { name: "Rome", code: "ROM", primary: "FCO", mergeFrom: [], keywords: ["roma", "fiumicino", "ciampino", "fco"] },
  "Ferno (VA)__IT":       { name: "Milan", code: "MIL", primary: "MXP", mergeFrom: ["Segrate (MI)__IT", "Orio al Serio (BG)__IT"], keywords: ["milano", "malpensa", "linate", "bergamo", "mxp"] },
  "Berlin__DE":           { name: "Berlin", code: "BER", primary: "BER", mergeFrom: [], keywords: ["germany", "brandenburg"] },
  "Frankfurt am Main__DE":{ name: "Frankfurt", code: "FRA", primary: "FRA", mergeFrom: ["Frankfurt am Main (Lautzenhausen)__DE"], keywords: ["hahn", "germany", "fra"] },
  "Düsseldorf__DE":       { name: "Düsseldorf / Cologne", code: "DUS", primary: "DUS", mergeFrom: ["Köln (Cologne)__DE"], keywords: ["cologne", "koln", "dusseldorf", "germany"] },
  "Arnavutköy, Istanbul__TR": { name: "Istanbul", code: "IST", primary: "IST", mergeFrom: ["Pendik, Istanbul__TR"], keywords: ["turkey", "turkiye", "sabiha gokcen", "ist", "saw"] },
  "Zaventem__BE":         { name: "Brussels", code: "BRU", primary: "BRU", mergeFrom: ["Charleroi__BE"], keywords: ["belgium", "bruxelles", "brussel", "bru", "crl"] },
  "Amsterdam__NL":        { name: "Amsterdam", code: "AMS", primary: "AMS", mergeFrom: ["Eindhoven__NL", "Rotterdam__NL"], keywords: ["schiphol", "holland", "netherlands", "ams"] },
  "Stockholm__SE":        { name: "Stockholm", code: "STO", primary: "ARN", mergeFrom: ["Nyköping__SE"], keywords: ["arlanda", "skavsta", "arn", "sweden"] },
  "Copenhagen__DK":       { name: "Copenhagen", code: "CPH", primary: "CPH", mergeFrom: ["Malmö__SE"], keywords: ["kobenhavn", "kastrup", "denmark", "cph"] },
  "Oslo (Gardermoen)__NO":{ name: "Oslo", code: "OSL", primary: "OSL", mergeFrom: ["Sandefjord(Torp)__NO"], keywords: ["norway", "gardermoen", "torp", "osl"] },
  "Moscow__RU":           { name: "Moscow", code: "MOW", primary: "SVO", mergeFrom: [], keywords: ["sheremetyevo", "domodedovo", "vnukovo", "zhukovsky", "svo", "dme", "vko", "moskva"] },
  "Madrid__ES":           { name: "Madrid", code: "MAD", primary: "MAD", mergeFrom: [], keywords: ["spain", "barajas", "mad"] },
  "Barcelona__ES":        { name: "Barcelona", code: "BCN", primary: "BCN", mergeFrom: [], keywords: ["spain", "el prat", "bcn"] },
  "Helsinki__FI":         { name: "Helsinki", code: "HEL", primary: "HEL", mergeFrom: [], keywords: ["finland", "vantaa", "hel"] },
  "Warsaw__PL":           { name: "Warsaw", code: "WAW", primary: "WAW", mergeFrom: ["Modlin__PL"], keywords: ["poland", "warszawa", "chopin", "modlin"] },
  "Bucharest__RO":        { name: "Bucharest", code: "BUH", primary: "OTP", mergeFrom: ["Otopeni__RO"], keywords: ["romania", "henri coanda", "otopeni", "bucuresti"] },

  // === Asia ===
  "Tokyo__JP":            { name: "Tokyo", code: "TYO", primary: "HND", mergeFrom: ["Narita__JP"], keywords: ["haneda", "narita", "japan", "hnd", "nrt"] },
  "Seoul__KR":            { name: "Seoul", code: "SEL", primary: "ICN", mergeFrom: [], keywords: ["incheon", "gimpo", "korea", "icn", "gmp"] },
  "Beijing__CN":          { name: "Beijing", code: "BJS", primary: "PEK", mergeFrom: [], keywords: ["peking", "daxing", "capital", "pek", "pkx", "china"] },
  "Shanghai__CN":         { name: "Shanghai", code: "SHA", primary: "PVG", mergeFrom: [], keywords: ["pudong", "hongqiao", "pvg", "china"] },
  "Bangkok__TH":          { name: "Bangkok", code: "BKK", primary: "BKK", mergeFrom: [], keywords: ["suvarnabhumi", "don mueang", "don muang", "thailand", "bkk", "dmk"] },
  "Sepang__MY":           { name: "Kuala Lumpur", code: "KUL", primary: "KUL", mergeFrom: ["Subang__MY"], keywords: ["klia", "malaysia", "kl", "kul"] },
  "Singapore__SG":        { name: "Singapore", code: "SIN", primary: "SIN", mergeFrom: ["Seletar__SG"], keywords: ["changi", "sin"] },
  "New Delhi__IN":        { name: "Delhi", code: "DEL", primary: "DEL", mergeFrom: [], keywords: ["new delhi", "india", "indira gandhi", "del"] },
  "Mumbai__IN":           { name: "Mumbai", code: "BOM", primary: "BOM", mergeFrom: [], keywords: ["bombay", "india", "bom"] },
  "Dubai__AE":            { name: "Dubai", code: "DXB", primary: "DXB", mergeFrom: ["Dubai(Jebel Ali)__AE"], keywords: ["uae", "al maktoum", "jebel ali", "dxb", "dwc"] },
  "Doha__QA":             { name: "Doha", code: "DOH", primary: "DOH", mergeFrom: [], keywords: ["qatar", "hamad", "doh"] },
  "Taipei__TW":           { name: "Taipei", code: "TPE", primary: "TPE", mergeFrom: [], keywords: ["taiwan", "taoyuan", "songshan", "tpe", "tsa"] },
  "Hong Kong__HK":        { name: "Hong Kong", code: "HKG", primary: "HKG", mergeFrom: [], keywords: ["hkg", "chek lap kok"] },

  // === South America ===
  "São Paulo__BR":        { name: "São Paulo", code: "SAO", primary: "GRU", mergeFrom: ["Campinas__BR"], keywords: ["guarulhos", "congonhas", "viracopos", "sp", "gru", "cgh"] },
  "Rio De Janeiro__BR":   { name: "Rio de Janeiro", code: "RIO", primary: "GIG", mergeFrom: ["Rio de Janeiro__BR"], keywords: ["galeao", "santos dumont", "gig", "sdu"] },
  "Buenos Aires__AR":     { name: "Buenos Aires", code: "BUE", primary: "EZE", mergeFrom: ["Buenos Aires (Ezeiza)__AR"], keywords: ["ezeiza", "aeroparque", "argentina", "eze", "aep"] },

  // === Oceania ===
  "Sydney (Mascot)__AU":  { name: "Sydney", code: "SYD", primary: "SYD", mergeFrom: [], keywords: ["kingsford smith", "australia", "syd"] },
  "Melbourne__AU":        { name: "Melbourne", code: "MEL", primary: "MEL", mergeFrom: [], keywords: ["tullamarine", "avalon", "australia", "mel"] },

  // === Africa ===
  "Johannesburg__ZA":     { name: "Johannesburg", code: "JNB", primary: "JNB", mergeFrom: [], keywords: ["joburg", "or tambo", "south africa", "jnb"] },
  "Nairobi__KE":          { name: "Nairobi", code: "NBO", primary: "NBO", mergeFrom: [], keywords: ["jomo kenyatta", "kenya", "nbo"] },
  "Cairo__EG":            { name: "Cairo", code: "CAI", primary: "CAI", mergeFrom: [], keywords: ["egypt", "cai"] },
};

// Build reverse lookup: mergeFrom key -> metro key
const mergeTarget = new Map();
for (const [metroKey, metro] of Object.entries(metroAreas)) {
  for (const fromKey of metro.mergeFrom) {
    mergeTarget.set(fromKey, metroKey);
  }
}

// Group by municipality, merging metro areas
const cityMap = new Map();

for (const row of filtered) {
  const municipality = row.municipality || row.name.replace(/ (International |)Airport.*$/i, "").trim();
  const country = row.iso_country;
  let key = `${municipality}__${country}`;

  // Check if this municipality merges into a metro area
  const targetKey = mergeTarget.get(key);
  if (targetKey) {
    key = targetKey;
  }

  const metro = metroAreas[key];

  if (!cityMap.has(key)) {
    cityMap.set(key, {
      city: metro ? metro.name : municipality,
      country,
      metroCode: metro ? metro.code : null,
      primaryAirport: metro ? metro.primary : null,
      keywords: metro ? metro.keywords : [],
      lat: parseFloat(row.latitude_deg) || 0,
      lng: parseFloat(row.longitude_deg) || 0,
      airports: [],
    });
  }

  const entry = cityMap.get(key);
  const airportCode = row.iata_code;
  // Use primary airport coordinates if this is the primary
  if (entry.primaryAirport === airportCode) {
    entry.lat = parseFloat(row.latitude_deg) || entry.lat;
    entry.lng = parseFloat(row.longitude_deg) || entry.lng;
  }

  entry.airports.push({
    code: airportCode,
    name: row.name
      .replace(/International /i, "Intl ")
      .replace(/ Airport$/i, "")
      .replace(/ Air Base$/i, ""),
    type: row.type,
  });
}

// Sort airports within each city: large first, then medium; within same type alphabetically
// Primary airport (code matches metro/city code) always goes first
for (const entry of cityMap.values()) {
  const primaryCode = entry.primaryAirport || null;
  entry.airports.sort((a, b) => {
    // Primary airport always first
    if (a.code === primaryCode) return -1;
    if (b.code === primaryCode) return 1;
    // Then large before medium
    if (a.type !== b.type) return a.type === "large_airport" ? -1 : 1;
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
}

// Sort cities alphabetically by country then city
const cityEntries = [...cityMap.values()].sort((a, b) => {
  if (a.country !== b.country) return a.country.localeCompare(b.country);
  return a.city.localeCompare(b.city);
});

// Use metro code if available, otherwise derive from airports
function getCityCode(entry) {
  if (entry.metroCode) return entry.metroCode;
  if (entry.airports.length === 1) return entry.airports[0].code;
  const large = entry.airports.find((a) => a.type === "large_airport");
  return large ? large.code : entry.airports[0].code;
}

// Build TypeScript output
let ts = `// Auto-generated from airports CSV — ${cityEntries.length} cities, ${filtered.length} airports
// Run: node scripts/generate-airports.mjs

export interface Airport {
  code: string;
  name: string;
}

export interface City {
  code: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  airports: Airport[];
  keywords?: string[];
}

export const cities: City[] = [\n`;

for (const entry of cityEntries) {
  const cName = countryNames[entry.country] || entry.country;
  const cCode = getCityCode(entry);
  const airports = entry.airports
    .map((a) => `      { code: "${a.code}", name: "${a.name.replace(/"/g, '\\"')}" }`)
    .join(",\n");

  const kw = entry.keywords && entry.keywords.length > 0
    ? `, keywords: [${entry.keywords.map(k => `"${k}"`).join(", ")}]`
    : "";
  const lat = Math.round(entry.lat * 10000) / 10000;
  const lng = Math.round(entry.lng * 10000) / 10000;
  ts += `  { code: "${cCode}", name: "${entry.city.replace(/"/g, '\\"')}", country: "${cName}", lat: ${lat}, lng: ${lng}, airports: [\n${airports},\n    ]${kw} },\n`;
}

ts += `];\n`;

writeFileSync(outPath, ts, "utf-8");
console.log(`\nWritten ${outPath}`);
console.log(`Cities: ${cityEntries.length}`);
console.log(`Airports: ${filtered.length}`);

// Stats by type
const large = filtered.filter((r) => r.type === "large_airport").length;
const medium = filtered.filter((r) => r.type === "medium_airport").length;
console.log(`Large airports: ${large}`);
console.log(`Medium airports: ${medium}`);
