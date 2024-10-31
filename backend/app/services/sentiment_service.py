from textblob import TextBlob

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment = {
        "polarity": blob.sentiment.polarity,
        "subjectivity": blob.sentiment.subjectivity,
        "overall_sentiment": "positive" if blob.sentiment.polarity > 0 else "negative" if blob.sentiment.polarity < 0 else "neutral"
    }
    return sentiment
