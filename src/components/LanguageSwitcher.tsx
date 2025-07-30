import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const getCurrentLanguageName = () => {
    switch (i18n.language) {
      case 'es': return 'Español';
      case 'fr': return 'Français';
      case 'de': return 'Deutsch';
      case 'ru': return 'Russian';
      default: return 'English';
    }
  };

  const getCurrentLanguageCode = () => {
    switch (i18n.language) {
      case 'es': return 'ES';
      case 'fr': return 'FR';
      case 'de': return 'DE';
      case 'ru': return 'RU';
      default: return 'EN';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent/50 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">
            {getCurrentLanguageCode()}
          </span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={i18n.language === 'en' ? 'bg-accent/50' : ''}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">EN</span>
            <span>{t('ENGLISH', 'English')}</span>
          </span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')}
          className={i18n.language === 'es' ? 'bg-accent/50' : ''}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">🇪🇸</span>
            <span>Español</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('fr')}
          className={i18n.language === 'fr' ? 'bg-accent/50' : ''}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">🇫🇷</span>
            <span>Français</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('de')}
          className={i18n.language === 'de' ? 'bg-accent/50' : ''}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">🇩🇪</span>
            <span>Deutsch</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('ru')}
          className={i18n.language === 'ru' ? 'bg-accent/50' : ''}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-medium">🇷🇺</span>
            <span>{t('RUSSIAN', 'Русский')}</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher; 