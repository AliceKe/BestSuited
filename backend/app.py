import json
import os
from flask import Flask
from flask_cors import CORS
from api import bp

from settings import settings

app = Flask(__name__)
CORS(app)

app.register_blueprint(bp)

# with open(settings.data_file_path, "r") as file:
#     data = json.load(file)

# job_postings = data.get("job_postings")


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
