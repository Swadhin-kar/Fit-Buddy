import { useState, useRef, useEffect } from "react";
import api from "../utils/axios";

// A small sub-component for the typing indicator to keep the main code clean
const TypingIndicator = () => (
  <div className="flex gap-1.5 p-3 bg-[rgb(var(--card-depth-1))] rounded-2xl rounded-bl-none w-16 items-center justify-center">
    <div className="w-1.5 h-1.5 bg-[rgb(var(--text-dim))] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-1.5 h-1.5 bg-[rgb(var(--text-dim))] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-1.5 h-1.5 bg-[rgb(var(--text-dim))] rounded-full animate-bounce"></div>
  </div>
);

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Fit-Bee. Let's crush your fitness goals today! Ask me about workouts, nutrition, or recovery.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Smooth scroll to bottom whenever messages change
  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await api.post('/ai/chat', { prompt: currentInput });
      const data = response.data;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message || data },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ I hit a snag. Check your connection and try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 mt-12">
      {/* Main Chat Container */}
      <div className="w-full max-w-2xl bg-[rgb(var(--card-depth-0))] rounded-3xl shadow-2xl border border-[rgb(var(--card-depth-2))] flex flex-col overflow-hidden h-[75vh]">
        
        {/* Premium Header */}
        <div className="p-5 border-b border-[rgb(var(--card-depth-1))] bg-[rgb(var(--card-depth-0))] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--secondary))] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <span className="text-xl font-bold tracking-tighter">FB</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[rgb(var(--card-depth-0))] rounded-full"></span>
            </div>
            <div>
              <h2 className="font-bold text-lg text-[rgb(var(--text-primary))] leading-tight">Fit-Bee AI</h2>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[rgb(var(--secondary))]">Online</span>
              </div>
            </div>
          </div>
          <button className="text-[rgb(var(--text-muted))] hover:text-[rgb(var(--primary))] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Dynamic Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[rgb(var(--card-depth-2))]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base transition-all
                ${
                  msg.role === "user"
                    ? "bg-[rgb(var(--primary))] text-white rounded-tr-none font-medium"
                    : "bg-[rgb(var(--card-depth-1))] text-[rgb(var(--text-primary))] rounded-tl-none border border-[rgb(var(--card-depth-2))]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start animate-in fade-in duration-200">
              <TypingIndicator />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Dock */}
        <div className="p-4 bg-[rgb(var(--card-depth-0))] border-t border-[rgb(var(--card-depth-1))]">
          <div className="relative flex items-center gap-2 bg-[rgb(var(--card-depth-1))] p-2 rounded-2xl border border-transparent focus-within:border-[rgb(var(--primary))] transition-all shadow-inner">
            <input
              type="text"
              placeholder="Message Fit-Bee..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent px-3 py-2 text-[rgb(var(--text-primary))] focus:outline-none placeholder:text-[rgb(var(--text-dim))]"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className={`p-3 rounded-xl transition-all flex items-center justify-center
                ${loading || !input.trim() 
                  ? "bg-[rgb(var(--card-depth-2))] text-[rgb(var(--text-dim))]" 
                  : "bg-[rgb(var(--primary))] text-white hover:scale-105 active:scale-95 shadow-md shadow-blue-500/30"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-center mt-3 text-[rgb(var(--text-dim))] font-medium uppercase tracking-tighter">
            AI can make mistakes. Verify important health data.
          </p>
        </div>
      </div>
    </div>
  );
}