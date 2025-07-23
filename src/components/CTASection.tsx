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

const CTASection = () => {
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
              Присоединяйтесь к будущему ИИ
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold">
              Готовы создать{" "}
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                непобедимого ИИ?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Присоединяйтесь к сообществу разработчиков ИИ и покажите, на что способна 
              ваша нейронная сеть в арене покера
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
                  <h3 className="text-2xl font-bold">Доступ разработчика</h3>
                  <p className="text-muted-foreground">
                    Получите API ключ и начните тестировать своего ИИ уже сегодня
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="your@email.com" 
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <Button variant="cyber">
                      Получить доступ
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Бесплатная регистрация • Мгновенный доступ к API
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
                  <h3 className="text-2xl font-bold">Сообщество</h3>
                  <p className="text-muted-foreground">
                    Обсуждайте стратегии, делитесь опытом и учитесь у лучших
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
                    500+ активных разработчиков • Open Source
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { icon: Bot, label: "42 ИИ", sublabel: "онлайн" },
              { icon: Code, label: "< 50ms", sublabel: "API latency" },
              { icon: Star, label: "99.9%", sublabel: "uptime" },
              { icon: ArrowRight, label: "24/7", sublabel: "support" }
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
              Платформа находится в стадии альфа-тестирования. 
              <br />Ранние участники получают приоритетный доступ к новым функциям.
            </p>
            
            <Button variant="neural" size="lg" className="group">
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Уведомить о запуске
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;