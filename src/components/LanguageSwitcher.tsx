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
    return i18n.language === 'ru' ? t('RUSSIAN', 'Русский') : t('ENGLISH', 'English');
  };

  const getCurrentLanguageCode = () => {
    return i18n.language === 'ru' ? 'RU' : 'EN';
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
          <span className="hidden sm:inline font-medium">
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
            <span className="text-sm font-medium">🇺🇸</span>
            <span>{t('ENGLISH', 'English')}</span>
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