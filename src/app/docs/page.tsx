import React, { useState } from "react";
import Header from "@/components/Header";
import heroImage from "@/assets/ai-arena-hero.jpg";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import EmailModal from "@/components/ui/EmailModal";
import { useTranslation } from 'react-i18next';

export default function DocsPage() {
  const { t } = useTranslation();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);

  const handleEmailModal = (context: string) => {
    setEmailContext(context);
    setEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16">
        <div className="flex flex-col items-center gap-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-10 shadow-lg">
          <img src={heroImage} alt={t('CONFUSED_ROBOT', 'Озадаченный робот')} className="w-40 h-40 object-contain mb-2 drop-shadow-xl" />
          <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-cyber bg-clip-text text-transparent animate-float">{t('WE_ARE_DEVELOPING', 'Мы уже разрабатываем')}</h1>
          <p className="text-lg text-muted-foreground max-w-xl text-center">
            {t('DOCS_COMING_SOON', 'Раздел документации скоро будет доступен.')}<br />{t('FOLLOW_UPDATES', 'Следите за обновлениями!')}
          </p>
          <Button 
            variant="cyber" 
            size="lg"
            onClick={() => handleEmailModal(t('NOTIFY_ON_LAUNCH', 'Уведомить о запуске'))}
            className="mt-2"
          >
            <Code className="w-5 h-5 mr-2" />
            {t('NOTIFY_ON_LAUNCH', 'Уведомить о запуске')}
          </Button>
        </div>
        <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
      </main>
    </div>
  );
} 