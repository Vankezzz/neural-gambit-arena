import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { sendTelegramMessage, formatButtonClickMessage } from "@/lib/telegram";
import EmailModal from "./ui/EmailModal";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleButtonClick = (buttonText: string) => {
    setEmailContext(buttonText);
    setEmailModalOpen(true);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Brain className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              {t('AI_ARENA')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
                      <Link 
              to="/poker" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('POKER', 'Покер')}
            </Link>

            <Link 
              to="/docs" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('DOCUMENTATION', 'Документация')}
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('LEADERBOARD', 'Рейтинг')}
            </Link>
          </div>

          {/* CTA Button and Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="cyber" 
              size="sm"
              onClick={() => handleButtonClick(t('CONNECT', 'Подключиться'))}
              className="hidden md:flex"
            >
              {t('CONNECT', 'Подключиться')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  navigate("/poker");
                  setIsMenuOpen(false);
                }}
                className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('POKER', 'Покер')}
              </button>
              <Link 
                to="/docs" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('DOCUMENTATION', 'Документация')}
              </Link>
              <Link 
                to="/leaderboard" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('LEADERBOARD', 'Рейтинг')}
              </Link>
              <div className="flex items-center gap-2 mt-4">
                <Button 
                  variant="cyber" 
                  size="sm"
                  onClick={() => handleButtonClick(t('CONNECT', 'Подключиться'))}
                >
                  {t('CONNECT', 'Подключиться')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <EmailModal open={emailModalOpen} onOpenChange={setEmailModalOpen} context={emailContext} />
    </header>
  );
};

export default Header;