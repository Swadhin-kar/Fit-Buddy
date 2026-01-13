import { useState, useRef, useEffect } from "react";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Fit-Bee. Ask me about workouts, calories or fitness tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message || data },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-2">
      <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h2 className="font-semibold text-lg">Fit-Bee</h2>
            <p className="text-xs text-gray-500">Your fitness assistant</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed
                ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-base-300 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-400 animate-pulse">
              Fit Buddy AI is typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            placeholder="Ask about workouts, diet, BMI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="input input-bordered w-full"
          />
          <button
            onClick={sendMessage}
            className="btn btn-primary"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
