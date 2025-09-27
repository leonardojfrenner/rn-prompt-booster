import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Settings, 
  Megaphone, 
  Shield,
  Clock,
  Users
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Visibilidade Ampliada",
    description: "Apareça para milhares de clientes famintos que procuram exatamente o que você oferece.",
    color: "text-sabore-green"
  },
  {
    icon: Settings,
    title: "Gerenciamento Simplificado",
    description: "Painel intuitivo para gerenciar pedidos, cardápio e análises em um só lugar.",
    color: "text-sabore-brown"
  },
  {
    icon: Megaphone,
    title: "Marketing Eficaz",
    description: "Ferramentas automáticas de marketing para aumentar suas vendas sem esforço extra.",
    color: "text-sabore-yellow"
  },
  {
    icon: Shield,
    title: "Pagamentos Seguros",
    description: "Sistema de pagamento confiável e protegido para você e seus clientes.",
    color: "text-sabore-green"
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Nossa equipe está sempre disponível para ajudar seu restaurante a crescer.",
    color: "text-sabore-brown"
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Faça parte de uma rede de restaurantes que se ajudam mutuamente a prosperhar.",
    color: "text-sabore-yellow"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Por que escolher o{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Saborê?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos a maneira como restaurantes se conectam com seus clientes, 
            oferecendo ferramentas poderosas e resultados comprovados.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="p-8 shadow-card hover:shadow-hero transition-all duration-300 transform hover:-translate-y-2 border-border/50"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-background to-muted flex items-center justify-center mb-6 shadow-soft`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-hero rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Resultados que Falam por Si
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-sabore-yellow mb-2">+150%</div>
              <div className="text-lg opacity-90">Aumento médio nas vendas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-sabore-yellow mb-2">72h</div>
              <div className="text-lg opacity-90">Tempo médio para primeiro pedido</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-sabore-yellow mb-2">98%</div>
              <div className="text-lg opacity-90">Taxa de satisfação dos parceiros</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;