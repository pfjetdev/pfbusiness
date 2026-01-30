import { headers } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { TrustBar } from "@/components/layout/TrustBar";
import { BestDealsSection } from "@/components/layout/BestDealsSection";
import { AirlinesMarquee } from "@/components/layout/AirlinesMarquee";
import { HowToBookSection } from "@/components/layout/HowToBookSection";
import { BeatMyPriceSection } from "@/components/layout/BeatMyPriceSection";
import { PopularDestinationsSection } from "@/components/layout/PopularDestinationsSection";
import { WhyChooseUsSection } from "@/components/layout/WhyChooseUsSection";
import { AirlinesSection } from "@/components/layout/AirlinesSection";
import { BlogSection } from "@/components/layout/BlogSection";
import { QuickLinksSection } from "@/components/layout/QuickLinksSection";
import { Footer } from "@/components/layout/Footer";

export default async function Home() {
  const headersList = await headers();
  const userCity = headersList.get("x-user-city") || "";
  const userCountry = headersList.get("x-user-country") || "";

  return (
    <>
      <Navbar />
      <HeroSection userCity={userCity} userCountry={userCountry} />
      <TrustBar />
      <BestDealsSection />
      <BeatMyPriceSection />
      <PopularDestinationsSection />
      <AirlinesMarquee />
      <HowToBookSection />
      <WhyChooseUsSection />
      <AirlinesSection />
      <BlogSection />
      <QuickLinksSection />
      <Footer />
    </>
  );
}
