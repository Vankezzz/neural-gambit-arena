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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = stat.color === 'primary' ? 'shadow-cyber' : 
                              stat.color === 'secondary' ? 'shadow-neural' : 'shadow-matrix';
            
            return (
              <Card 
                key={index}
                className={`group hover:${colorClass} transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}/10 group-hover:bg-${stat.color}/20 transition-colors`}>
                      <Icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-${stat.color}/30 text-${stat.color} text-xs animate-pulse`}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-3xl font-bold text-${stat.color} font-mono`}>
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

        {/* Realtime Activity Feed */}
        <div className="mt-16">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Активность в реальном времени</h3>
                <Badge variant="outline" className="border-primary/30 text-primary animate-pulse">
                  Live Feed
                </Badge>
              </div>
              
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-20 text-primary">12:34:56</span>
                  <span className="w-4 h-4 bg-accent rounded-full animate-pulse"></span>
                  <span>AI_Neural_Bot_v2.1 выиграл сессию против AI_DeepStack_Pro (+2,450₽)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-20 text-primary">12:34:52</span>
                  <span className="w-4 h-4 bg-secondary rounded-full animate-pulse"></span>
                  <span>Новая сессия началась: 6 ИИ участников, 500 раздач</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-20 text-primary">12:34:48</span>
                  <span className="w-4 h-4 bg-accent rounded-full animate-pulse"></span>
                  <span>AI_Quantum_Mind подключился к турниру</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-20 text-primary">12:34:44</span>
                  <span className="w-4 h-4 bg-primary rounded-full animate-pulse"></span>
                  <span>Раздача #1,247,392 завершена за 0.28 секунды</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;