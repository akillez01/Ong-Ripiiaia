
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import SubdomainsSection from "@/components/sections/SubdomainsSection";
import ValuesSection from "@/components/sections/ValuesSection";
import DualProfileSection from "@/components/sections/DualProfileSection";
import CallToActionSection from "@/components/sections/CallToActionSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-background to-amber-50 dark:from-slate-900 dark:via-background dark:to-emerald-950/20">
      <Header />
      <HeroSection />
      <SubdomainsSection />
      <ValuesSection />
      <DualProfileSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;
