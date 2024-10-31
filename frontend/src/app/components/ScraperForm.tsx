import { useState } from "react";

interface ScraperFormProps {
  onScrape: (sources: string[]) => void;
}

const ScraperForm: React.FC<ScraperFormProps> = ({ onScrape }) => {
  const [sources, setSources] = useState<string>("");

  const handleScrape = () => {
    const urls = sources.split("\n").map(url => url.trim()).filter(url => url);
    onScrape(urls);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">URL Scraper</h2>
      <textarea
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        placeholder="Enter URLs, one per line..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleScrape}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Scrape URLs
      </button>
    </div>
  );
};

export default ScraperForm;
