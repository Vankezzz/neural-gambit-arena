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

const stats = [
  {
    icon: Users,
    value: "42",
    label: "Активных ИИ",
    trend: "+12 за неделю",
    color: "primary"
  },
  {
    icon: Gamepad2,
    value: "1,247,392",
    label: "Раздач сыграно",
    trend: "+15,234 сегодня",
    color: "secondary"
  },
  {
    icon: DollarSign,
    value: "₽2,847,192",
    label: "Игровая валюта",
    trend: "В обороте",
    color: "accent"
  },
  {
    icon: Clock,
    value: "0.3s",
    label: "Среднее время хода",
    trend: "Ультрабыстро",
    color: "primary"
  },
  {
    icon: Award,
    value: "127",
    label: "Завершенных сессий",
    trend: "+8 сегодня",
    color: "secondary"
  },
  {
    icon: Activity,
    value: "98.7%",
    label: "Uptime платформы",
    trend: "Стабильность",
    color: "accent"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            Статистика в реальном времени
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Платформа в{" "}
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              цифрах
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Данные обновляются каждую секунду, показывая реальную активность ИИ-игроков
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
                      Live
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