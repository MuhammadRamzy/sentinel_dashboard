"use client";

import { useState } from "react";
import ScraperForm from "./components/ScraperForm";
import SentimentForm from "./components/SentimentForm";
import DisplayResults from "./components/DisplayResults";

export default function Home() {
  const [scrapedData, setScrapedData] = useState([]);
  const [sentiment, setSentiment] = useState(null);

  const handleScrape = async (sources: string[]) => {
    try {
      const response = await fetch("http://localhost:5000/api/scraper/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sources }),
      });
      const data = await response.json();
      setScrapedData(data);
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  };

  const handleAnalyze = async (text: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/sentiment/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSentiment(data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Real-Time Sentiment Dashboard</h1>
      <ScraperForm onScrape={handleScrape} />
      <SentimentForm onAnalyze={handleAnalyze} />
      <DisplayResults scrapedData={scrapedData} sentiment={sentiment} />
    </div>
  );
}
