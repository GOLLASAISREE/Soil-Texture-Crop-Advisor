import { Button } from "./ui/button";
import { Globe, Home, Lightbulb, HelpCircle, Settings } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLanguageChange: () => void;
}

export function Header({ currentPage, onNavigate, onLanguageChange }: HeaderProps) {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">AI Crop Advisor</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-1"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              variant={currentPage === 'input' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('input')}
            >
              Soil Analysis
            </Button>
            <Button
              variant={currentPage === 'recommendations' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('recommendations')}
            >
              Recommendations
            </Button>
            <Button
              variant={currentPage === 'faq' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('faq')}
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              FAQs
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageChange}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">EN</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('settings')}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}