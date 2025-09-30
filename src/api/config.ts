// Configuração da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  TIMEOUT: 10000, // 10 segundos
  ENDPOINTS: {
    RESTAURANTES: '/restaurantes',
    UPLOAD: '/restaurantes/upload',
    LOGIN: '/restaurantes/login',
  }
};

// Função para fazer requisições HTTP
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  // Verifica se houve redirecionamento para login (problema de autenticação)
  if (response.redirected && response.url.includes('/login')) {
    throw new Error('API de CEP requer autenticação. Backend pode estar configurado incorretamente.');
  }

  if (!response.ok) {
    let message = `Erro ${response.status}`;
    try {
      const data = await response.json();
      if (data && typeof data.message === 'string') {
        message = data.message;
      }
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return (await response.json()) as T;
}

// Função para upload de arquivos
export async function uploadFile(
  tipo: 'logo' | 'banner' | 'cardapio', 
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  // Usa o endpoint com tipo na URL conforme o controller do backend
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPLOAD}/${tipo}`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    let message = `Erro no upload: ${response.status}`;
    try {
      const data = await response.json();
      if (data && typeof data.message === 'string') {
        message = data.message;
      }
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(message);
  }

  const data = await response.json();
  if (!data.url) {
    throw new Error('Resposta de upload sem URL');
  }

  return data.url;
}
