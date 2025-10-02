import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-restaurant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Fresh ingredients and cooking" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sabore-green-dark/80 to-sabore-green/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-1 bg-sabore-yellow/20 px-4 py-2 rounded-full backdrop-blur-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-sabore-yellow text-sabore-yellow" />
            ))}
            <span className="ml-2 text-white font-medium">Plataforma #1 para Restaurantes</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Saborê:</span>
          <span className="block bg-gradient-to-r from-sabore-yellow to-sabore-yellow-light bg-clip-text text-transparent">
            Destaque seu Restaurante
          </span>
          <span className="block text-3xl md:text-5xl font-medium">
            Alcance Novas Delícias!
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Conecte-se com clientes famintos e veja seu negócio florescer na maior plataforma gastronômica do Brasil.
        </p>


        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-sabore-yellow">1000+</div>
            <div className="text-sm">Restaurantes Cadastrados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sabore-yellow">50K+</div>
            <div className="text-sm">Pedidos por Mês</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-sabore-yellow">4.9★</div>
            <div className="text-sm">Avaliação dos Usuários</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-sabore-yellow/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-sabore-brown/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;