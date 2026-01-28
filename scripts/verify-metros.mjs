import { readFileSync } from "fs";

const expected = {
  NYC: { name: "New York", must: ["JFK","LGA","EWR"], nice: ["SWF","HPN","ISP"] },
  LAX: { name: "Los Angeles", must: ["LAX","BUR","LGB","ONT","SNA"], nice: [] },
  SFO: { name: "San Francisco", must: ["SFO","OAK","SJC"], nice: [] },
  WAS: { name: "Washington D.C.", must: ["IAD","DCA","BWI"], nice: [] },
  MIA: { name: "Miami", must: ["MIA","FLL","PBI"], nice: [] },
  DFW: { name: "Dallas / Fort Worth", must: ["DFW"], nice: ["DAL"] },
  IAH: { name: "Houston", must: ["IAH","HOU"], nice: [] },
  YTO: { name: "Toronto", must: ["YYZ"], nice: ["YTZ","YHM"] },
  LON: { name: "London", must: ["LHR","LGW","STN","LTN","LCY"], nice: ["SEN"] },
  PAR: { name: "Paris", must: ["CDG","ORY"], nice: ["BVA","LBG"] },
  ROM: { name: "Rome", must: ["FCO","CIA"], nice: [] },
  MIL: { name: "Milan", must: ["MXP","LIN","BGY"], nice: [] },
  BER: { name: "Berlin", must: ["BER"], nice: [] },
  FRA: { name: "Frankfurt", must: ["FRA"], nice: ["HHN"] },
  DUS: { name: "Düsseldorf / Cologne", must: ["DUS","CGN"], nice: [] },
  IST: { name: "Istanbul", must: ["IST","SAW"], nice: [] },
  BRU: { name: "Brussels", must: ["BRU","CRL"], nice: [] },
  AMS: { name: "Amsterdam", must: ["AMS"], nice: ["EIN","RTM"] },
  STO: { name: "Stockholm", must: ["ARN"], nice: ["NYO"] },
  CPH: { name: "Copenhagen", must: ["CPH"], nice: ["MMX"] },
  OSL: { name: "Oslo", must: ["OSL"], nice: ["TRF"] },
  MOW: { name: "Moscow", must: ["SVO","DME","VKO"], nice: ["ZIA"] },
  TYO: { name: "Tokyo", must: ["HND","NRT"], nice: [] },
  SEL: { name: "Seoul", must: ["ICN","GMP"], nice: [] },
  BJS: { name: "Beijing", must: ["PEK","PKX"], nice: [] },
  BKK: { name: "Bangkok", must: ["BKK","DMK"], nice: [] },
  KUL: { name: "Kuala Lumpur", must: ["KUL"], nice: ["SZB"] },
  SIN: { name: "Singapore", must: ["SIN"], nice: ["XSP"] },
  DEL: { name: "Delhi", must: ["DEL"], nice: [] },
  BOM: { name: "Mumbai", must: ["BOM"], nice: [] },
  DXB: { name: "Dubai", must: ["DXB"], nice: ["DWC"] },
  DOH: { name: "Doha", must: ["DOH"], nice: [] },
  SAO: { name: "São Paulo", must: ["GRU","CGH"], nice: ["VCP"] },
  RIO: { name: "Rio de Janeiro", must: ["GIG","SDU"], nice: [] },
  BUE: { name: "Buenos Aires", must: ["EZE","AEP"], nice: [] },
  SYD: { name: "Sydney", must: ["SYD"], nice: [] },
  MEL: { name: "Melbourne", must: ["MEL"], nice: [] },
  JNB: { name: "Johannesburg", must: ["JNB"], nice: [] },
  MAD: { name: "Madrid", must: ["MAD"], nice: [] },
  BCN: { name: "Barcelona", must: ["BCN"], nice: [] },
};

const data = readFileSync("data/airports.ts", "utf-8");

let pass = 0, fail = 0, warn = 0;

for (const [code, exp] of Object.entries(expected)) {
  const regex = new RegExp(`code: "${code}", name: "([^"]+)"[\\s\\S]*?airports: \\[([\\s\\S]*?)\\]`);
  const match = data.match(regex);

  if (!match) {
    console.log(`❌ ${code} (${exp.name}): NOT FOUND in data`);
    fail++;
    continue;
  }

  const airportCodes = [...match[2].matchAll(/code: "(\w+)"/g)].map((m) => m[1]);

  const missing = exp.must.filter((c) => !airportCodes.includes(c));
  const missingNice = exp.nice.filter((c) => !airportCodes.includes(c));

  if (missing.length > 0) {
    console.log(`❌ ${code} (${exp.name}): MISSING required: ${missing.join(", ")} | has: ${airportCodes.join(", ")}`);
    fail++;
  } else if (missingNice.length > 0) {
    console.log(`⚠️  ${code} (${exp.name}): OK but missing optional: ${missingNice.join(", ")} | has: ${airportCodes.join(", ")}`);
    warn++;
  } else {
    console.log(`✅ ${code} (${exp.name}): ${airportCodes.join(", ")}`);
    pass++;
  }
}

console.log(`\n--- SUMMARY ---`);
console.log(`✅ Pass: ${pass}`);
console.log(`⚠️  Warnings: ${warn}`);
console.log(`❌ Fail: ${fail}`);
