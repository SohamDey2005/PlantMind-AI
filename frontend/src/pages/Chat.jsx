import { useEffect, useRef, useState } from "react";
import axios from "axios";

import ChatMessage from "../components/ChatMessage";
import SuggestedQuestions from "../components/SuggestedQuestions";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      message:
        "👋 Hello! I'm PlantMind AI.\n\nUpload industrial documents and ask me anything about them.",
      timestamp: new Date(),
    },
  ]);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ----------------------------
  // Auto Scroll
  // ----------------------------

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ----------------------------
  // Send Question
  // ----------------------------

  const sendQuestion = async (text = question) => {
    if (!text.trim()) return;

    const userMessage = {
      role: "user",
      message: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/chat/",
        {
          question: text,
        }
      );

      const aiMessage = {
        role: "assistant",
        message: response.data.answer,
        sources: response.data.sources,
        confidence: response.data.confidence,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "❌ Unable to connect to PlantMind AI.",
          timestamp: new Date(),
        },
      ]);
    }

    setLoading(false);
  };

  // ----------------------------
  // Enter Key
  // ----------------------------

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendQuestion();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}

      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold">
          PlantMind AI Copilot
        </h1>

        <p className="text-gray-500">
          Ask questions about your uploaded
          industrial documents.
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
          />
        ))}

        {loading && (
          <div className="mb-4">
            <div className="inline-block bg-white rounded-xl p-4 shadow">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>

                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-100"></div>

                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Suggested Questions */}

      <div className="px-6">
        <SuggestedQuestions
          onSelect={(q) => sendQuestion(q)}
        />
      </div>

      {/* Input */}

      <div className="bg-white border-t p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            placeholder="Ask PlantMind AI..."
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            onClick={() => sendQuestion()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}