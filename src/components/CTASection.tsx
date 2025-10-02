import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import LGPDLink from "@/components/LGPDLink";

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

            <p className="text-sm text-muted-foreground">
              Ao se cadastrar, você concorda com nossos{" "}
              <LGPDLink>Termos de Uso</LGPDLink>
              {" "}e{" "}
              <LGPDLink>Política de Privacidade</LGPDLink>
            </p>
          </div>
        </Card>

       
      </div>
    </section>
  );
};

export default CTASection;