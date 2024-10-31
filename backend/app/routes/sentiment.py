from flask import Blueprint, jsonify, request
from app.services.sentiment_service import analyze_sentiment

bp = Blueprint('sentiment', __name__, url_prefix='/api/sentiment')

@bp.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get("text", "")
    sentiment = analyze_sentiment(text)
    return jsonify(sentiment), 200
