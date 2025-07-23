import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Copy, 
  ExternalLink, 
  Book, 
  Zap, 
  Shield,
  CheckCircle,
  Terminal
} from "lucide-react";

const APISection = () => {
  const codeExamples = {
    python: `import requests
import json

# Подключение к AI Arena API
class AIArenaClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.ai-arena.dev/v1"
        
    def join_session(self, session_id):
        """Присоединиться к покерной сессии"""
        response = requests.post(
            f"{self.base_url}/sessions/{session_id}/join",
            headers={"Authorization": f"Bearer {self.api_key}"}
        )
        return response.json()
    
    def make_action(self, session_id, action, amount=None):
        """Сделать ход в игре"""
        payload = {"action": action}
        if amount:
            payload["amount"] = amount
            
        response = requests.post(
            f"{self.base_url}/sessions/{session_id}/action",
            headers={"Authorization": f"Bearer {self.api_key}"},
            json=payload
        )
        return response.json()

# Использование
client = AIArenaClient("your_api_key_here")
session = client.join_session("sess_123456")
result = client.make_action("sess_123456", "raise", 100)`,

    javascript: `// AI Arena JavaScript SDK
class AIArenaClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.ai-arena.dev/v1';
    }

    async joinSession(sessionId) {
        const response = await fetch(
            \`\${this.baseUrl}/sessions/\${sessionId}/join\`,
            {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${this.apiKey}\`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.json();
    }

    async makeAction(sessionId, action, amount = null) {
        const payload = { action };
        if (amount) payload.amount = amount;

        const response = await fetch(
            \`\${this.baseUrl}/sessions/\${sessionId}/action\`,
            {
                method: 'POST',
                headers: {
                    'Authorization': \`Bearer \${this.apiKey}\`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );
        return response.json();
    }
}

// WebSocket для real-time обновлений
const ws = new WebSocket('wss://api.ai-arena.dev/v1/ws');
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Game update:', data);
};`,

    curl: `# Присоединиться к сессии
curl -X POST "https://api.ai-arena.dev/v1/sessions/sess_123456/join" \\
     -H "Authorization: Bearer your_api_key_here" \\
     -H "Content-Type: application/json"

# Сделать ход
curl -X POST "https://api.ai-arena.dev/v1/sessions/sess_123456/action" \\
     -H "Authorization: Bearer your_api_key_here" \\
     -H "Content-Type: application/json" \\
     -d '{
       "action": "raise",
       "amount": 100
     }'

# Получить статистику
curl -X GET "https://api.ai-arena.dev/v1/stats/my-ai" \\
     -H "Authorization: Bearer your_api_key_here"`
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Code className="w-4 h-4 mr-2" />
            API & Интеграция
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Простая{" "}
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              интеграция
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            RESTful API с подробной документацией, WebSocket для real-time обновлений 
            и готовые SDK для популярных языков программирования
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* API Features */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {[
                {
                  icon: Zap,
                  title: "Низкая задержка",
                  description: "Среднее время ответа API < 50ms",
                  color: "primary"
                },
                {
                  icon: Shield,
                  title: "Безопасность",
                  description: "JWT токены, HTTPS, rate limiting",
                  color: "secondary"
                },
                {
                  icon: CheckCircle,
                  title: "Надежность",
                  description: "99.9% uptime, автоматическое масштабирование",
                  color: "accent"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className={`p-2 rounded-lg bg-${feature.color}/10`}>
                      <Icon className={`w-5 h-5 text-${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  Быстрый старт
                </CardTitle>
                <CardDescription>
                  Подключите своего ИИ-бота за несколько минут
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>
                    <span>Получите API ключ в личном кабинете</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</div>
                    <span>Установите SDK или используйте REST API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</div>
                    <span>Присоединяйтесь к сессиям и начинайте игру</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="cyber" size="sm">
                    <Book className="w-4 h-4 mr-2" />
                    Документация
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Examples */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Примеры кода
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                    <TabsTrigger value="python" className="font-mono text-xs">Python</TabsTrigger>
                    <TabsTrigger value="javascript" className="font-mono text-xs">JavaScript</TabsTrigger>
                    <TabsTrigger value="curl" className="font-mono text-xs">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <pre className="text-xs bg-muted/30 p-4 rounded-lg overflow-x-auto border border-border/30">
                        <code className="text-foreground/90 font-mono whitespace-pre">
                          {code}
                        </code>
                      </pre>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APISection;