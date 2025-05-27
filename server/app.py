from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb
import pandas as pd
import numpy as np
import difflib

app = Flask(__name__)
CORS(app)

# Load model and stats
model = xgb.XGBClassifier()
model.load_model('xgb_model.json')
stats_df = pd.read_csv("master2025.csv", index_col=0)

# Prediction function from notebook
def predict_match(team1, team2, model, stats_df):
    def normalize(name):
        if not isinstance(name, str):
            return ""
        base = name.split("(")[0]
        return (
            base.strip()
                .lower()
                .replace(".", "")
                .replace(",", "")
                .replace("  ", " ")
        )
    n1, n2 = normalize(team1), normalize(team2)

    numeric_cols = [c for c in stats_df.select_dtypes("number").columns if c != "Year"]

    def get_stats(norm_name, orig_name):
        if norm_name in stats_df.index:
            return stats_df.loc[norm_name, numeric_cols]
        print(f"No stats found for “{orig_name}”. Using average stats instead.")
        choices = stats_df.index.tolist()
        sugg = difflib.get_close_matches(norm_name, choices, n=3, cutoff=0.5)
        if sugg:
            print("   Did you mean:", ", ".join(sugg))
        return stats_df[numeric_cols].mean()

    a = get_stats(n1, team1)
    b = get_stats(n2, team2)

    row = []
    for c in numeric_cols:
        row.extend([a[c], b[c], a[c] - b[c]])
    X_match = np.array(row).reshape(1, -1)

    proba = model.predict_proba(X_match)[0, 1]
    if proba >= 0.5:
        return team1, proba
    else:
        return team2, 1 - proba

# Flask route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    team1 = data.get("team1", "")
    team2 = data.get("team2", "")

    try:
        winner, confidence = predict_match(team1, team2, model, stats_df)
        return jsonify({
            "team1": team1,
            "team2": team2,
            "predicted_winner": winner,
            "confidence": float(confidence)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)