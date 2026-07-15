export default function SuggestedQuestions({
  onSelect,
}) {
  const questions = [
    "Summarize this document",

    "What PPE is required?",

    "List all equipment",

    "What are the maintenance intervals?",

    "What safety risks are mentioned?",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {questions.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="px-4 py-2 bg-white border rounded-full hover:bg-blue-50 text-sm"
        >
          {question}
        </button>
      ))}
    </div>
  );
}