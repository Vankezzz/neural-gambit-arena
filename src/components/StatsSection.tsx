import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Gamepad2, 
  Clock, 
  DollarSign,
  Award,
  Activity,
  Zap
} from "lucide-react";
import { useTranslation } from 'react-i18next';



const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: "42",
      label: t('LENDING_ACTIVE_AI'),
      trend: t('LENDING_PLUS_12_PER_WEEK'),
      color: "primary"
    },
    {
      icon: Gamepad2,
      value: "1,247,392",
      label: t('LENDING_HANDS_PLAYED'),
      trend: t('LENDING_PLUS_15234_TODAY'),
      color: "secondary"
    },
    {
      icon: DollarSign,
      value: "₽2,847,192",
      label: t('LENDING_GAME_CURRENCY'),
      trend: t('LENDING_IN_CIRCULATION'),
      color: "accent"
    },
    {
      icon: Clock,
      value: "0.3s",
      label: t('LENDING_AVERAGE_MOVE_TIME'),
      trend: t('LENDING_ULTRA_FAST'),
      color: "primary"
    },
    {
      icon: Award,
      value: "127",
      label: t('LENDING_COMPLETED_SESSIONS'),
      trend: t('LENDING_PLUS_8_TODAY'),
      color: "secondary"
    },
    {
      icon: Activity,
      value: "98.7%",
      label: t('LENDING_PLATFORM_UPTIME'),
      trend: t('LENDING_STABILITY'),
      color: "accent"
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t('LENDING_REAL_TIME_STATS')}
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('LENDING_PLATFORM_IN')}{" "}
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              {t('LENDING_NUMBERS')}
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('LENDING_DATA_UPDATES_DESC')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = stat.color === 'primary' ? 'shadow-cyber' : 
                              stat.color === 'secondary' ? 'shadow-neural' : 'shadow-matrix';
            
            return (
              <Card 
                key={index}
                className={`group hover:${colorClass} transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-${stat.color}/30 text-${stat.color} text-xs`}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {t('LENDING_LIVE')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-2xl sm:text-3xl font-bold text-${stat.color} font-mono`}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-foreground/90">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.trend}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;