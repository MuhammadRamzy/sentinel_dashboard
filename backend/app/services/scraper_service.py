import requests
from bs4 import BeautifulSoup

def scrape_sources(sources):
    results = []

    for source in sources:
        try:
            response = requests.get(source)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')
            text = ' '.join([p.text for p in soup.find_all('p')])  # Extract all paragraphs as text
            results.append({"source": source, "content": text})

        except requests.exceptions.RequestException as e:
            results.append({"source": source, "error": str(e)})

    return results
