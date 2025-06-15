import CallToActionSection from "@/components/sections/CallToActionSection";
import DualProfileSection from "@/components/sections/DualProfileSection";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SobreSection from "@/components/sections/SobreSection";
import SubdomainsSection from "@/components/sections/SubdomainsSection";
import ValuesSection from "@/components/sections/ValuesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <SubdomainsSection />
      <SobreSection />
      <ValuesSection />
      <DualProfileSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;
