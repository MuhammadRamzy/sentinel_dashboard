import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ScraperFormProps {
  onScrape: (sources: string[]) => void
  loading: boolean
}

const ScraperForm: React.FC<ScraperFormProps> = ({ onScrape, loading }) => {
  const [sources, setSources] = useState<string>("")

  const handleScrape = () => {
    const urls = sources.split("\n").map(url => url.trim()).filter(url => url)
    onScrape(urls)
  }

  return (
    <>
      <CardHeader>
        <CardTitle>URL Scraper</CardTitle>
        <CardDescription>Enter URLs to scrape, one per line.</CardDescription>
      </CardHeader>
      <Textarea
        value={sources}
        onChange={(e) => setSources(e.target.value)}
        placeholder={`https://example.com
https://another-example.com`}
        className="mb-4"
      />
      <Button onClick={handleScrape} disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Scrape URLs"
        )}
      </Button>
    </>
  );
}

export default ScraperForm