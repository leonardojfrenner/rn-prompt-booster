import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sabore-green-dark to-sabore-green">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="p-12 bg-white/95 backdrop-blur-sm shadow-hero border-0">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-sabore-green-dark mb-6">
              Pronto para Transformar seu Restaurante?
            </h2>
            
            <p className="text-xl text-sabore-brown mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de restaurantes que já descobriram o poder do Saborê. 
              Cadastre-se gratuitamente e comece a ver resultados hoje mesmo!
            </p>

            {/* Benefits List */}
            <div className="grid md:grid-cols-2 gap-4 mb-10 text-left max-w-2xl mx-auto">
              {[
                "Cadastro 100% gratuito",
                "Sem taxas de setup",
                "Suporte completo na configuração",
                "Primeiros 30 dias sem comissão"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sabore-green flex-shrink-0" />
                  <span className="text-sabore-brown">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg border-sabore-green/30 focus:border-sabore-green"
                  required
                />
                <Button 
                  type="submit"
                  variant="hero" 
                  size="lg" 
                  className="h-12 px-8 whitespace-nowrap"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>

            <p className="text-sm text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <a href="#" className="text-sabore-green hover:underline">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-sabore-green hover:underline">
                Política de Privacidade
              </a>
            </p>
          </div>
        </Card>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <p className="text-white/90 mb-6 text-lg">
            Ainda tem dúvidas? Fale com nosso time de especialistas
          </p>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-sabore-green">
            Agendar Demonstração Gratuita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;