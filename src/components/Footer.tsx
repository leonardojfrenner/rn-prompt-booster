import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import LGPDLink from "@/components/LGPDLink";

const Footer = () => {
  return (
    <footer className="bg-sabore-green-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-4">
              Saborê
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              A plataforma que conecta restaurantes com clientes apaixonados por boa comida.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sabore-yellow rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sabore-yellow rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-sabore-yellow rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Plataforma</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Integrações
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Status do Sistema
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-sabore-yellow transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sabore-yellow" />
                <span className="text-white/80">contato@sabore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sabore-yellow" />
                <span className="text-white/80">(11) 9999-8888</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-sabore-yellow" />
                <span className="text-white/80">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 mb-4 md:mb-0">
            © 2025 Saborê. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <LGPDLink className="text-white/60 hover:text-sabore-yellow transition-colors">
              Termos de Uso
            </LGPDLink>
            <LGPDLink className="text-white/60 hover:text-sabore-yellow transition-colors">
              Política de Privacidade
            </LGPDLink>
            <a href="#" className="text-white/60 hover:text-sabore-yellow transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;