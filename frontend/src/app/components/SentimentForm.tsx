import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SentimentFormProps {
  onAnalyze: (text: string) => void
  loading: boolean
}

const SentimentForm: React.FC<SentimentFormProps> = ({ onAnalyze, loading }) => {
  const [text, setText] = useState<string>("")

  return (
    <>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Enter text for sentiment analysis.</CardDescription>
      </CardHeader>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis..."
        className="mb-4"
      />
      <Button onClick={() => onAnalyze(text)} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Analyze Sentiment'}
      </Button>
    </>
  )
}

export default SentimentForm