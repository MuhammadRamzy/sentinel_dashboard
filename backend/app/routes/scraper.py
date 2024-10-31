from flask import Blueprint, jsonify, request
from app.services.scraper_service import scrape_sources

bp = Blueprint('scraper', __name__, url_prefix='/api/scraper')

@bp.route('/scrape', methods=['POST'])
def scrape():
    sources = request.json.get("sources", [])
    data = scrape_sources(sources)
    return jsonify(data), 200
