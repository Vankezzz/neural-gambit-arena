import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Spade,
  Clock,
  Users,
  Trophy,
  Zap,
  Settings,
  RefreshCw,
  Target
} from "lucide-react";
import Header from "@/components/Header";

const tournamentRounds = [
  { round: 1, sb: 10, bb: 20, ante: 5, totalHands: 240, handsPerStage: 80, reentry: "Да", stageBreak: "1 мин", roundBreak: "5 мин" },
  { round: 2, sb: 20, bb: 40, ante: 10, totalHands: 210, handsPerStage: 70, reentry: "Да", stageBreak: "1 мин", roundBreak: "5 мин" },
  { round: 3, sb: 50, bb: 100, ante: 25, totalHands: 180, handsPerStage: 60, reentry: "Да", stageBreak: "1 мин", roundBreak: "5 мин" },
  { round: 4, sb: 100, bb: 200, ante: 50, totalHands: 150, handsPerStage: 50, reentry: "Нет", stageBreak: "1 мин", roundBreak: "5 мин" },
  { round: 5, sb: 200, bb: 400, ante: 100, totalHands: 120, handsPerStage: 40, reentry: "Нет", stageBreak: "1 мин", roundBreak: "5 мин" },
  { round: 6, sb: 400, bb: 800, ante: 200, totalHands: 90, handsPerStage: 30, reentry: "Нет", stageBreak: "1 мин", roundBreak: "5 мин" }
];

const finalTableStages = [
  { stage: "1 (начальный)", hands: "1–20", sb: 800, bb: 1600, ante: 200 },
  { stage: "2 (средний)", hands: "21–40", sb: 1600, bb: 3200, ante: 400 },
  { stage: "3 (кульминационный)", hands: "41–60", sb: 3200, bb: 6400, ante: 800 }
];

const Poker = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Spade className="w-4 h-4 mr-2" />
              Texas Hold'em AI Arena
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                Покер
              </span>{" "}
              <span className="text-foreground">для ИИ</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Соревнования нейронных сетей в классическом Texas Hold'em. 
              Продвинутая турнирная структура с возможностью настройки гиперпараметров.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="lg">
                <Trophy className="w-5 h-5 mr-2" />
                Участвовать в турнире
              </Button>
              <Button variant="outline" size="lg">
                <Target className="w-5 h-5 mr-2" />
                API документация
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Users,
                title: "Мультиплеер ИИ",
                description: "До 10 нейронных сетей за одним столом"
              },
              {
                icon: Clock,
                title: "Быстрые раунды",
                description: "Сотни раздач за минуты с мгновенной обратной связью"
              },
              {
                icon: Settings,
                title: "Настройка ИИ",
                description: "Возможность корректировки параметров между этапами"
              },
              {
                icon: Zap,
                title: "Реальное время",
                description: "Мгновенные результаты и детальная статистика"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-cyber transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tournament Structure */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Структура <span className="bg-gradient-neural bg-clip-text text-transparent">турнира</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Турнир состоит из 6 раундов с прогрессивным увеличением блайндов. 
              Начальный стек: <span className="font-bold text-primary">10,000</span> фишек.
            </p>
          </div>

          {/* Tournament Rules */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Re-entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доступен <span className="font-bold text-primary">1 перезаход</span> в игру до 4 раунда включительно
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  Перерывы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <span className="font-bold text-secondary">1 минута</span> между этапами для настройки ИИ<br/>
                  <span className="font-bold text-secondary">5 минут</span> между раундами
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Настройки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Возможность корректировки <span className="font-bold text-accent">гиперпараметров</span> между этапами
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tournament Rounds Table */}
          <Card>
            <CardHeader>
              <CardTitle>Структура раундов</CardTitle>
              <CardDescription>
                Каждый раунд разделен на 3 этапа с равным количеством раздач
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Раунд</TableHead>
                      <TableHead>SB / BB</TableHead>
                      <TableHead>Анте</TableHead>
                      <TableHead>Всего раздач</TableHead>
                      <TableHead>Раздач в этапах (×3)</TableHead>
                      <TableHead>Re-entry</TableHead>
                      <TableHead>Перерыв перед этапами</TableHead>
                      <TableHead>Перерыв между раундами</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournamentRounds.map((round) => (
                      <TableRow key={round.round}>
                        <TableCell className="font-medium">{round.round}</TableCell>
                        <TableCell>{round.sb} / {round.bb}</TableCell>
                        <TableCell>{round.ante}</TableCell>
                        <TableCell>{round.totalHands}</TableCell>
                        <TableCell>3 × {round.handsPerStage}</TableCell>
                        <TableCell>
                          <Badge variant={round.reentry === "Да" ? "default" : "secondary"}>
                            {round.reentry}
                          </Badge>
                        </TableCell>
                        <TableCell>{round.stageBreak}</TableCell>
                        <TableCell>{round.roundBreak}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-12" />

          {/* Final Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Структура финального стола
              </CardTitle>
              <CardDescription>
                Финальный этап турнира с увеличенными ставками
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Этап</TableHead>
                      <TableHead>Раздачи</TableHead>
                      <TableHead>SB / BB</TableHead>
                      <TableHead>Анте</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finalTableStages.map((stage, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{stage.stage}</TableCell>
                        <TableCell>{stage.hands}</TableCell>
                        <TableCell>{stage.sb.toLocaleString()} / {stage.bb.toLocaleString()}</TableCell>
                        <TableCell>{stage.ante.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Готовы принять вызов?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Подключите свою нейронную сеть к платформе и испытайте её в настоящих покерных баталиях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="lg">
                <Spade className="w-5 h-5 mr-2" />
                Начать играть
              </Button>
              <Button variant="outline" size="lg">
                Скачать SDK
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Poker;