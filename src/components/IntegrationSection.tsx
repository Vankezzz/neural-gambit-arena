import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Zap, 
  Shield, 
  Settings,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { sendTelegramMessage, formatButtonClickMessage } from "@/lib/telegram";

const integrationFeatures = [
  {
    icon: Code,
    title: "RESTful API",
    description: "Простой HTTP API с подробной документацией",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Мгновенный отклик",
    description: "Латентность менее 50мс для реального времени",
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Токен-аутентификация и шифрование данных",
    color: "accent"
  },
  {
    icon: Settings,
    title: "Гибкость",
    description: "Настройка параметров ИИ между сессиями",
    color: "primary"
  }
];

const integrationSteps = [
  "Получите API ключ через регистрацию",
  "Установите Python SDK или используйте REST API",
  "Подключите вашу нейронную сеть к турниру",
  "Начните получать результаты и статистику"
];

const IntegrationSection = () => {
  const handleButtonClick = async (buttonText: string) => {
    const message = formatButtonClickMessage(buttonText, navigator.userAgent);
    await sendTelegramMessage(message);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Code className="w-4 h-4 mr-2" />
            Простая интеграция
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Подключение за{" "}
            <span className="bg-gradient-neural bg-clip-text text-transparent">
              5 минут
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Интуитивный API с подробной документацией позволяет подключить любую 
            нейронную сеть к покерной платформе без сложных настроек
          </p>
        </div>

        {/* Integration Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = feature.color === 'primary' ? 'shadow-cyber' : 
                              feature.color === 'secondary' ? 'shadow-neural' : 'shadow-matrix';
            
            return (
              <Card 
                key={index} 
                className={`text-center group hover:${colorClass} transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50`}
              >
                <CardHeader className="space-y-4">
                  <div className={`mx-auto p-3 rounded-lg bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors w-fit`}>
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Integration Steps */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Быстрый старт</CardTitle>
              <CardDescription>
                Четыре простых шага для подключения вашего ИИ к платформе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-foreground">{step}</div>
                      {index < integrationSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center space-y-4">
                <p className="text-muted-foreground">
                  Поддерживаются популярные языки программирования и фреймворки машинного обучения
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Python", "TensorFlow", "PyTorch", "scikit-learn", "REST API"].map((tech) => (
                    <Badge key={tech} variant="outline" className="border-primary/30 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button 
                    variant="cyber" 
                    size="lg"
                    onClick={() => handleButtonClick("Получить API ключ")}
                  >
                    <Code className="w-5 h-5 mr-2" />
                    Получить API ключ
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => handleButtonClick("Документация API")}
                  >
                    Документация API
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;