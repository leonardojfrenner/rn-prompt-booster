import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LGPDLinkProps {
  children: React.ReactNode;
  className?: string;
}

const LGPDLink = ({ children, className = "text-sabore-green hover:underline" }: LGPDLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b-2 border-green-600 pb-4">
          <DialogTitle className="text-2xl font-bold text-green-600">
            Política de Proteção de Dados
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[70vh] pr-2">
          <div className="space-y-6">
            {/* Seção 1 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">1. Introdução</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Esta Política de Proteção de Dados ("Política") descreve como o Saborê coleta, usa, armazena e protege suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e demais legislações aplicáveis.
              </p>
            </section>

            {/* Seção 2 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">2. Dados Coletados</h3>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Para Usuários:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Nome completo e CPF</li>
                <li className="text-sm text-gray-800">• Telefone e e-mail</li>
                <li className="text-sm text-gray-800">• Histórico de pedidos</li>
                <li className="text-sm text-gray-800">• Preferências de restaurantes</li>
                <li className="text-sm text-gray-800">• Avaliações e comentários</li>
              </ul>

              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Para Empresas:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Nome da empresa e CNPJ</li>
                <li className="text-sm text-gray-800">• Telefone e e-mail de contato</li>
                <li className="text-sm text-gray-800">• Endereço completo</li>
                <li className="text-sm text-gray-800">• Descrição do estabelecimento</li>
                <li className="text-sm text-gray-800">• Horário de funcionamento</li>
                <li className="text-sm text-gray-800">• Links de redes sociais</li>
                <li className="text-sm text-gray-800">• Cardápio em formato PDF</li>
                <li className="text-sm text-gray-800">• Imagens do estabelecimento e pratos</li>
                <li className="text-sm text-gray-800">• Dados de faturamento e pedidos</li>
                <li className="text-sm text-gray-800">• Avaliações e feedback dos clientes</li>
              </ul>
            </section>

            {/* Seção 2.1 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">2.1. Dados NÃO Coletados de Empresas</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Para proteger a privacidade e segurança, NÃO coletamos:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Dados pessoais dos funcionários (CPF, RG, etc.)</li>
                <li className="text-sm text-gray-800">• Informações bancárias detalhadas</li>
                <li className="text-sm text-gray-800">• Documentos fiscais internos</li>
                <li className="text-sm text-gray-800">• Estratégias comerciais confidenciais</li>
                <li className="text-sm text-gray-800">• Dados de fornecedores terceiros</li>
                <li className="text-sm text-gray-800">• Informações de concorrentes</li>
                <li className="text-sm text-gray-800">• Dados pessoais de clientes (apenas dados agregados)</li>
              </ul>
            </section>

            {/* Seção 2.2 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">2.2. Diferenciação: Dados de Empresa vs. Dados de Usuário</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                É importante entender que empresas e usuários têm perfis e responsabilidades diferentes:
              </p>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Dados de Empresa (Públicos):</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Visibilidade:</span> Informações visíveis a todos os usuários</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Propósito:</span> Facilitar escolhas e pedidos dos clientes</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Responsabilidade:</span> Empresa é responsável pela precisão</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Controle:</span> Empresa pode editar e atualizar</li>
              </ul>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Dados de Usuário (Privados):</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Visibilidade:</span> Apenas para o próprio usuário e plataforma</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Propósito:</span> Funcionamento do aplicativo e histórico pessoal</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Responsabilidade:</span> Plataforma protege e gerencia</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Controle:</span> Usuário pode excluir ou modificar</li>
              </ul>
              
              <p className="text-sm leading-relaxed text-gray-800 mt-2">
                <span className="bg-green-600 text-white px-1 rounded">Importante:</span> Empresas não têm acesso a dados pessoais de usuários individuais, apenas a dados agregados para fins de análise de negócio.
              </p>
            </section>

            {/* Seção 3 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">3. Finalidades do Tratamento</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Seus dados pessoais são utilizados para as seguintes finalidades:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Prestação dos serviços do aplicativo</li>
                <li className="text-sm text-gray-800">• Processamento de pedidos e pagamentos</li>
                <li className="text-sm text-gray-800">• Comunicação sobre pedidos e status</li>
                <li className="text-sm text-gray-800">• Melhoria da experiência do usuário</li>
                <li className="text-sm text-gray-800">• Suporte ao cliente</li>
                <li className="text-sm text-gray-800">• Marketing (apenas com consentimento)</li>
              </ul>
            </section>

            {/* Seção 4 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">4. Base Legal</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                O tratamento de seus dados é baseado nas seguintes hipóteses legais da LGPD:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Consentimento:</span> Para marketing e comunicações promocionais</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Execução de contrato:</span> Para prestação dos serviços</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Legítimo interesse:</span> Para melhorias e segurança</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Cumprimento de obrigação legal:</span> Para fins fiscais e regulatórios</li>
              </ul>
            </section>

            {/* Seção 5 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">5. Compartilhamento de Dados</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Seus dados podem ser compartilhados com:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Restaurantes para processamento de pedidos</li>
                <li className="text-sm text-gray-800">• Prestadores de serviços de pagamento</li>
                <li className="text-sm text-gray-800">• Serviços de entrega</li>
                <li className="text-sm text-gray-800">• Autoridades competentes (quando exigido por lei)</li>
              </ul>
            </section>

            {/* Seção 6 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">6. Segurança dos Dados</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Acesso não autorizado</li>
                <li className="text-sm text-gray-800">• Alteração, divulgação ou destruição não autorizada</li>
                <li className="text-sm text-gray-800">• Perda acidental</li>
                <li className="text-sm text-gray-800">• Processamento ilegal</li>
              </ul>
            </section>

            {/* Seção 7 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">7. Seus Direitos</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Conforme a LGPD, você tem os seguintes direitos:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Acesso:</span> Solicitar informações sobre seus dados</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Correção:</span> Solicitar correção de dados incorretos</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Exclusão:</span> Solicitar a exclusão de seus dados</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Portabilidade:</span> Receber seus dados em formato estruturado</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Revogação:</span> Revogar consentimento a qualquer momento</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Oposição:</span> Opor-se ao tratamento de dados</li>
              </ul>
            </section>

            {/* Seção 7.1 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">7.1. Responsabilidades Específicas da Empresa</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Como empresa parceira, você tem responsabilidades adicionais:
              </p>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Responsabilidades Legais:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">LGPD:</span> Cumprir todas as obrigações da Lei Geral de Proteção de Dados</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Direitos Autorais:</span> Garantir que todo conteúdo seja próprio ou licenciado</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Propriedade Intelectual:</span> Respeitar marcas e patentes de terceiros</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Leis Trabalhistas:</span> Cumprir legislação trabalhista aplicável</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Leis Sanitárias:</span> Seguir normas de higiene e segurança alimentar</li>
              </ul>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Responsabilidades Operacionais:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Precisão:</span> Manter informações sempre atualizadas e precisas</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Disponibilidade:</span> Garantir que produtos anunciados estejam disponíveis</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Qualidade:</span> Manter padrão de qualidade dos produtos/serviços</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Atendimento:</span> Responder adequadamente aos clientes</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Transparência:</span> Ser transparente sobre preços e condições</li>
              </ul>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Responsabilidades de Conteúdo:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Imagens:</span> Usar apenas fotos próprias ou com autorização</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Descrições:</span> Fornecer informações verdadeiras e não enganosas</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Preços:</span> Manter preços atualizados e sem cobranças ocultas</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Disponibilidade:</span> Informar sobre produtos indisponíveis</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Alergênicos:</span> Informar sobre ingredientes que causam alergias</li>
              </ul>
              
              <p className="text-sm leading-relaxed text-gray-800 mt-2">
                <span className="bg-green-600 text-white px-1 rounded">Consequências:</span> O descumprimento destas responsabilidades pode resultar em suspensão da conta, remoção de conteúdo ou encerramento da parceria.
              </p>
            </section>

            {/* Seção 8 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">8. Retenção de Dados</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta Política, respeitando:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Obrigações legais e regulatórias</li>
                <li className="text-sm text-gray-800">• Necessidades de negócio legítimas</li>
                <li className="text-sm text-gray-800">• Resolução de disputas</li>
                <li className="text-sm text-gray-800">• Cumprimento de acordos</li>
              </ul>
            </section>

            {/* Seção 9 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">9. Marketing e Comunicações</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Só enviaremos comunicações promocionais com seu consentimento explícito. Você pode:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Revogar o consentimento a qualquer momento</li>
                <li className="text-sm text-gray-800">• Cancelar inscrições em newsletters</li>
                <li className="text-sm text-gray-800">• Configurar preferências de comunicação</li>
              </ul>
            </section>

            {/* Seção 10 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">10. Cookies e Tecnologias Similares</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Melhorar a funcionalidade do aplicativo</li>
                <li className="text-sm text-gray-800">• Analisar o uso e performance</li>
                <li className="text-sm text-gray-800">• Personalizar a experiência</li>
                <li className="text-sm text-gray-800">• Fornecer conteúdo relevante</li>
              </ul>
            </section>

            {/* Seção 10.1 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">10.1. Política de Conteúdo para Empresas</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Ao utilizar nossa plataforma, você concorda em não compartilhar conteúdo que:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Violar direitos autorais:</span> Imagens, textos ou músicas sem autorização</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Ser inadequado:</span> Conteúdo ofensivo, discriminatório ou ilegal</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Promover violência:</span> Imagens ou descrições que incitem violência</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Ser enganoso:</span> Informações falsas sobre produtos ou serviços</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Violar privacidade:</span> Dados pessoais de terceiros sem consentimento</li>
                <li className="text-sm text-gray-800">• <span className="bg-green-600 text-white px-1 rounded">Ser comercial inadequado:</span> Spam, propaganda excessiva ou concorrência desleal</li>
              </ul>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Responsabilidades da Empresa:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Garantir que todas as imagens e descrições sejam próprias ou licenciadas</li>
                <li className="text-sm text-gray-800">• Manter informações atualizadas e precisas</li>
                <li className="text-sm text-gray-800">• Respeitar direitos de terceiros</li>
                <li className="text-sm text-gray-800">• Não usar a plataforma para atividades ilegais</li>
                <li className="text-sm text-gray-800">• Responder por danos causados por conteúdo inadequado</li>
              </ul>
              
              <h4 className="text-base font-semibold text-green-600 mb-2 mt-4">Ações da Plataforma:</h4>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• Monitoramento automático e manual de conteúdo</li>
                <li className="text-sm text-gray-800">• Remoção imediata de conteúdo inadequado</li>
                <li className="text-sm text-gray-800">• Suspensão temporária ou permanente da conta</li>
                <li className="text-sm text-gray-800">• Notificação às autoridades quando necessário</li>
                <li className="text-sm text-gray-800">• Direito de recusar ou remover qualquer conteúdo</li>
              </ul>
            </section>

            {/* Seção 11 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">11. Alterações na Política</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Esta Política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas através do aplicativo ou e-mail.
              </p>
            </section>

            {/* Seção 12 */}
            <section>
              <h3 className="text-lg font-bold text-yellow-600 mb-3">12. Contato</h3>
              <p className="text-sm leading-relaxed text-gray-800 mb-2">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="text-sm text-gray-800">• E-mail: privacidade@sabore.com</li>
                <li className="text-sm text-gray-800">• Telefone: (11) 99999-9999</li>
                <li className="text-sm text-gray-800">• Endereço: Rua da Privacidade, 123 - São Paulo/SP</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="border-t border-green-600 pt-4 mt-6">
              <p className="text-xs text-gray-600 italic text-center">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>
              <p className="text-xs text-gray-600 italic text-center">
                Esta política está em conformidade com a LGPD (Lei nº 13.709/2018)
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LGPDLink;
