from flask import Flask, request, jsonify, render_template
from models.hate_speech.predict import load_model as load_hate_model, predict as predict_hate
from models.toxicity.predict import load_model as load_toxicity_model, predict as predict_toxicity
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

hate_model_tokenizer = load_hate_model()
toxicity_model_tokenizer = load_toxicity_model()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/moderate', methods=['POST'])
def moderate():
    text = request.form.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    hate_result = predict_hate(hate_model_tokenizer, text)
    toxicity_result = predict_toxicity(toxicity_model_tokenizer, text)

    results = {
        "hate_speech": hate_result,
        "toxicity": toxicity_result
    }

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
