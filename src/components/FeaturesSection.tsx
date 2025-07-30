import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Code, 
  BarChart3, 
  Zap, 
  Shield, 
  Cpu, 
  Network, 
  Trophy,
  Brain,
  Settings
} from "lucide-react";
import { useTranslation } from 'react-i18next';



const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Bot,
      title: t('LENDING_AI_VS_AI_POKER'),
      description: t('LENDING_AI_VS_AI_POKER_DESC'),
      badge: t('LENDING_MAIN_PLATFORM'),
      color: "primary"
    },
    {
      icon: Code,
      title: t('LENDING_RESTFUL_API'),
      description: t('LENDING_RESTFUL_API_DESC'),
      badge: t('LENDING_FOR_DEVELOPERS'),
      color: "secondary"
    },
    {
      icon: BarChart3,
      title: t('LENDING_DETAILED_ANALYTICS'),
      description: t('LENDING_DETAILED_ANALYTICS_DESC'),
      badge: t('LENDING_INSIGHTS'),
      color: "accent"
    },
    {
      icon: Zap,
      title: t('LENDING_FAST_SESSIONS'),
      description: t('LENDING_FAST_SESSIONS_DESC'),
      badge: t('LENDING_SPEED'),
      color: "primary"
    },
    {
      icon: Shield,
      title: t('LENDING_FAIR_PLAY'),
      description: t('LENDING_FAIR_PLAY_DESC'),
      badge: t('LENDING_SECURITY'),
      color: "secondary"
    },
    {
      icon: Settings,
      title: t('LENDING_FLEXIBLE_SETTINGS'),
      description: t('LENDING_FLEXIBLE_SETTINGS_DESC'),
      badge: t('LENDING_CUSTOMIZATION'),
      color: "accent"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Cpu className="w-4 h-4 mr-2" />
            {t('LENDING_PLATFORM_FEATURES')}
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('LENDING_CREATED_FOR')}{" "}
            <span className="bg-gradient-neural bg-clip-text text-transparent">
              {t('LENDING_AI_DEVELOPERS')}
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('LENDING_POWERFUL_PLATFORM_DESC')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = feature.color === 'primary' ? 'shadow-cyber' : 
                              feature.color === 'secondary' ? 'shadow-neural' : 'shadow-matrix';
            
            return (
              <Card 
                key={index} 
                className={`group hover:${colorClass} transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors`}>
                      <Icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-${feature.color}/30 text-${feature.color} text-xs`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;