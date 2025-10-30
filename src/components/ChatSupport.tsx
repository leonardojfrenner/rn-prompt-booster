import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { perguntarChatbot } from "@/api/chat";

interface Message {
  id: string;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Bem-vindo ao suporte do Saborê. Como posso ajudá-lo hoje?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    setIsLoading(true);
    try {
      const resposta = await perguntarChatbot(newMessage.text);
      const supportResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: resposta || "",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: "Desculpe, ocorreu um erro ao falar com o suporte. Tente novamente em instantes.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }

    // Resetar altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-hero rounded-full shadow-hero flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 hover:shadow-lg group"
        aria-label="Abrir chat de suporte"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform" />
        ) : (
          <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-sabore-yellow rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-[90vw] sm:w-96 max-h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-hero border border-border/50 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ 
          height: 'min(600px, calc(100vh - 10rem))',
          top: 'auto'
        }}
      >
        {/* Chat Header */}
        <div className="bg-gradient-hero text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Suporte Saborê</h3>
              <p className="text-xs text-white/80">
                Geralmente respondemos em alguns minutos
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fechar chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "support" && (
                <div className="w-8 h-8 bg-sabore-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  message.sender === "user"
                    ? "bg-gradient-hero text-white rounded-br-sm"
                    : "bg-white text-foreground border border-border rounded-bl-sm shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
                <span
                  className={`text-xs mt-1 block ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 bg-sabore-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-white rounded-b-2xl">
          <div className="flex gap-2 items-end">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                // Auto-resize textarea
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="min-h-[44px] max-h-[120px] resize-none bg-slate-50 border-border focus:border-sabore-green focus:ring-sabore-green"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-hero hover:opacity-90 text-white px-4 h-[44px] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {isLoading && (
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-sabore-green animate-pulse" />
              <span>Suporte está digitando...</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Digite Enter para enviar, Shift+Enter para nova linha
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatSupport;

