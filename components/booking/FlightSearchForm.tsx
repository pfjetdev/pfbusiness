"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Search,
  ChevronDown,
  Plane,
  MapPin,
  PlaneTakeoff,
  PlaneLanding,
  Users,
  ArrowLeftRight,
  Minus,
  Plus,
  Baby,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cities, type City, type Airport } from "@/data/airports";
import { useAirportSearch } from "@/lib/useAirportSearch";

const popularCityCodes = ["LON", "NYC", "PAR", "DXB", "TYO", "SIN", "LAX", "ROM"];
const popularCities = popularCityCodes
  .map((code) => cities.find((c) => c.code === code))
  .filter(Boolean) as City[];

const cabinClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

const passengerTypes = [
  { key: "adults" as const, label: "Adults", subtitle: "12+ years", icon: User, min: 1, max: 9 },
  { key: "children" as const, label: "Children", subtitle: "2–11 years", icon: Users, min: 0, max: 8 },
  { key: "infants" as const, label: "Infants", subtitle: "Under 2", icon: Baby, min: 0, max: 4 },
];

// Selection can be either a city or a specific airport
interface Selection {
  type: "city" | "airport";
  cityCode: string;
  airportCode?: string;
  displayName: string;
  code: string;
  country: string;
}

interface AirportInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onSelectionComplete?: () => void;
  icon?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

