interface DisplayResultsProps {
    scrapedData: Array<{ source: string; content: string; error?: string }>;
    sentiment: { polarity: number; subjectivity: number; overall_sentiment: string } | null;
  }
  
  const DisplayResults: React.FC<DisplayResultsProps> = ({ scrapedData, sentiment }) => (
    <div>
      {scrapedData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Scraped Data</h2>
          {scrapedData.map((data, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <h3 className="font-bold">{data.source}</h3>
              <p>{data.error ? `Error: ${data.error}` : data.content}</p>
            </div>
          ))}
        </div>
      )}
      
      {sentiment && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Sentiment Analysis</h2>
          <p>Polarity: {sentiment.polarity}</p>
          <p>Subjectivity: {sentiment.subjectivity}</p>
          <p>Overall Sentiment: {sentiment.overall_sentiment}</p>
        </div>
      )}
    </div>
  );
  
  export default DisplayResults;
  