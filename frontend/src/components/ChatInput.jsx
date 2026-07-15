import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >
      <input
        className="flex-1 border rounded-lg px-4 py-3"
        placeholder="Ask about your documents..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
    </form>
  );
}