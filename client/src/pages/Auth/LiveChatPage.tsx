import { useState, useRef } from "react";

export default function LiveChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Welcome! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate a bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for your message! We'll get back to you shortly." },
      ]);
    }, 1000);

    setInput("");
  };

  // Scroll to latest message
  // useEffect(() => {
  //  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //}, [messages]);

  return (
    <main className="main flex flex-col">
      {/* Page Title */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Live Chat</h1>
        <nav className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          <ol className="flex space-x-2">
            <li><a href="/" className="text-blue-600 hover:underline">Home</a></li>
            <li>/</li>
            <li>Support</li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Live Chat</li>
          </ol>
        </nav>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-300 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
