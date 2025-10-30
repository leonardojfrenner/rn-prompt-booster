export async function perguntarChatbot(pergunta: string): Promise<string> {
  try {
    // Em dev, o Vite proxy redireciona "/ask" para http://localhost:8002/ask
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pergunta }),
    });

    if (!response.ok) {
      throw new Error(`Falha na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data?.resposta ?? '';
  } catch (error) {
    console.error('Erro ao perguntar ao chatbot:', error);
    throw error;
  }
}


