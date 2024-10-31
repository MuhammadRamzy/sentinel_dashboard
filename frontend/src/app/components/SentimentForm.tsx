import { useState } from "react";

interface SentimentFormProps {
  onAnalyze: (text: string) => void;
}

const SentimentForm: React.FC<SentimentFormProps> = ({ onAnalyze }) => {
  const [text, setText] = useState<string>("");

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Sentiment Analysis</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={() => onAnalyze(text)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Analyze Sentiment
      </button>
    </div>
  );
};

export default SentimentForm;
