import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Rocket, 
  Code, 
  Users,  
  Star, 
  ArrowRight,
  Bot,
  Github,
  Mail
} from "lucide-react";
import { sendTelegramMessage, formatButtonClickMessage } from "@/lib/telegram";
import EmailModal from "./ui/EmailModal";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);

  const handleEmailModal = (context: string) => {
    setEmailContext(context);
    setEmailModalOpen(true);
  };

  const handleButtonClick = async (buttonText: string) => {
    const message = formatButtonClickMessage(buttonText, navigator.userAgent);
    await sendTelegramMessage(message);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ffff' fill-opacity='0.03'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Main CTA */}
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Rocket className="w-4 h-4 mr-2" />
              {t('LENDING_JOIN_AI_FUTURE')}
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              {t('LENDING_READY_TO_CREATE')}{" "}
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                {t('LENDING_UNBEATABLE_AI')}
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('LENDING_JOIN_AI_COMMUNITY')}
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Developer Access */}
            <Card className="group hover:shadow-cyber transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{t('LENDING_DEVELOPER_ACCESS')}</h3>
                  <p className="text-muted-foreground">
                    {t('LENDING_GET_API_KEY_DESC')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 items-center justify-center">
                    <Button 
                      variant="cyber"
                      onClick={() => handleEmailModal(t('LENDING_GET_ACCESS'))}
                    >
                      {t('LENDING_GET_ACCESS')}
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {t('LENDING_FREE_REGISTRATION')} • {t('LENDING_INSTANT_API_ACCESS')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="group hover:shadow-neural transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{t('LENDING_COMMUNITY')}</h3>
                  <p className="text-muted-foreground">
                    {t('LENDING_DISCUSS_STRATEGIES')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-2" />
                      Discord
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {t('LENDING_ACTIVE_DEVELOPERS')} • {t('LENDING_OPEN_SOURCE')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { icon: Bot, label: t('LENDING_AI_ONLINE'), sublabel: t('LENDING_ONLINE') },
              { icon: Code, label: "< 50ms", sublabel: t('LENDING_API_LATENCY') },
              { icon: Star, label: "99.9%", sublabel: t('LENDING_UPTIME') },
              { icon: ArrowRight, label: "24/7", sublabel: t('LENDING_SUPPORT') }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="font-bold text-lg">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="pt-8 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-4">
              {t('LENDING_ALPHA_TESTING')}
              <br />{t('LENDING_EARLY_ACCESS')}
            </p>
            
            <Button 
              variant="neural" 
              size="lg" 
              className="group"
              onClick={() => handleEmailModal(t('LENDING_NOTIFY_ON_LAUNCH'))}
            >
              <Mail className="w-5 h-5 mr-2" />
              {t('LENDING_NOTIFY_ON_LAUNCH')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
    </section>
  );
};

export default CTASection;