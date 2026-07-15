import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  const copyMessage = () => {
    navigator.clipboard.writeText(message.message);
    toast.success("Copied to clipboard");
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-3xl rounded-xl p-4 shadow ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white border"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">
            {isUser ? "You" : "PlantMind AI"}
          </h4>

          {!isUser && (
            <button
              onClick={copyMessage}
              className="text-gray-500 hover:text-blue-600"
            >
              <Copy size={18} />
            </button>
          )}
        </div>

        {/* Message */}
        <div
          className={`prose max-w-none ${
            isUser ? "prose-invert" : ""
          }`}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.message}
          </ReactMarkdown>
        </div>

        {/* Confidence */}
        {!isUser && message.confidence && (
          <div className="mt-4">
            <span className="text-sm font-semibold">
              Confidence:
            </span>

            <span className="ml-2 text-green-600 font-bold">
              {message.confidence}%
            </span>
          </div>
        )}

        {/* Sources */}
        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">
                Sources
              </p>

              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    📄 {source.filename}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Timestamp */}
        {message.timestamp && (
          <p className="text-xs text-gray-400 mt-4">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}