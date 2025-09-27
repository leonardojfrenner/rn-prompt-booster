import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Saborê
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-foreground hover:text-sabore-green transition-colors">
              Como Funciona
            </a>
            <a href="#beneficios" className="text-foreground hover:text-sabore-green transition-colors">
              Benefícios
            </a>
            <a href="#precos" className="text-foreground hover:text-sabore-green transition-colors">
              Preços
            </a>
            <a href="#contato" className="text-foreground hover:text-sabore-green transition-colors">
              Contato
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-sabore-green">
              Entrar
            </Button>
            <Button variant="hero">
              Cadastrar Restaurante
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4">
              <a href="#como-funciona" className="text-foreground hover:text-sabore-green transition-colors">
                Como Funciona
              </a>
              <a href="#beneficios" className="text-foreground hover:text-sabore-green transition-colors">
                Benefícios
              </a>
              <a href="#precos" className="text-foreground hover:text-sabore-green transition-colors">
                Preços
              </a>
              <a href="#contato" className="text-foreground hover:text-sabore-green transition-colors">
                Contato
              </a>
              <div className="pt-4 border-t border-border/50 space-y-2">
                <Button variant="ghost" className="w-full text-foreground hover:text-sabore-green">
                  Entrar
                </Button>
                <Button variant="hero" className="w-full">
                  Cadastrar Restaurante
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;