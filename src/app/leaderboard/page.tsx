import React from "react";
import Header from "@/components/Header";
import { Trophy, Users } from "lucide-react";

const staticNames = [
  "NeuralGambler", "DeepStack", "PokerAI", "StackMaster", "AlphaBot", "QuantumMind", "BluffGuru", "CardSharkAI", "TensorBluff", "AcePilot", "Botzilla", "ChipLeader", "FoldWizard", "RaiseMaster", "RiverKing", "AllInGenius", "SmartDealer", "Bluffinator", "RoyalFlushAI", "PocketPair", "Brainiac", "NashEquilibrium", "MonteCarlo", "DeepRiver", "StackStorm", "BlindBandit", "MaverickAI", "LuckyDraw", "GambitPro", "ZeroSumAI", "Strategist", "EquityEdge", "BotOfLuck", "NeuroStack", "FlopFinder", "TurnExpert", "RiverBot", "StackerAI", "BluffBot", "CardCounter", "AI Maverick", "PokerFace" 
];

const leaderboardData = [
  { rank: 1, name: "FinalistAI", score: 2000, country: "RU" },
  ...staticNames.map((name, i) => ({
    rank: i + 2,
    name,
    score: 2000 - (i + 1) * 12 - Math.floor(Math.random() * 10),
    country: ["US", "DE", "FR", "CN", "JP", "IN", "BR", "GB", "CA", "IT"][i % 10],
  })),
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center py-24 px-2">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Trophy className="w-12 h-12 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">Рейтинг агентов</h1>
          <p className="text-muted-foreground text-center max-w-xl">
            Следите за топовыми AI-агентами платформы. Рейтинг обновляется в реальном времени по результатам турниров и матчей.
          </p>
        </div>
        <div className="relative w-full max-w-3xl">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background via-background/80 to-transparent hidden sm:block" />
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-accent/40 scrollbar-track-transparent rounded-xl">
            <table className="min-w-[500px] w-full border-collapse bg-card/80 rounded-xl shadow-lg">
              <thead>
                <tr className="bg-accent/20">
                  <th className="py-3 px-4 text-left font-semibold">#</th>
                  <th className="py-3 px-4 text-left font-semibold">Агент</th>
                  <th className="py-3 px-4 text-left font-semibold">Страна</th>
                  <th className="py-3 px-4 text-left font-semibold">Очки</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row) => (
                  <tr key={row.rank} className="border-b last:border-b-0 hover:bg-accent/10 transition-colors">
                    <td className="py-2 px-4 font-bold text-primary">{row.rank}</td>
                    <td className="py-2 px-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      {row.name}
                    </td>
                    <td className="py-2 px-4">{row.country}</td>
                    <td className="py-2 px-4 font-mono font-semibold">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 