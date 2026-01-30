import * as React from "react";
import { cn } from "@/lib/utils"; // Your utility for merging class names
import { ArrowRight } from "lucide-react";

// Define the props for the DestinationCard component
interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  themeColor: string; // e.g., "150 50% 25%" for a deep green
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, origin, originCode, destination, destinationCode, countryCode, cabinClass, publicFare, pfPrice, href, themeColor, ...props }, ref) => {
    const savings = Math.round(((publicFare - pfPrice) / publicFare) * 100);
    const formatPrice = (price: number) => price.toLocaleString("en-US");
    return (
      // The 'group' class enables hover effects on child elements
      <div
        ref={ref}
        style={{
          // @ts-ignore - CSS custom properties are valid
          "--theme-color": themeColor,
        } as React.CSSProperties}
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg
                     transition-all duration-500 ease-in-out
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          aria-label={`View ${originCode} to ${destinationCode} deals`}
          style={{
             boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.6) 30%, transparent 60%)`,
            }}
          />
          
          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="bg-pf-navy/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                <span className="text-[10px] font-bold text-white uppercase tracking-wide">{cabinClass}</span>
              </div>
              <div className="bg-emerald-500 px-2.5 py-1 rounded-md">
                <span className="text-[10px] font-bold text-white">-{savings}%</span>
              </div>
            </div>

            {/* Bottom compact bar */}
            <div className="mt-auto">
              {/* Route overlay */}
              <div className="px-4 pb-3">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1 flex items-center gap-2">
                  {destination}
                  <img
                    src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                    alt=""
                    className="w-6 h-4 object-cover rounded"
                  />
                </h3>
                <p className="text-sm text-white/70">
                  from {origin} <span className="text-white/50">({originCode} → {destinationCode})</span>
                </p>
              </div>

              {/* Price table bar - glass effect */}
              <div className="bg-white/20 backdrop-blur-xl border-t border-white/30 overflow-hidden rounded-b-2xl">
                <div className="grid grid-cols-3 divide-x divide-white/20">
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[9px] text-white/60 uppercase tracking-wider mb-0.5">Published Fare</p>
                    <p className="text-sm text-white/50 line-through">${formatPrice(publicFare)}</p>
                  </div>
                  <div className="px-3 py-2.5 text-center">
                    <p className="text-[9px] text-white/80 uppercase tracking-wider mb-0.5">PF Fare</p>
                    <p className="text-lg font-bold text-white">${formatPrice(pfPrice)}</p>
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-1 text-white/70 group-hover:text-white font-medium text-sm transition-colors">
                      <span>Quote</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };