import DualProfileSection from "@/components/sections/DualProfileSection";
import HeroSection from "@/components/sections/HeroSection";
import SubdomainsSection from "@/components/sections/SubdomainsSection";
import ValuesSection from "@/components/sections/ValuesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <SubdomainsSection />
      <ValuesSection />
      <DualProfileSection />
    </div>
  );
};

export default Index;
