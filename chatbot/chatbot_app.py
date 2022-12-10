from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from chatbox import get_response
import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT_DIR)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.get("/chatbot")
def index_get():
    return render_template("base.html")


@app.post("/predict")
def userchat():
    text = request.get_json().get("message")  # check if text is valid
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=4000, debug=True)
