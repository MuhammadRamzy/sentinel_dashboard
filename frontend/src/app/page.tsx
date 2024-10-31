'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import ScraperForm from "@/app/components/ScraperForm"
import SentimentForm from "@/app/components/SentimentForm"
import DisplayResults from "@/app/components/DisplayResults"

interface ScrapedData {
  source: string
  content: string
  error?: string
}


interface SentimentData {
  polarity: number
  subjectivity: number
  overall_sentiment: string
}

export default function Home() {
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([])
  const [sentiment, setSentiment] = useState<SentimentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleScrape = async (sources: string[]) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch("http://localhost:5000/api/scraper/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sources }),
      })
      const data = await response.json()
      setScrapedData(data)
      setSuccess("URLs scraped successfully!")
    } catch (error) {
      console.error("Error scraping data:", error)
      setError("Failed to scrape URLs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async (text: string) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch("http://localhost:5000/api/sentiment/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
      const data = await response.json()
      setSentiment(data)
      setSuccess("Sentiment analysis completed!")
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      setError("Failed to analyze sentiment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Real-Time Sentiment Dashboard</h1>
      
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

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mb-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <DisplayResults scrapedData={scrapedData} sentiment={sentiment} />
    </div>
  )
}