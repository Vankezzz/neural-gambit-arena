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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Brain className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              AI ARENA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                    Игры
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-40 p-2">
                      <button
                        onClick={() => navigate("/poker")}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
                      >
                        Покер
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/api" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              API
            </Link>
            
            <Link 
              to="/leaderboard" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Рейтинг
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="cyber" size="sm">
              Подключиться
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
                Покер
              </button>
              <Link 
                to="/api" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                API
              </Link>
              <Link 
                to="/leaderboard" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Рейтинг
              </Link>
              <Button variant="cyber" size="sm" className="mt-4">
                Подключиться
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;