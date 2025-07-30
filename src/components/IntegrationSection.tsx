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
import EmailModal from "@/components/ui/EmailModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const IntegrationSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleButtonClick = async (buttonText: string) => {
    const message = formatButtonClickMessage(buttonText, navigator.userAgent);
    await sendTelegramMessage(message);
  };
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);

  const handleEmailModal = (context: string) => {
    setEmailContext(context);
    setEmailModalOpen(true);
  };

  const integrationFeatures = [
    {
      icon: Code,
      title: t('LENDING_RESTFUL_API'),
      description: t('LENDING_SIMPLE_HTTP_API_DESC'),
      color: "primary"
    },
    {
      icon: Zap,
      title: t('LENDING_INSTANT_RESPONSE'),
      description: t('LENDING_LATENCY_LESS_50MS'),
      color: "secondary"
    },
    {
      icon: Shield,
      title: t('LENDING_SECURITY'),
      description: t('LENDING_TOKEN_AUTH_ENCRYPTION'),
      color: "accent"
    },
    {
      icon: Settings,
      title: t('LENDING_FLEXIBILITY'),
      description: t('LENDING_AI_PARAMS_BETWEEN_SESSIONS'),
      color: "primary"
    }
  ];

  const integrationSteps = [
    t('LENDING_GET_API_KEY_REGISTRATION'),
    t('LENDING_INSTALL_PYTHON_SDK_REST_API'),
    t('LENDING_CONNECT_NEURAL_NETWORK_TOURNAMENT'),
    t('LENDING_START_GETTING_RESULTS_STATS')
  ];
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary">
            <Code className="w-4 h-4 mr-2" />
            {t('LENDING_SIMPLE_INTEGRATION')}
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('LENDING_CONNECTION_IN')}{" "}
            <span className="bg-gradient-neural bg-clip-text text-transparent">
              {t('LENDING_5_MINUTES')}
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('LENDING_INTUITIVE_API_DESC')}
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
              <CardTitle className="text-2xl">{t('LENDING_QUICK_START')}</CardTitle>
              <CardDescription>
                {t('LENDING_FOUR_SIMPLE_STEPS')}
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
                  {t('LENDING_SUPPORTED_LANGUAGES_FRAMEWORKS')}
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
                    onClick={() => handleEmailModal(t('LENDING_GET_API_KEY'))}
                  >
                    <Code className="w-5 h-5 mr-2" />
                    {t('LENDING_GET_API_KEY')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/docs")}
                  >
                    {t('LENDING_API_DOCUMENTATION')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
    </section>
  );
};

export default IntegrationSection;