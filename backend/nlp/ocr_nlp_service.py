from flask import Flask, request, jsonify
import cv2
import numpy as np
import pytesseract
from sinling import SinhalaTokenizer, SinhalaStemmer
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
import os

app = Flask(__name__)

tokenizer = SinhalaTokenizer()
stemmer = SinhalaStemmer()

DB_CONFIG = {
    'host': os.getenv("DB_HOST"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASS"),
    'database': os.getenv("DB_NAME")
}


@app.route("/process", methods=["POST"])
def process():
    if "file" not in request.files:
        return jsonify(error="No image found"), 400

    file = request.files["file"]
    img_bytes = file.read()
    arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify(error="Invalid image"), 400

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    text = pytesseract.image_to_string(thresh, lang="sin")
    tokens = tokenizer.tokenize(text)
    stems = [stemmer.stem(token) for token in tokens]

    matched = []
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        for word in stems:
            cursor.execute("SELECT field FROM users WHERE value = %s", (word,))
            result = cursor.fetchone()
            if result:
                matched.append({"word": word, "field": result[0]})

        cursor.close()
        conn.close()

    except mysql.connector.Error as err:
        return jsonify(error=str(err)), 500

    return jsonify({"raw_text": text, "tokens": tokens, "stems": stems, "matched": matched, "trust": bool(matched)})


if __name__ == "__main__":
    app.run(port=5001)
