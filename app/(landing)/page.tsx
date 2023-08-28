import { LandingContent } from "@/components/LandingContent";
import { LandingHero } from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavBar/>
      <LandingHero/>
      <LandingContent/>
      
    </div>
  );
};

export default LandingPage;
