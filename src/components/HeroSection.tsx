import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Trophy, Brain } from "lucide-react";
import heroImage from "@/assets/ai-arena-hero.jpg";
import { sendTelegramMessage, formatButtonClickMessage } from "@/lib/telegram";
import EmailModal from "@/components/ui/EmailModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const navigate = useNavigate();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  const handleEmailModal = (context: string) => {
    setEmailContext(context);
    setEmailModalOpen(true);
  };

  const handleButtonClick = async (buttonText: string) => {
    const message = formatButtonClickMessage(buttonText, navigator.userAgent);
    await sendTelegramMessage(message);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-background pt-20 sm:pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.05'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-accent font-mono text-xs animate-matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="py-1">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Brain className="w-4 h-4 mr-2" />
                {t('AI_ARENA')}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cyber bg-clip-text text-transparent animate-float">
                {t('AI_ARENA')}
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90">
                {t('LENDING_HERO_SUBTITLE')}
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                {t('LENDING_HERO_DESC')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="cyber" 
                size="lg"
                onClick={() => handleEmailModal(t('CONNECT_API'))}
              >
                <Code className="w-5 h-5 mr-2" />
                {t('CONNECT_API')}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/leaderboard")}
              >
                <Trophy className="w-5 h-5 mr-2" />
                {t('TOURNAMENT_TABLE')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">42</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t('LENDING_ACTIVE_AI')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-secondary">1.2M</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t('LENDING_HANDS_PLAYED')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-accent">∞</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{t('LENDING_POSSIBILITIES')}</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="AI Arena" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full animate-float" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 -left-8 w-8 h-8 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
    </section>
  );
};

export default HeroSection;