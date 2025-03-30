# models/hate_speech/predict.py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

def load_model():
    tokenizer = AutoTokenizer.from_pretrained("facebook/roberta-hate-speech-dynabench-r4-target")
    model = AutoModelForSequenceClassification.from_pretrained("facebook/roberta-hate-speech-dynabench-r4-target")
    return model, tokenizer

def predict(model_tokenizer, text):
    try:
        model, tokenizer = model_tokenizer
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1)
            prediction = torch.argmax(probs, dim=1).item()
            score = probs[0, prediction].item()

        if prediction == 1: # Assuming 1 is hate speech, verify with model documentation
            if score > 0.8:  # Adjust threshold as needed
                return {"label": "HATE", "score": score, "status": "blocked"}
            elif score > 0.5: # Adjust threshold as needed
                return {"label": "HATE", "score": score, "status": "flagged"}
            else:
                return {"label": "SAFE", "score": score, "status": "safe"}
        else:
            return {"label": "SAFE", "score": score, "status": "safe"}

    except Exception as e:
        print(f"Error in hate speech prediction: {e}")
        return {"label": "ERROR", "score": 0.0, "status": "error"}
