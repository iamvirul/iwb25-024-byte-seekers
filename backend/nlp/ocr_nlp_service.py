from flask import Flask, request, jsonify
import cv2
import numpy as np
import pytesseract
import re
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Optional: Tesseract path (needed for Windows)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

DB_CONFIG = {
    'host': os.getenv("DB_HOST"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASS"),
    'database': os.getenv("DB_NAME")
}

def extract_sinhala_and_english_text(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.medianBlur(gray, 3)
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    custom_config = r'--oem 3 --psm 6 -l sin+eng'
    text = pytesseract.image_to_string(thresh, config=custom_config)
    return text

def extract_fields(text):
    nic = name  = None

    nic_patterns = [
        r'\b(?:NIC|No|අංකය)[: ]*([\dVXvx]{10,12})',
        r'\b([\d]{9}[VXvx]|[\d]{12})\b'
    ]

    name_patterns = [
        r'නම[: ]*([^\n]+)',                       # Sinhala full name
        r'Name[: ]*([A-Z\s]+(?:WICKRAMASINGHE)?)'  # English full name
    ]

    def match_any(patterns):
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1).strip()
        return None

    nic = match_any(nic_patterns)
    name = match_any(name_patterns)

    if name:
        name = re.sub(r'[^\u0D80-\u0DFFA-Z\s]', '', name)  # Sinhala and English
        name = re.sub(r'\s+', ' ', name).strip()


    return {
        'nic': nic,
        'name': name,
        'raw_text': text
    }

def verify_in_db(nic, name):
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE nic = %s", (nic,))
        nic_result = cursor.fetchone()

        cursor.execute("SELECT * FROM users WHERE name LIKE %s", (f"%{name}%",))
        name_result = cursor.fetchone()

        cursor.close()
        conn.close()

        return {
            'nic_found': nic_result is not None,
            'name_found': name_result is not None,
            'nic_match': nic_result,
            'name_match': name_result
        }

    except mysql.connector.Error as err:
        return {'error': str(err)}

@app.route("/process", methods=["POST"])
def process():
    if "file" not in request.files:
        return jsonify(error="No image found"), 400

    file = request.files["file"]
    try:
        img_bytes = file.read()
        arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify(error="Invalid image"), 400

        text = extract_sinhala_and_english_text(img)
        extracted = extract_fields(text)

        if not extracted['nic'] and not extracted['name']:
            return jsonify(error="Could not extract NIC or Name"), 400

        verification = verify_in_db(extracted['nic'], extracted['name'])

        if 'error' in verification:
            return jsonify(error=verification['error']), 500

        response = {
            'extracted': extracted,
            'verification': verification,
            'valid': verification['nic_found'] and verification['name_found']
        }

        if not response['valid']:
            response['error'] = "Information does not match records"

        return jsonify(response)

    except pytesseract.TesseractNotFoundError:
        return jsonify(error="Tesseract OCR is not installed"), 500
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
