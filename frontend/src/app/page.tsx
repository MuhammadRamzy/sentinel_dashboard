"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import ScraperForm from "@/app/components/ScraperForm";
import SentimentForm from "@/app/components/SentimentForm";
import DisplayResults from "@/app/components/DisplayResults";

interface ScrapedData {
  source: string;
  content: string;
  error?: string;
}

interface SentimentData {
  polarity: number;
  subjectivity: number;
  overall_sentiment: string;
}

export default function Home() {
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleScrape = async (sources: string[]) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
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
      setSuccess("URLs scraped successfully!");
    } catch (error) {
      console.error("Error scraping data:", error);
      setError("Failed to scrape URLs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/sentiment/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const data = await response.json();
      setSentiment(data);
      setSuccess("Sentiment analysis completed!");
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setError("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl bg-white p-8">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Real-Time Sentiment Dashboard
        </h1>

        {/* Tabs */}
        <Tabs defaultValue="scraper" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scraper">URL Scraper</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="scraper">
            <Card>
              <CardContent>
                <ScraperForm onScrape={handleScrape} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sentiment">
            <Card>
              <CardContent>
                <SentimentForm onAnalyze={handleAnalyze} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alerts */}
        {(error || success) && (
          <div className="mb-6">
            {error && (
              <Alert
                variant="destructive"
                className="flex items-start space-x-2"
              >
                <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <AlertTitle className="text-sm font-semibold">
                    Error
                  </AlertTitle>
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </div>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <AlertTitle className="text-sm font-semibold">
                    Success
                  </AlertTitle>
                  <AlertDescription className="text-sm">
                    {success}
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        )}

        {/* Results */}
        <DisplayResults scrapedData={scrapedData} sentiment={sentiment} />
      </div>
    </div>
  );
}
