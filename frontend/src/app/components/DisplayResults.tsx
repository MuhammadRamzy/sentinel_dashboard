import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

interface DisplayResultsProps {
  scrapedData: ScrapedData[]
  sentiment: SentimentData | null
}

const DisplayResults: React.FC<DisplayResultsProps> = ({ scrapedData, sentiment }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-500'
      case 'Negative':
        return 'text-red-500'
      default:
        return 'text-yellow-500'
    }
  }

  return (
    <>
      {scrapedData.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scraped Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {scrapedData.map((data, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{data.source}</AccordionTrigger>
                  <AccordionContent>
                    {data.error ? (
                      <p className="text-red-500">Error: {data.error}</p>
                    ) : (
                      <p>{data.content}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {sentiment && (
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Polarity</p>
                <Progress value={(sentiment.polarity + 1) * 50} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">{sentiment.polarity.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Subjectivity</p>
                <Progress value={sentiment.subjectivity * 100} className="w-full" />
                <p className="text-sm text-muted-foreground mt-1">{sentiment.subjectivity.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-semibold">Overall Sentiment</p>
                <p className={`text-2xl font-bold ${getSentimentColor(sentiment.overall_sentiment)}`}>
                  {sentiment.overall_sentiment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default DisplayResults