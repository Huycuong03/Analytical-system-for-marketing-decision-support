from flask import Flask
from flask_cors import CORS
import json
from modules.routes import api_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)

with open('config.json', 'r') as file:
    app.config.update(json.load(file))

app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(port=app.config["port"], debug=True)