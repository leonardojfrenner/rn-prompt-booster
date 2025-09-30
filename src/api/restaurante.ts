// Camada de comunicação com o backend para Restaurante

export interface RestauranteLoginRequest {
    email: string;
    senha: string;
  }
  
  export interface RestauranteCreate {
    nome: string;
    cnpj: string;
    telefone?: string;
    email: string;
    senha: string;
    rua?: string;
    numero?: number; // backend usa Integer
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    descricao?: string;
    horario?: string;
    lotacao?: number; // backend usa Integer
    site?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    cardapioUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;
    aceitaComunicacao?: boolean;
    aceitaMarketing?: boolean;
    aceitaProtecaoDados?: boolean;
  }
  
  export interface RestauranteResponse {
    id: number;
    nome: string;
    cnpj: string;
    telefone?: string;
    email: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
    descricao?: string;
    horario?: string;
    lotacao?: number;
    site?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    cardapioUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;
    aceitaComunicacao?: boolean;
    aceitaMarketing?: boolean;
    aceitaProtecaoDados?: boolean;
  }
  
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
  
  export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
  
  async function request<T>(path: string, options?: { method?: HttpMethod; body?: unknown }): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options?.method ?? 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include',
    });
  
    console.log('Resposta da API:', {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type')
    });
  
    if (!response.ok) {
      let message = `Erro ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data && typeof data.message === 'string') {
            message = data.message;
          }
        } else {
          // Se não for JSON, pode ser HTML de erro
          const text = await response.text();
          console.error('Resposta não-JSON recebida:', text.substring(0, 200));
          message = `Endpoint retornou HTML (${response.status}). Verifique se a API está configurada corretamente.`;
        }
      } catch (e) {
        console.error('Erro ao processar resposta:', e);
        message = `Erro ${response.status}: ${response.statusText}`;
      }
      throw new Error(message);
    }
  
    if (response.status === 204) {
      return undefined as unknown as T;
    }
  
    // Verifica se a resposta é JSON antes de tentar fazer parse
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Resposta não-JSON recebida:', text.substring(0, 200));
      throw new Error('API retornou resposta não-JSON. Verifique se o endpoint está correto.');
    }
  
    return (await response.json()) as T;
  }
  
  export interface UploadAsset {
    uri: string;
    name?: string;
    mimeType?: string; // opcional
  }
  
  // Upload de arquivo do restaurante. Retorna a URL do arquivo salvo
  export async function uploadRestauranteArquivo(tipo: 'logo' | 'banner' | 'cardapio', file: File): Promise<string> {
    const filename = file.name || `arquivo-${tipo}-${Date.now()}`;
    const form = new FormData();
    form.append('file', file, filename);
    
    // Baseado no controller, vamos usar os endpoints corretos
    const endpoints = [
      `/restaurantes/upload/${tipo}`, // Endpoint com tipo na URL
      `/restaurantes/upload`          // Endpoint com tipo como RequestParam
    ];
  
    let lastErr: any = null;
    
    // Primeiro tenta com tipo na URL
    try {
      const uploadRes = await fetch(`${API_BASE_URL}${endpoints[0]}`, {
        method: 'POST',
        body: form as any,
        credentials: 'include',
      });
      
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        const url: string | undefined = data.url;
        if (!url) throw new Error('Resposta de upload sem URL');
        return url;
      }
      lastErr = new Error(`Falha no upload com tipo na URL (${uploadRes.status})`);
    } catch (e) {
      lastErr = e;
    }
  
    // Se falhar, tenta com tipo como RequestParam
    try {
      const formWithTipo = new FormData();
      formWithTipo.append('file', file, filename);
      formWithTipo.append('tipo', tipo); // Adiciona tipo como RequestParam
      
      const uploadRes = await fetch(`${API_BASE_URL}${endpoints[1]}`, {
        method: 'POST',
        body: formWithTipo as any,
        credentials: 'include',
      });
      
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        const url: string | undefined = data.url;
        if (!url) throw new Error('Resposta de upload sem URL');
        return url;
      }
      lastErr = new Error(`Falha no upload com RequestParam (${uploadRes.status})`);
    } catch (e) {
      lastErr = e;
    }
  
    throw (lastErr || new Error('Falha ao fazer upload'));
  }
  
  // Login custom do controller de restaurantes
  export async function loginRestaurante(payload: RestauranteLoginRequest): Promise<RestauranteResponse> {
    return request('/restaurantes/login', { method: 'POST', body: payload });
  }
  
  export async function cadastrarRestaurante(payload: RestauranteCreate): Promise<RestauranteResponse> {
    return request('/restaurantes', { method: 'POST', body: payload });
  }
  
  export async function listarRestaurantes(): Promise<RestauranteResponse[]> {
    return request('/restaurantes');
  }
  
  export async function buscarRestaurante(id: number): Promise<RestauranteResponse> {
    return request(`/restaurantes/${id}`);
  }
  
  export async function atualizarRestaurante(id: number, payload: Partial<RestauranteCreate>): Promise<RestauranteResponse> {
    return request(`/restaurantes/${id}`, { method: 'PUT', body: payload });
  }
  
  export async function deletarRestaurante(id: number): Promise<void> {
    await request<void>(`/restaurantes/${id}`, { method: 'DELETE' });
  }
  
  // Interface para resposta da busca de CEP
  export interface EnderecoResponse {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  }
  
  // Busca endereço por CEP (reutilizando lógica do cliente)
  export async function buscarEnderecoPorCep(cep: string): Promise<EnderecoResponse> {
    const sanitized = (cep || '').replace(/\D/g, '');
    if (sanitized.length !== 8) {
      throw new Error('O CEP deve conter 8 dígitos.');
    }

    console.log('🔍 Buscando CEP:', sanitized);

    // Tenta backend em caminhos comuns
    const backendPaths = [
      `/restaurantes/cep/${sanitized}`,    // Endpoint no controller de restaurantes
      `/viacep/${sanitized}`,             // Endpoint ViaCEP no backend
      `/enderecos/cep/${sanitized}`,      // Endpoint alternativo
      `/cep/${sanitized}`,                // Endpoint direto
      `/clientes/endereco/${sanitized}`   // Endpoint original
    ];

    for (const path of backendPaths) {
      try {
        console.log(`📡 Tentando endpoint backend: ${path}`);
        const data = await request<any>(path);
        console.log('📊 Resposta do backend:', data);
        
        // Normaliza possíveis formatos do backend
        const normalized: EnderecoResponse = {
          rua: data.rua ?? data.logradouro ?? '',
          bairro: data.bairro ?? '',
          cidade: data.cidade ?? data.localidade ?? '',
          estado: data.estado ?? data.uf ?? '',
        };
        
        // Verifica se temos dados válidos
        if (normalized.cidade || normalized.rua || normalized.estado || normalized.bairro) {
          console.log('✅ CEP encontrado via backend:', normalized);
          return normalized;
        }
      } catch (error: any) {
        console.warn(`⚠️ Falha no endpoint ${path}:`, error.message);
        continue;
      }
    }

    // Fallback: ViaCEP público
    console.log('🌐 Tentando ViaCEP público...');
    try {
      const viaCepUrl = `https://viacep.com.br/ws/${sanitized}/json/`;
      const res = await fetch(viaCepUrl);
      
      if (!res.ok) {
        throw new Error('Falha ao consultar ViaCEP.');
      }
      
      const data = await res.json();
      console.log('📊 Resposta do ViaCEP:', data);
      
      if (data.erro) {
        throw new Error('CEP não encontrado.');
      }
      
      const result: EnderecoResponse = {
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
      };
      
      console.log('✅ CEP encontrado via ViaCEP:', result);
      return result;
      
    } catch (error: any) {
      console.error('❌ Falha no ViaCEP:', error.message);
      throw new Error('CEP não encontrado. Verifique o número digitado.');
    }
  }
