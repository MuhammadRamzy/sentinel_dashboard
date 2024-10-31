from flask import Flask
from flask_cors import CORS
from config import get_config
from app.routes import scraper, sentiment

def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())

    CORS(app)  # Enable Cross-Origin Resource Sharing

    # Register blueprints
    app.register_blueprint(scraper.bp)
    app.register_blueprint(sentiment.bp)

    return app
