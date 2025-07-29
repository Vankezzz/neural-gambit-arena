import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import IntegrationSection from "@/components/IntegrationSection";
import CTASection from "@/components/CTASection";
import Header from "@/components/Header";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <IntegrationSection />
      <CTASection />
    </div>
  );
};

export default HomePage;