import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import APISection from "@/components/APISection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <APISection />
      <CTASection />
    </div>
  );
};

export default Index;
