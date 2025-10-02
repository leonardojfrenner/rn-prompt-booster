import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FileText, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import LGPD from "@/pages/LGPD";
import { cadastrarRestaurante, uploadRestauranteArquivo, buscarEnderecoPorCep, RestauranteCreate } from "@/api/restaurante";

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [lotacao, setLotacao] = useState('');
  const [site, setSite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cardapio, setCardapio] = useState<File | null>(null);
  const [aceitaComunicacao, setAceitaComunicacao] = useState(false);
  const [aceitaMarketing, setAceitaMarketing] = useState(false);
  const [aceitaProtecaoDados, setAceitaProtecaoDados] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const handlePickCardapio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCardapio(file);
    }
  };

  const handlePickLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogo(file);
    }
  };

  const handlePickBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setBanner(file);
    }
  };

  const tryAutoFillByCep = async (value: string) => {
    setCep(value);
    const digits = value.replace(/\D/g, '');
    
    // Se o CEP tem 8 dígitos, busca o endereço
    if (digits.length === 8) {
      setIsFetchingCep(true);
      try {
        console.log('Buscando CEP:', digits);
        const endereco = await buscarEnderecoPorCep(digits);
        console.log('Endereço encontrado:', endereco);
        
        // Atualiza os campos automaticamente
        setRua(endereco.rua || '');
        setBairro(endereco.bairro || '');
        setCidade(endereco.cidade || '');
        setEstado(endereco.estado || '');
        
        console.log('Campos atualizados automaticamente');
      } catch (e: any) {
        console.error('Erro ao buscar CEP:', e);
        console.error('Detalhes do erro:', {
          message: e.message,
          name: e.name,
          stack: e.stack
        });
        
        // Verifica diferentes tipos de erro
        if (e.message?.includes('Failed to fetch') || e.message?.includes('ERR_CONNECTION_REFUSED')) {
          console.warn('Backend não está rodando. CEP não será preenchido automaticamente.');
          // Não mostra alerta para erro de conexão, apenas log
        } else if (e.message?.includes('CORS policy') || e.message?.includes('preflight request')) {
          console.warn('Erro de CORS. Verifique a configuração do backend.');
          // Não mostra alerta para erro de CORS, apenas log
        } else if (e.message?.includes('autenticação') || e.message?.includes('login')) {
          console.warn('API de CEP requer autenticação. Configure o endpoint público no backend.');
          // Não mostra alerta para erro de autenticação, apenas log
        } else if (e.message?.includes('404') || e.message?.includes('Not Found')) {
          console.warn('CEP não encontrado na base de dados.');
          // Não mostra alerta para CEP não encontrado, apenas log
        } else {
          console.warn('Erro desconhecido ao buscar CEP:', e.message);
          // Não mostra alerta para erros desconhecidos, apenas log
        }
      } finally {
        setIsFetchingCep(false);
      }
    } else if (digits.length < 8) {
      // Se o CEP não tem 8 dígitos, limpa os campos
      setRua('');
      setBairro('');
      setCidade('');
      setEstado('');
    }
  };

  const handleRegister = async () => {
    if (!aceitaProtecaoDados) {
      alert('É necessário aceitar a política de proteção de dados para continuar.');
      return;
    }
    if (!nome || !cnpj || !email || !senha) {
      alert('Preencha Nome, CNPJ, E-mail e Senha.');
      return;
    }
    setSubmitting(true);
    try {
      // 1) Faz upload dos arquivos, quando houverem
      let logoUrl: string | undefined;
      let bannerUrl: string | undefined;
      let cardapioUrl: string | undefined;
      
      if (logo) {
        try { 
          logoUrl = await uploadRestauranteArquivo('logo', logo); 
        } catch (error) {
          console.error('Erro ao fazer upload do logo:', error);
        }
      }
      if (banner) {
        try { 
          bannerUrl = await uploadRestauranteArquivo('banner', banner); 
        } catch (error) {
          console.error('Erro ao fazer upload do banner:', error);
        }
      }
      if (cardapio) {
        try { 
          cardapioUrl = await uploadRestauranteArquivo('cardapio', cardapio); 
        } catch (error) {
          console.error('Erro ao fazer upload do cardápio:', error);
        }
      }

      // 2) Prepara os dados para cadastro
      const numeroParsed = numero ? parseInt(numero, 10) : undefined;
      const lotacaoParsed = lotacao ? parseInt(lotacao, 10) : undefined;

      const dadosCadastro: RestauranteCreate = {
        nome,
        cnpj,
        telefone: telefone || undefined,
        email,
        senha,
        rua: rua || undefined,
        numero: numeroParsed,
        bairro: bairro || undefined,
        cidade: cidade || undefined,
        estado: estado || undefined,
        cep: cep || undefined,
        descricao: descricao || undefined,
        horario: horario || undefined,
        lotacao: lotacaoParsed,
        site: site || undefined,
        facebook: facebook || undefined,
        instagram: instagram || undefined,
        whatsapp: whatsapp || undefined,
        cardapioUrl,
        logoUrl,
        bannerUrl,
        aceitaComunicacao,
        aceitaMarketing,
        aceitaProtecaoDados,
      };

      // 3) Faz o cadastro do restaurante
      const restaurante = await cadastrarRestaurante(dadosCadastro);
      
      console.log('Restaurante cadastrado com sucesso:', restaurante);
      alert('Empresa cadastrada com sucesso! Nossa equipe entrará em contato em até 48 horas.');
      
      // 4) Limpa o formulário após sucesso
      setNome('');
      setCnpj('');
      setTelefone('');
      setEmail('');
      setSenha('');
      setRua('');
      setNumero('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');
      setDescricao('');
      setHorario('');
      setLotacao('');
      setSite('');
      setFacebook('');
      setInstagram('');
      setWhatsapp('');
      setCardapio(null);
      setLogo(null);
      setBanner(null);
      setAceitaComunicacao(false);
      setAceitaMarketing(false);
      setAceitaProtecaoDados(false);
      
    } catch (e: any) {
      console.error('Erro no cadastro:', e);
      alert(e?.message || 'Falha ao cadastrar empresa. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-sabore-green/5 to-sabore-brown/5 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-sabore-green mb-4">
            Cadastro de Empresa
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            Preencha os dados abaixo para cadastrar seu estabelecimento no Saborê. 
            Após a aprovação, você poderá gerenciar seu perfil e receber pedidos.
          </p>
        </div>

        {/* Informações sobre Custos */}
        <Alert className="mb-8 border-2 border-dashed border-sabore-brown bg-white">
          <AlertDescription className="text-center">
            <div className="text-sabore-green font-bold text-lg mb-3">
              💰 Informações sobre Custos
            </div>
            <div className="text-sm space-y-1">
              <p><span className="font-bold">Taxa por pedido:</span> R$ 1,00 por pedido aceito.</p>
              <p><span className="font-bold">Pagamento:</span> Mensal, até o dia 10 do mês seguinte.</p>
              <p><span className="font-bold">Sem taxa de adesão</span> ou mensalidade fixa.</p>
              <p><span className="font-bold">Sem comissão</span> sobre o valor dos pedidos.</p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Formulário em Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Coluna 1 - Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sabore-green text-center">
                📋 Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome da empresa</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite uma senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Coluna 2 - Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sabore-green text-center">
                📍 Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => tryAutoFillByCep(e.target.value)}
                />
                {isFetchingCep && <p className="text-sm text-muted-foreground">Buscando CEP...</p>}
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  placeholder="SP"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Santos"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  placeholder="Centro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="rua">Rua</Label>
                <Input
                  id="rua"
                  placeholder="Rua das Flores"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  placeholder="123"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Coluna 3 - Informações do Negócio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sabore-green text-center">
                🏢 Informações do Negócio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva seu estabelecimento..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="horario">Horário de funcionamento</Label>
                <Input
                  id="horario"
                  placeholder="Ex: Seg-Sex: 18h-23h"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lotacao">Lotação</Label>
                <Input
                  id="lotacao"
                  placeholder="Ex: 6 mesas simultâneas"
                  value={lotacao}
                  onChange={(e) => setLotacao(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segunda Linha - Links Sociais e Cardápio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Links Sociais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sabore-green text-center">
                🌐 Links Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site">Site</Label>
                <Input
                  id="site"
                  placeholder="https://www.seusite.com"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/suaempresa"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/suaempresa"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  placeholder="https://wa.me/5511999999999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cardápio e Autorizações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sabore-green text-center">
                📄 Cardápio e Autorizações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Upload do Cardápio */}
              <div>
                <Label>Cardápio (PDF)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePickCardapio}
                    className="hidden"
                    id="cardapio-upload"
                  />
                  <label
                    htmlFor="cardapio-upload"
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-sabore-green rounded-lg cursor-pointer hover:bg-sabore-green/5 transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-2 text-sabore-green" />
                    <span className="text-sabore-green font-medium">
                      {cardapio ? `✓ ${cardapio.name}` : 'Selecionar Cardápio (PDF)'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Upload de Logo */}
              <div>
                <Label>Logo da Empresa (1:1)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePickLogo}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-sabore-green rounded-lg cursor-pointer hover:bg-sabore-green/5 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 mr-2 text-sabore-green" />
                    <span className="text-sabore-green font-medium">
                      {logo ? `✓ Logo selecionado` : 'Selecionar Logo'}
                    </span>
                  </label>
                  {logo && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Prévia:</p>
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-sabore-green">
                        <img 
                          src={URL.createObjectURL(logo)} 
                          alt="Logo preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload de Banner */}
              <div>
                <Label>Banner do Restaurante (3:1)</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePickBanner}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="flex items-center justify-center w-full p-3 border-2 border-dashed border-sabore-green rounded-lg cursor-pointer hover:bg-sabore-green/5 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 mr-2 text-sabore-green" />
                    <span className="text-sabore-green font-medium">
                      {banner ? `✓ Banner selecionado` : 'Selecionar Banner'}
                    </span>
                  </label>
                  {banner && (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Prévia:</p>
                      <div className="w-36 h-12 mx-auto rounded-lg overflow-hidden border-2 border-sabore-green">
                        <img 
                          src={URL.createObjectURL(banner)} 
                          alt="Banner preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Autorizações */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="comunicacao"
                    checked={aceitaComunicacao}
                    onCheckedChange={setAceitaComunicacao}
                  />
                  <Label htmlFor="comunicacao" className="text-sm">
                    Autorizo o uso do e-mail e telefone para comunicação sobre pedidos
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Switch
                    id="marketing"
                    checked={aceitaMarketing}
                    onCheckedChange={setAceitaMarketing}
                  />
                  <Label htmlFor="marketing" className="text-sm">
                    Aceito receber ofertas e novidades por e-mail
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Switch
                    id="protecao"
                    checked={aceitaProtecaoDados}
                    onCheckedChange={setAceitaProtecaoDados}
                  />
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="protecao" className="text-sm">
                      Li e aceito a política de proteção de dados *
                    </Label>
                    <LGPD />
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center italic">
                * Campo obrigatório para prosseguir com o cadastro
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Botão de Registro */}
        <div className="text-center">
          <Button
            onClick={handleRegister}
            disabled={submitting || !aceitaProtecaoDados}
            className={`w-full max-w-md h-12 text-lg ${
              aceitaProtecaoDados 
                ? 'bg-sabore-green hover:bg-sabore-green/90' 
                : 'bg-muted cursor-not-allowed'
            }`}
          >
            {aceitaProtecaoDados 
              ? (submitting ? 'Enviando...' : '📝 Registrar Empresa') 
              : 'Aceite a política de dados para continuar'
            }
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            Após o envio, nossa equipe analisará os dados e entrará em contato em até 48 horas para confirmar o cadastro.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Cadastro;
