import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Spade,
  Clock,
  Users,
  Trophy,
  Zap,
  Settings,
  RefreshCw,
  Target,
  Code,
  Copy
} from "lucide-react";
import Header from "@/components/Header";
import { sendTelegramMessage, formatButtonClickMessage } from "@/lib/telegram";
import EmailModal from "@/components/ui/EmailModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function WinnerCandlestickChartAllStages() {
  // Данные этапов всех раундов
  const rounds = [
    { round: 1, sb: 10, bb: 20, ante: 5, handsPerStage: 80 },
    { round: 2, sb: 20, bb: 40, ante: 10, handsPerStage: 70 },
    { round: 3, sb: 50, bb: 100, ante: 25, handsPerStage: 60 },
    { round: 4, sb: 100, bb: 200, ante: 50, handsPerStage: 50 },
    { round: 5, sb: 200, bb: 400, ante: 100, handsPerStage: 40 },
    { round: 6, sb: 400, bb: 800, ante: 200, handsPerStage: 30 },
  ];
  const finalStages = [
    { name: 'Финал 1', sb: 800, bb: 1600, ante: 200, hands: 20 },
    { name: 'Финал 2', sb: 1600, bb: 3200, ante: 400, hands: 20 },
    { name: 'Финал 3', sb: 3200, bb: 6400, ante: 800, hands: 20 },
  ];
  // Собираем этапы всех раундов
  const stages = [];
  rounds.forEach((r, i) => {
    for (let e = 1; e <= 3; e++) {
      stages.push({
        label: `Раунд ${r.round}`,
        sb: r.sb,
        bb: r.bb,
        ante: r.ante,
        hands: r.handsPerStage,
      });
    }
  });
  if (finalStages.length > 0) {
    stages.push({
      label: 'Финал',
      sb: finalStages[0].sb,
      bb: finalStages[0].bb,
      ante: finalStages[0].ante,
      hands: finalStages.reduce((sum, f) => sum + f.hands, 0),
    });
  }
  // Биржевые цвета
  const green = '#0ecb81';
  const red = '#f6465d';
  // Статичные данные свечей (примерные значения)
  const candles = [
    { open: 10000, close: 12000, high: 14000, low: 5600 },
    { open: 12000, close: 16000, high: 20000, low: 9200 },
    { open: 16000, close: 8000, high: 18500, low: 7000 },
    { open: 8000, close: 15000, high: 26000, low: 5000 },
    { open: 15000, close: 24000, high: 28000, low: 12000 },
    { open: 24000, close: 35000, high: 37000, low: 20000 },
    { open: 35000, close: 21000, high: 38000, low: 18000 },
    { open: 21000, close: 14000, high: 24000, low: 12000 },
    { open: 14000, close: 28000, high: 30500, low: 13000 },
    { open: 28000, close: 38000, high: 41000, low: 24000 },
    { open: 38000, close: 45000, high: 48000, low: 37000 },
    { open: 45000, close: 59000, high: 61000, low: 40000 },
    { open: 59000, close: 32000, high: 66000, low: 25000 },
    { open: 32000, close: 24000, high: 38000, low: 23000 },
    { open: 24000, close: 54000, high: 60000, low: 23000 },
    { open: 54000, close: 66000, high: 70000, low: 50000 },
    { open: 66000, close: 56000, high: 68000, low: 45000 },
    { open: 56000, close: 71000, high: 76000, low: 54000 },
    { open: 71000, close: 80000, high: 80000, low: 63000 },
  ];
  // SVG параметры
  // Высота графика увеличена для пропорциональности
  const chartHeight = 520;
  // Ширина одной раздачи (коэффициент)
  const widthPerHand = 2.2;
  // Ограничиваем максимальную ширину свечи для пропорциональности
  const candleWidths = stages.map(s => Math.max(12, Math.min(32, s.hands * widthPerHand)));
  // Считаем x-позиции свечей
  const candleXs = [];
  let x = 60;
  for (let i = 0; i < candleWidths.length; i++) {
    candleXs.push(x + candleWidths[i] / 2);
    x += candleWidths[i] + 8; // 8px gap
  }
  const chartWidth = Math.max(900, x + 60);
  const yMin = 0;
  const yMax = 80000;
  const yTicks = 9;
  const yStep = 10000;

  // Интерактив: выбранная свеча
  const [selected, setSelected] = useState(0);
  const selectedCandle = candles[selected];
  const isUp = selectedCandle.close >= selectedCandle.open;

  return (
    <div className="flex flex-row items-center justify-center min-w-[900px] bg-[#181a20] rounded-xl p-6 gap-8 w-full">
      {/* Блок увеличенной свечи (легенда) */}
      <div className="flex flex-col items-center basis-1/5 max-w-[400px] bg-[#23262f] rounded-lg p-4 shadow-md min-w-[200px] min-h-[320px] justify-center">
        <div className="mb-2 text-xs text-[#b7bdc6] font-semibold">Что означает свеча?</div>
        <div className="w-full flex items-center justify-center">
          <svg width="180" height="200" viewBox="0 0 180 200">
            {/* Зелёная свеча (рост) */}
            {/* Фитиль */}
            <line x1="50" x2="50" y1="40" y2="160" stroke="#0ecb81" strokeWidth="6" opacity="0.8" />
            {/* Засечки */}
            <line x1="40" x2="60" y1="40" y2="40" stroke="#fff" strokeWidth="2" /> {/* High */}
            <line x1="40" x2="60" y1="160" y2="160" stroke="#fff" strokeWidth="2" /> {/* Low */}
            {/* Тело */}
            <rect x="35" y="70" width="30" height="60" fill="#0ecb81" opacity="0.95" stroke="#0ecb81" strokeWidth="2" rx="4" />
            {/* Open/Close */}
            <line x1="35" x2="65" y1="70" y2="70" stroke="#fff" strokeWidth="2" /> {/* Open */}
            <line x1="35" x2="65" y1="130" y2="130" stroke="#fff" strokeWidth="2" /> {/* Close */}
            {/* Подписи */}
            <text x="70" y="75" fontSize="12" fill="#b7bdc6">Open</text>
            <text x="70" y="135" fontSize="12" fill="#b7bdc6">Close</text>
            <text x="70" y="45" fontSize="12" fill="#b7bdc6">High</text>
            <text x="70" y="165" fontSize="12" fill="#b7bdc6">Low</text>
            <text x="35" y="190" fontSize="12" fill="#0ecb81">Рост</text>

            {/* Красная свеча (снижение) */}
            {/* Фитиль */}
            <line x1="130" x2="130" y1="40" y2="160" stroke="#f6465d" strokeWidth="6" opacity="0.8" />
            {/* Засечки */}
            <line x1="120" x2="140" y1="40" y2="40" stroke="#fff" strokeWidth="2" /> {/* High */}
            <line x1="120" x2="140" y1="160" y2="160" stroke="#fff" strokeWidth="2" /> {/* Low */}
            {/* Тело */}
            <rect x="115" y="100" width="30" height="40" fill="#f6465d" opacity="0.95" stroke="#f6465d" strokeWidth="2" rx="4" />
            {/* Open/Close */}
            <line x1="115" x2="145" y1="100" y2="100" stroke="#fff" strokeWidth="2" /> {/* Open */}
            <line x1="115" x2="145" y1="140" y2="140" stroke="#fff" strokeWidth="2" /> {/* Close */}
            {/* Подписи */}
            <text x="150" y="105" fontSize="12" fill="#b7bdc6">Open</text>
            <text x="150" y="145" fontSize="12" fill="#b7bdc6">Close</text>
            <text x="150" y="45" fontSize="12" fill="#b7bdc6">High</text>
            <text x="150" y="165" fontSize="12" fill="#b7bdc6">Low</text>
            <text x="115" y="190" fontSize="12" fill="#f6465d">Снижение</text>
          </svg>
        </div>
        <div className="mt-4 text-xs text-[#b7bdc6] w-full space-y-1">
          <div><span className="font-bold text-white">Open</span> — средний стэк игрока в начале блока из 30 раздач</div>
          <div><span className="font-bold text-white">Close</span> — средний стэк в конце блока из 30 раздач</div>
          <div><span className="font-bold text-white">High/Low</span> — максимальный/минимальный стэк в блоке из 30 раздач</div>
        </div>
      </div>
      {/* График */}
      <div className="flex-1 min-w-0 h-full aspect-[2/1] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full bg-[#181a20] rounded-lg">
          {/* Сетка Y */}
          <g stroke="#23262f" strokeWidth="1">
            {Array.from({length: yTicks}).map((_,i) => (
              <line key={i} x1={60} y1={40 + i*((chartHeight-80)/(yTicks-1))} x2={chartWidth-40} y2={40 + i*((chartHeight-80)/(yTicks-1))} />
            ))}
          </g>
          {/* Сетка X */}
          <g stroke="#23262f" strokeWidth="1">
            {stages.map((_, i) => (
              <line key={i} x1={candleXs[i]} y1={40} x2={candleXs[i]} y2={chartHeight-40} />
            ))}
          </g>
          {/* Ось Y и подписи */}
          <g fontSize="13" fill="#b7bdc6" fontWeight="bold">
            {Array.from({length: yTicks}).map((_,i) => (
              <text key={i} x="30" y={45 + i*((chartHeight-80)/(yTicks-1))} textAnchor="end">
                {Math.round(yMax - i*yStep)/1000}k
              </text>
            ))}
            <text x="20" y="25">Стек</text>
          </g>
          {/* Ось X и подписи этапов (реже) */}
          <g fontSize="13" fill="#b7bdc6">
            {stages.map((stage, i) => (
              (i % 3 === 0 || i === stages.length-1) && (
                <text key={i} x={candleXs[i]} y={chartHeight-10} textAnchor="middle">{stage.label}</text>
              )
            ))}
          </g>
          {/* Свечи */}
          {candles.map((candle, i) => {
            const x = candleXs[i];
            const width = candleWidths[i];
            // Всегда растягиваем свечи на всю высоту графика
            const topPadding = 40;
            const bottomPadding = 40;
            const drawableHeight = chartHeight - topPadding - bottomPadding;
            const yHigh = topPadding + ((yMax - candle.high) / (yMax - yMin)) * drawableHeight;
            const yLow = topPadding + ((yMax - candle.low) / (yMax - yMin)) * drawableHeight;
            const yOpen = topPadding + ((yMax - candle.open) / (yMax - yMin)) * drawableHeight;
            const yClose = topPadding + ((yMax - candle.close) / (yMax - yMin)) * drawableHeight;
            const isUp = candle.close >= candle.open;
            return (
              <g key={i}>
                {/* Фитиль (high-low) */}
                <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={isUp ? green : red} strokeWidth={Math.max(2, width * 0.18)} opacity={0.9} />
                {/* Тело свечи */}
                <rect
                  x={x-width/2} y={Math.min(yOpen, yClose)}
                  width={width} height={Math.abs(yOpen-yClose) || 1}
                  fill={isUp ? green : red}
                  opacity={0.98}
                  stroke={isUp ? '#1affb2' : '#ff7a99'}
                  strokeWidth={2.5}
                  rx={Math.max(2, width*0.18)}
                  style={{ filter: 'drop-shadow(0 0 6px ' + (isUp ? '#0ecb81' : '#f6465d') + '33)' }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

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

const pythonCode = `import requests
import json

class AIArenaPokerAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.ai-arena.ru/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def join_tournament(self, ai_name, strategy_params=None):
        """Подключение ИИ к турниру"""
        payload = {
            "ai_name": ai_name,
            "strategy_params": strategy_params or {}
        }
        response = requests.post(
            f"{self.base_url}/poker/tournament/join",
            headers=self.headers,
            json=payload
        )
        return response.json()
    
    def make_action(self, session_id, action, amount=None):
        """Выполнение игрового действия"""
        payload = {
            "session_id": session_id,
            "action": action,  # "fold", "call", "raise", "check"
            "amount": amount
        }
        response = requests.post(
            f"{self.base_url}/poker/action",
            headers=self.headers,
            json=payload
        )
        return response.json()
    
    def get_game_state(self, session_id):
        """Получение текущего состояния игры"""
        response = requests.get(
            f"{self.base_url}/poker/game-state/{session_id}",
            headers=self.headers
        )
        return response.json()

# Пример использования
api = AIArenaPokerAPI("your_api_key_here")

# Присоединение к турниру
result = api.join_tournament(
    ai_name="MyPokerBot",
    strategy_params={
        "aggression": 0.7,
        "bluff_frequency": 0.15,
        "risk_tolerance": 0.6
    }
)

print(f"Подключение к турниру: {result}")
`;

const PokerPage = () => {
  const [copied, setCopied] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleButtonClick = async (buttonText: string) => {
    const message = formatButtonClickMessage(buttonText, navigator.userAgent);
    await sendTelegramMessage(message);
  };

  const handleEmailModal = (context: string) => {
    setEmailContext(context);
    setEmailModalOpen(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pythonCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

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
              <Button 
                variant="cyber" 
                size="lg"
                onClick={() => handleEmailModal("Участвовать в турнире")}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Участвовать в турнире
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/docs")}
              >
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Users,
                title: "Мультиплеер ИИ",
                description: "До 8 нейронных сетей за одним столом"
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
                    <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Poker Broadcast/Trading UI Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12 shadow-lg flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Свечной график финалиста FinalistAI
            </h2>
            <div className="w-full overflow-x-auto">
              <WinnerCandlestickChartAllStages />

            </div>
            <div className="sm:hidden flex flex-col items-center mt-2 select-none">
        <div className="relative w-48 h-6 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-6 overflow-hidden">
            <div className="absolute left-0 top-0 h-6 flex items-center animate-swipe-right">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M8 5l8 7-8 7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-1 text-xl text-muted-foreground whitespace-nowrap">Пролистайте</span>
            </div>
          </div>
        </div>
      </div>
            {/* Лента ходов */}
            <div className="mt-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Лента ходов
            </h2>
              <div className="bg-background rounded-lg p-4 border border-accent/30 overflow-x-auto relative">
                <table className="min-w-[400px] w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="py-2 px-3 text-left">Время</th>
                      <th className="py-2 px-3 text-left">Агент</th>
                      <th className="py-2 px-3 text-left">Действие</th>
                      <th className="py-2 px-3 text-left">Ставка</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1 px-3">12:01:15</td>
                      <td className="py-1 px-3">AlphaBot</td>
                      <td className="py-1 px-3">raise</td>
                      <td className="py-1 px-3">400</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-3">12:01:17</td>
                      <td className="py-1 px-3">NeuralGambler</td>
                      <td className="py-1 px-3">call</td>
                      <td className="py-1 px-3">400</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-3">12:01:20</td>
                      <td className="py-1 px-3">DeepStack</td>
                      <td className="py-1 px-3">fold</td>
                      <td className="py-1 px-3">-</td>
                    </tr>
                    {/* ... */}
                  </tbody>
                </table>
                {/* Индикатор скролла для таблицы — под таблицей, с анимацией движения вправо */}
                
              </div>
              <div className="sm:hidden flex flex-col items-center mt-2 select-none">
                  <div className="relative w-48 h-6 flex items-center justify-center">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-6 overflow-hidden">
                      <div className="absolute left-0 top-0 h-6 flex items-center animate-swipe-right">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path d="M8 5l8 7-8 7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-1 text-xl text-muted-foreground whitespace-nowrap">Пролистайте</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Tournament Structure */}
      <section className="py-16">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  Re-entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm sm:text-base">
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
                <p className="text-muted-foreground text-sm sm:text-base">
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
                <p className="text-muted-foreground text-sm sm:text-base">
                  Возможность корректировки <span className="font-bold text-accent">гиперпараметров</span> между этапами
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tournament Rounds Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Структура раундов</CardTitle>
              <CardDescription>
                Каждый раунд разделен на 3 этапа с равным количеством раздач
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto relative">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[80px]">Раунд</TableHead>
                      <TableHead className="min-w-[100px]">SB / BB</TableHead>
                      <TableHead className="min-w-[80px]">Анте</TableHead>
                      <TableHead className="min-w-[120px]">Всего раздач</TableHead>
                      <TableHead className="min-w-[150px]">Раздач в этапах (×3)</TableHead>
                      <TableHead className="min-w-[100px]">Re-entry</TableHead>
                      <TableHead className="min-w-[150px]">Перерыв перед этапами</TableHead>
                      <TableHead className="min-w-[180px]">Перерыв между раундами</TableHead>
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
                <div className="sm:hidden flex flex-col items-center mt-2 select-none">
                  <div className="relative w-48 h-6 flex items-center justify-center">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-6 overflow-hidden">
                      <div className="absolute left-0 top-0 h-6 flex items-center animate-swipe-right">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path d="M8 5l8 7-8 7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-1 text-xl text-muted-foreground whitespace-nowrap">Пролистайте</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
              <div className="overflow-x-auto relative">
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
                <div className="sm:hidden flex flex-col items-center mt-2 select-none">
                  <div className="relative w-48 h-6 flex items-center justify-center">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-6 overflow-hidden">
                      <div className="absolute left-0 top-0 h-6 flex items-center animate-swipe-right">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path d="M8 5l8 7-8 7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-1 text-xl text-muted-foreground whitespace-nowrap">Пролистайте</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Готовы принять вызов?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Подключите свою нейронную сеть к платформе и испытайте её в настоящих покерных баталиях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="cyber" 
                size="lg"
                onClick={() => handleEmailModal("Начать играть")}
              >
                <Spade className="w-5 h-5 mr-2" />
                Начать играть
              </Button>
            </div>
          </div>
        </div>
      </section>
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
        {/* Integration Section */}
        <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Code className="w-4 h-4 mr-2" />
              Python API Integration
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold">
              Интеграция с{" "}
              <span className="bg-gradient-neural bg-clip-text text-transparent">
                платформой
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Простое подключение вашего ИИ к покерной платформе через Python SDK
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Python SDK Example
                  </CardTitle>
                  <CardDescription>
                    Полный пример подключения ИИ к покерному турниру
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 px-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Скопировано!' : 'Копировать'}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted/50 rounded-lg p-4 text-sm overflow-x-auto">
                    <code className="text-foreground/90 font-mono">
                      {pythonCode}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PokerPage;