function AirportInput({ value, onChange, placeholder, onSelectionComplete, icon, onOpenChange: onOpenChangeProp }: AirportInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Find selection info from value (can be city code or airport code)
  const getSelectionInfo = (): Selection | null => {
    if (!value) return null;

    // Check if it's a city code
    const city = cities.find(c => c.code === value);
    if (city) {
      return {
        type: "city",
        cityCode: city.code,
        displayName: city.name,
        code: city.code,
        country: city.country,
      };
    }

    // Check if it's an airport code
    for (const c of cities) {
      const airport = c.airports.find(a => a.code === value);
      if (airport) {
        return {
          type: "airport",
          cityCode: c.code,
          airportCode: airport.code,
          displayName: airport.name,
          code: airport.code,
          country: c.country,
        };
      }
    }
    return null;
  };

  const selection = getSelectionInfo();

  // Fuzzy search with Fuse.js — handles typos like "new yors", "neu york"
  const filteredCities = useAirportSearch(inputValue);
  const hasQuery = inputValue.trim().length >= 2;

  useEffect(() => {
    if (selection && !open) {
      setInputValue(selection.displayName);
    }
  }, [selection, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!open) setOpen(true);
  };

  const handleSelectCity = (city: City) => {
    // Select all airports in the city
    onChange(city.code);
    setInputValue(city.name);
    handleOpenChange(false);
    onSelectionComplete?.();
  };

  const handleSelectAirport = (_city: City, airport: Airport) => {
    onChange(airport.code);
    setInputValue(airport.name);
    handleOpenChange(false);
    onSelectionComplete?.();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChangeProp?.(newOpen);
    if (newOpen) {
      if (selection) setInputValue("");
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      inputRef.current?.blur();
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="w-full h-full relative flex items-center cursor-pointer gap-2 px-4 py-3">
          {/* Icon */}
          {icon && (
            <div className="text-pf-red shrink-0">
              {icon}
            </div>
          )}
          {/* Always show input */}
          <input
            ref={inputRef}
            type="text"
            value={open ? inputValue : (selection ? selection.displayName : inputValue)}
            onChange={handleInputChange}
            placeholder={placeholder}
            readOnly={!open && !!selection}
            className="w-full text-base font-semibold text-pf-navy bg-transparent outline-none placeholder:text-pf-navy-light placeholder:font-normal cursor-pointer pr-8"
          />
          {/* Airport code badge on the right */}
          {selection && !open && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 text-xs font-medium text-white bg-pf-navy px-1.5 py-0.5 rounded pointer-events-none">
              {selection.code}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[400px] p-0 shadow-lg border border-gray-100 rounded-xl overflow-hidden"
        align="start"
        sideOffset={14}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command shouldFilter={false}>
          <CommandList className="max-h-[350px] p-1.5">
            {!hasQuery && filteredCities.length === 0 && (
              <div className="p-3">
                <div className="text-xs font-semibold text-pf-navy-light uppercase tracking-wide mb-2 px-1">Popular destinations</div>
                {popularCities.map((city) => (
                  <CommandItem
                    key={city.code}
                    value={`popular-${city.code}`}
                    onSelect={() => handleSelectCity(city)}
                    className="group flex items-center justify-between p-2.5 cursor-pointer rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-pf-red group-data-[selected=true]:text-white shrink-0" />
                      <div>
                        <span className="font-medium text-pf-navy group-data-[selected=true]:text-white">{city.name}</span>
                        <span className="text-sm text-pf-navy-light group-data-[selected=true]:text-white/70 ml-2">{city.country}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-pf-navy bg-pf-pearl group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-white px-1.5 py-0.5 rounded">
                      {city.code}
                    </span>
                  </CommandItem>
                ))}
              </div>
            )}
            {hasQuery && filteredCities.length === 0 && (
              <CommandEmpty className="py-6 text-center text-sm text-pf-navy-light">
                No airports found.
              </CommandEmpty>
            )}
            {filteredCities.map((city) => (
              <CommandGroup key={city.code}>
                {/* City row - selects all airports */}
                <CommandItem
                  value={`city-${city.code}`}
                  onSelect={() => handleSelectCity(city)}
                  className="group flex items-center justify-between p-3 cursor-pointer rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-pf-red group-data-[selected=true]:text-white shrink-0" />
                    <div>
                      <div className="font-semibold text-pf-navy group-data-[selected=true]:text-white">{city.name}</div>
                      <div className="text-sm text-pf-navy-light group-data-[selected=true]:text-white/70">{city.country}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-pf-navy bg-pf-pearl group-data-[selected=true]:bg-white/20 group-data-[selected=true]:text-white px-2 py-1 rounded">
                    {city.code}
                  </span>
                </CommandItem>

                {/* Individual airports with indent */}
                {city.airports.map((airport) => (
                  <CommandItem
                    key={airport.code}
                    value={`airport-${airport.code}`}
                    onSelect={() => handleSelectAirport(city, airport)}
                    className="group flex items-center justify-between p-3 pl-10 cursor-pointer rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Plane className="w-4 h-4 text-pf-navy-light group-data-[selected=true]:text-white/70 shrink-0" />
                      <div>
                        <div className="font-medium text-pf-navy group-data-[selected=true]:text-white">{airport.name}</div>
                        <div className="text-sm text-pf-navy-light group-data-[selected=true]:text-white/70">{city.name}</div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-pf-navy-light group-data-[selected=true]:text-white/70">
                      {airport.code}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Find the best matching city code from a Vercel geo city name
function findCityByGeo(geoCity: string): string {
  if (!geoCity) return "";
  const lower = geoCity.toLowerCase();
  const exact = cities.find((c) => c.name.toLowerCase() === lower);
  if (exact) return exact.code;
  const partial = cities.find((c) => c.name.toLowerCase().includes(lower) || lower.includes(c.name.toLowerCase()));
  if (partial) return partial.code;
  return "";
}

// Find nearest city by coordinates (haversine distance)
function findCityByCoords(lat: number, lng: number): string {
  let best = "";
  let bestDist = Infinity;
  for (const c of cities) {
    const dLat = (c.lat - lat) * Math.PI / 180;
    const dLng = (c.lng - lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat * Math.PI / 180) * Math.cos(c.lat * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    if (d < bestDist) {
      bestDist = d;
      best = c.code;
    }
  }
  return best;
}

interface FlightSearchFormProps {
  userCity?: string;
  userCountry?: string;
}

export function FlightSearchForm({ userCity, userCountry: _userCountry }: FlightSearchFormProps) {
  const [from, setFrom] = useState(() => findCityByGeo(userCity || ""));
  const [to, setTo] = useState("");

  // Client-side fallback: if server geolocation didn't resolve, fetch geo API and use coords
  useEffect(() => {
    if (from) return;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        // Try name match first
        if (data.city) {
          const code = findCityByGeo(data.city);
          if (code) { setFrom(code); return; }
        }
        // Fall back to nearest city by coordinates
        if (data.latitude && data.longitude) {
          const code = findCityByCoords(parseFloat(data.latitude), parseFloat(data.longitude));
          if (code) setFrom(code);
        }
      })
      .catch(() => {});
  }, []);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [pax, setPax] = useState<PassengerCounts>({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState("business");
  const [passengersOpen, setPassengersOpen] = useState(false);

  const totalPassengers = pax.adults + pax.children + pax.infants;

  const updatePax = (key: keyof PassengerCounts, delta: number) => {
    setPax((prev) => {
      const type = passengerTypes.find((t) => t.key === key)!;
      const next = Math.max(type.min, Math.min(type.max, prev[key] + delta));
      return { ...prev, [key]: next };
    });
  };
  const [datesOpen, setDatesOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<Date | undefined>();
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const toInputRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-focus "To" field after selecting "From"
  const handleFromSelect = () => {
    setTimeout(() => {
      const toInput = toInputRef.current?.querySelector("input");
      toInput?.focus();
    }, 100);
  };

  // Auto-open dates after selecting "To"
  const handleToSelect = () => {
    setTimeout(() => {
      setDatesOpen(true);
    }, 100);
  };

  // Swap From and To values
  const [swapRotation, setSwapRotation] = useState(0);
  const handleSwap = () => {
    setSwapRotation((r) => r + 180);
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const [tripType, setTripType] = useState<"round" | "oneway" | "multi">("round");

  const tripTypes = [
    { value: "round" as const, label: "Round Trip" },
    { value: "oneway" as const, label: "One Way" },
    { value: "multi" as const, label: "Multi City" },
  ];

  return (
    <>
      {/* Trip Type Tabs */}
      <div className="flex justify-center gap-2 mb-4">
        {tripTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTripType(t.value);
              if (t.value === "oneway") setDateRange((prev) => prev ? { from: prev.from, to: undefined } : prev);
            }}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
              tripType === t.value
                ? "bg-pf-navy text-white shadow-sm"
                : "text-pf-navy/60 hover:text-pf-navy hover:bg-pf-navy/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

    <div className="bg-pf-navy p-4 rounded-2xl">
    <div className="relative">
    <div ref={formRef} className="w-full flex flex-col lg:flex-row items-stretch gap-2">
        {/* From */}
        <div className={`flex-[2] flex items-center relative transition-all rounded-lg ${fromOpen ? "bg-white ring-2 ring-white/30" : from ? "bg-white" : "bg-white hover:bg-white"}`}>
          <AirportInput
            value={from}
            onChange={setFrom}
            placeholder="From"
            onSelectionComplete={handleFromSelect}
            icon={<PlaneTakeoff className="w-4 h-4" />}
            onOpenChange={setFromOpen}
          />
        </div>

        {/* Swap Button + Divider */}
        <div className="hidden lg:flex items-center relative">
          <div className="w-px h-full bg-gray-300" />
          <button
            type="button"
            onClick={handleSwap}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-pf-navy border border-white/20 rounded-full flex items-center justify-center hover:bg-pf-navy-light hover:border-pf-red transition-colors shadow-sm"
            aria-label="Swap destinations"
          >
            <ArrowLeftRight
              className="w-4 h-4 text-white transition-transform duration-300"
              style={{ transform: `rotate(${swapRotation}deg)` }}
            />
          </button>
        </div>

        {/* To */}
        <div ref={toInputRef} className={`flex-[2] flex items-center relative transition-all rounded-lg ${toOpen ? "bg-white ring-2 ring-white/30" : to ? "bg-white" : "bg-white hover:bg-white"}`}>
          <AirportInput
            value={to}
            onChange={setTo}
            placeholder="To"
            onSelectionComplete={handleToSelect}
            icon={<PlaneLanding className="w-4 h-4" />}
            onOpenChange={setToOpen}
          />
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-300" />

        {/* Date Range Trigger */}
        <div
          onClick={() => setDatesOpen(!datesOpen)}
          className={`flex-[2] flex items-center transition-all rounded-lg cursor-pointer ${datesOpen ? "bg-white ring-2 ring-white/30" : (dateRange?.from || dateRange?.to) ? "bg-white" : "bg-white hover:bg-white"}`}
        >
          <button className="flex-1 flex items-center gap-2 px-4 py-3 text-left cursor-pointer">
            <Calendar className="w-4 h-4 text-pf-red shrink-0" />
            <span className="text-base font-medium text-pf-navy">
              {dateRange?.from ? format(dateRange.from, "d MMM") : "Depart"}
            </span>
          </button>
          {tripType === "round" && (
            <>
              <div className="w-px h-6 bg-gray-300" />
              <button className="flex-1 flex items-center gap-2 px-4 py-3 text-left cursor-pointer">
                <Calendar className="w-4 h-4 text-pf-red shrink-0" />
                <span className="text-base font-medium text-pf-navy">
                  {dateRange?.to ? format(dateRange.to, "d MMM") : "Return"}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-300" />

        {/* Passengers & Class */}
        <Popover open={passengersOpen} onOpenChange={setPassengersOpen}>
          <PopoverTrigger asChild>
            <button className={`flex-1 flex items-center gap-2 px-4 py-3 text-left transition-all rounded-lg cursor-pointer ${passengersOpen ? "bg-white ring-2 ring-white/30" : "bg-white hover:bg-white"}`}>
              <Users className="w-4 h-4 text-pf-red shrink-0" />
              <div className="flex flex-col leading-tight whitespace-nowrap flex-1">
                <span className="text-sm font-medium text-pf-navy">{totalPassengers} {totalPassengers === 1 ? "passenger" : "passengers"}</span>
                <span className="text-xs text-pf-navy-light font-bold">{cabinClasses.find((c) => c.value === cabinClass)?.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-pf-navy-light shrink-0 transition-transform ${passengersOpen ? "rotate-180" : ""}`} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px] p-0" align="end" sideOffset={14}>
            {/* Cabin Class */}
            <div className="p-4 pb-3">
              <div className="text-xs font-semibold text-pf-navy-light uppercase tracking-wider mb-3">Cabin Class</div>
              <div className="grid grid-cols-4 gap-1.5">
                {cabinClasses.map((cabin) => (
                  <button
                    key={cabin.value}
                    onClick={() => setCabinClass(cabin.value)}
                    className={`py-2 px-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      cabinClass === cabin.value
                        ? "bg-pf-red text-white shadow-sm"
                        : "bg-pf-pearl text-pf-navy hover:bg-pf-pearl/70"
                    }`}
                  >
                    {cabin.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 mx-4" />

            {/* Passengers */}
            <div className="p-4 pt-3 space-y-3">
              <div className="text-xs font-semibold text-pf-navy-light uppercase tracking-wider mb-1">Passengers</div>
              {passengerTypes.map((type) => {
                const Icon = type.icon;
                const count = pax[type.key];
                const isMin = count <= type.min;
                const isMax = count >= type.max;
                return (
                  <div key={type.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pf-pearl flex items-center justify-center">
                        <Icon className="w-4 h-4 text-pf-navy-light" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-pf-navy">{type.label}</div>
                        <div className="text-xs text-pf-navy-light">{type.subtitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updatePax(type.key, -1)}
                        disabled={isMin}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isMin
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-pf-pearl text-pf-navy hover:bg-pf-red hover:text-white cursor-pointer"
                        }`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-pf-navy tabular-nums">{count}</span>
                      <button
                        onClick={() => updatePax(type.key, 1)}
                        disabled={isMax}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isMax
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-pf-pearl text-pf-navy hover:bg-pf-red hover:text-white cursor-pointer"
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Done */}
            <div className="p-4 pt-2">
              <button
                onClick={() => setPassengersOpen(false)}
                className="w-full py-2.5 bg-pf-navy text-white text-sm font-semibold rounded-lg hover:bg-pf-navy/90 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button className="px-6 self-stretch h-auto bg-pf-red hover:bg-pf-red-dark text-white text-base font-semibold rounded-r-xl rounded-l-lg shadow-pf-red hover:shadow-pf-lg transition-all duration-300 whitespace-nowrap">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
    </div>

    {/* Calendar Dropdown */}
    {datesOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={() => setDatesOpen(false)} />
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl">
          <style>{`
            .pf-calendar .rdp-root {
              --rdp-accent-color: var(--color-pf-red, #C8102E);
              --rdp-accent-background-color: var(--color-pf-red, #C8102E);
              --rdp-range_middle-background-color: rgba(12, 27, 42, 0.08);
              --rdp-range_middle-color: var(--color-pf-navy, #0C1B2A);
              --rdp-selected-font: inherit;
              font-family: inherit;
            }
            .pf-calendar .rdp-today:not(.rdp-selected) {
              font-weight: 700;
              color: var(--color-pf-navy, #0C1B2A);
            }
            .pf-calendar .rdp-day_button {
              border-radius: 9999px;
              width: 100%;
              max-width: 36px;
              height: 36px;
            }
            .pf-calendar .rdp-selected .rdp-day_button {
              background: var(--color-pf-red, #C8102E);
              color: white;
              border-radius: 9999px;
            }
            .pf-calendar td.rdp-range_start,
            .pf-calendar td.rdp-range_middle,
            .pf-calendar td.rdp-range_end {
              position: relative;
              background: transparent !important;
            }
            .pf-calendar td.rdp-range_start::before,
            .pf-calendar td.rdp-range_middle::before,
            .pf-calendar td.rdp-range_end::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              height: 36px;
              transform: translateY(-50%);
              background: rgba(12, 27, 42, 0.08);
              z-index: 0;
            }
            .pf-calendar td.rdp-range_start::before {
              left: 50%;
              border-radius: 0;
            }
            .pf-calendar td.rdp-range_end::before {
              right: 50%;
              border-radius: 0;
            }
            .pf-calendar td.rdp-range_start.rdp-range_end::before {
              display: none;
            }
            .pf-calendar td.rdp-range_start .rdp-day_button,
            .pf-calendar td.rdp-range_end .rdp-day_button {
              position: relative;
              z-index: 1;
              background: var(--color-pf-red, #C8102E);
              color: white;
              border-radius: 9999px;
            }
            .pf-calendar .rdp-range_middle .rdp-day_button {
              position: relative;
              z-index: 1;
              background: transparent;
              color: var(--color-pf-navy, #0C1B2A);
              border-radius: 0;
            }
            .pf-calendar .rdp-chevron {
              fill: var(--color-pf-navy, #0C1B2A);
            }
            .pf-calendar .rdp-root {
              width: 100%;
            }
            .pf-calendar .rdp-months {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 16px;
              width: 100%;
              max-width: 100%;
            }
            .pf-calendar .rdp-month {
              width: 100%;
            }
            .pf-calendar .rdp-month:not(:last-child) {
              border-right: 1px solid #e0e0e0;
              padding-right: 16px;
            }
            .pf-calendar .rdp-nav {
              grid-column: 1 / -1;
              position: absolute;
              top: 0;
              right: 0;
            }
            .pf-calendar .rdp-month_caption {
              justify-content: center;
            }
            .pf-calendar table {
              width: 100%;
            }
            .pf-calendar .rdp-hover_range .rdp-day_button {
              background: rgba(12, 27, 42, 0.06);
              border-radius: 0;
            }
            .pf-calendar .rdp-hover_range_start .rdp-day_button {
              border-radius: 9999px 0 0 9999px;
            }
            .pf-calendar .rdp-hover_range_end .rdp-day_button {
              background: rgba(12, 27, 42, 0.12);
              border-radius: 0 9999px 9999px 0;
            }
          `}</style>
          <div className="pf-calendar p-4">
            {tripType === "oneway" ? (
              <DayPicker
                mode="single"
                selected={dateRange?.from}
                onSelect={(day: Date | undefined) => {
                  setDateRange({ from: day, to: undefined });
                  if (day) {
                    setTimeout(() => setDatesOpen(false), 300);
                  }
                }}
                numberOfMonths={4}
                pagedNavigation
                disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            ) : (
              <DayPicker
                mode="range"
                min={1}
                selected={dateRange}
                onDayClick={(day) => {
                  if (dateRange?.from && dateRange?.to) {
                    setDateRange({ from: day, to: undefined });
                    return;
                  }
                }}
                onSelect={(range: DateRange | undefined) => {
                  if (dateRange?.from && dateRange?.to) return;
                  setDateRange(range);
                  if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
                    setHoveredDay(undefined);
                    setTimeout(() => setDatesOpen(false), 300);
                  }
                }}
                numberOfMonths={4}
                pagedNavigation
                disabled={(date: Date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                modifiers={{
                  hover_range: (day: Date) => {
                    if (!dateRange?.from || dateRange?.to || !hoveredDay) return false;
                    const from = dateRange.from;
                    if (isAfter(hoveredDay, from)) {
                      return isAfter(day, from) && isBefore(day, hoveredDay);
                    }
                    return isBefore(day, from) && isAfter(day, hoveredDay);
                  },
                  hover_range_start: (day: Date) => {
                    if (!dateRange?.from || dateRange?.to || !hoveredDay) return false;
                    return isSameDay(day, dateRange.from);
                  },
                  hover_range_end: (day: Date) => {
                    if (!dateRange?.from || dateRange?.to || !hoveredDay) return false;
                    return isSameDay(day, hoveredDay) && !isSameDay(hoveredDay, dateRange.from);
                  },
                }}
                modifiersClassNames={{
                  hover_range: "rdp-hover_range",
                  hover_range_start: "rdp-hover_range_start",
                  hover_range_end: "rdp-hover_range_end",
                }}
                onDayMouseEnter={(day) => {
                  if (dateRange?.from && !dateRange?.to) {
                    setHoveredDay(day);
                  }
                }}
                onDayMouseLeave={() => setHoveredDay(undefined)}
              />
            )}
          </div>
        </div>
      </>
    )}
    </div>
    </div>
    </>
  );
}
