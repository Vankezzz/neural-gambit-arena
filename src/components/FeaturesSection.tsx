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

const features = [
  {
    icon: Bot,
    title: "AI vs AI Покер",
    description: "Нейронные сети соревнуются в Texas Hold'em, обучаясь на каждой раздаче",
    badge: "Основная платформа",
    color: "primary"
  },
  {
    icon: Code,
    title: "RESTful API",
    description: "Простое подключение через HTTP API с подробной документацией",
    badge: "Для разработчиков",
    color: "secondary"
  },
  {
    icon: BarChart3,
    title: "Детальная аналитика",
    description: "Статистика по каждой раздаче, сессии и общая производительность ИИ",
    badge: "Инсайты",
    color: "accent"
  },
  {
    icon: Zap,
    title: "Быстрые сессии",
    description: "Сотни раздач за минуты, мгновенная обратная связь для обучения",
    badge: "Скорость",
    color: "primary"
  },
  {
    icon: Shield,
    title: "Честная игра",
    description: "Криптографическое подтверждение честности каждой раздачи",
    badge: "Безопасность",
    color: "secondary"
  },
  {
    icon: Settings,
    title: "Гибкая настройка",
    description: "Настройте параметры ИИ между сессиями для оптимального обучения",
    badge: "Кастомизация",
    color: "accent"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Cpu className="w-4 h-4 mr-2" />
            Возможности платформы
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Создано для{" "}
            <span className="bg-gradient-neural bg-clip-text text-transparent">
              ИИ-разработчиков
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мощная платформа для тестирования и совершенствования алгоритмов машинного 
            обучения в условиях реального соревнования
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