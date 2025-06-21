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

DB_CONFIG = {
    'host': os.getenv("DB_HOST"),
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASS"),
    'database': os.getenv("DB_NAME")
}


def extract_sinhala_and_english_text(image):
    """Extract text from an image with both Sinhala and English."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.medianBlur(gray, 3)
    thresh = cv2.threshold(blur, 0, 255,
                           cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    custom_config = r'--oem 3 --psm 6 -l sin+eng'
    text = pytesseract.image_to_string(thresh, config=custom_config)
    return text


def preprocess_for_handwritten(image):
    """Preprocessing for handwritten, low-contrast back side."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    adaptive = cv2.adaptiveThreshold(blurred, 255,
                                     cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                     cv2.THRESH_BINARY, 11, 2)
    kernel = np.ones((1, 1), np.uint8)
    processed = cv2.morphologyEx(adaptive, cv2.MORPH_CLOSE, kernel)
    return processed


def extract_sinhala_handwritten(image):
    """Extract text from handwritten side with specialized config."""
    processed = preprocess_for_handwritten(image)
    custom_config = r'--oem 1 --psm 6 -l sin'
    text = pytesseract.image_to_string(processed, config=custom_config)
    return text


def extract_fields(text):
    """Extract NIC and both Sinhala and English names from text."""
    nic = None
    sin_name = None
    eng_name = None

    # NIC patterns (numbers + V/X for old NICs, 12 digits for new NICs)
    nic_patterns = [
        r'\b(?:NIC|No|අංකය)[: ]*([\dVXvx]{10,12})',
        r'\b([\d]{9}[VXvx]|[\d]{12})\b'
    ]

    # Improved Sinhala name pattern
    sin_name_patterns = [
        r'(?:නම|Name)[: ]*([^\n]+?)(?:\n|Name|$)',
        r'(?:නම|Name)[: ]*([^\n]+?)(?:\n|$)',
        r'([\u0D80-\u0DFF\s]+)(?:\n|Name|$)'
    ]

    # Improved English name pattern
    eng_name_patterns = [
        r'Name[: ]*([A-Za-z\s]+?)(?:\n|$)',
        r'Name[: ]*([A-Z][A-Za-z\s]+?)(?:\n|$)',
        r'([A-Z][A-Za-z\s]+)(?:\n|$)'
    ]

    for pattern in nic_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            nic = match.group(1).strip().upper()
            break

    # Try to find Sinhala name
    for pattern in sin_name_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            sin_name = match.group(1).strip()
            # Clean but preserve Sinhala characters and spaces
            sin_name = re.sub(r'[^\u0D80-\u0DFF\s\.\-]', '', sin_name)
            sin_name = re.sub(r'\s+', ' ', sin_name).strip()
            if len(sin_name) > 3:  # Minimum reasonable name length
                break

    # Try to find English name
    for pattern in eng_name_patterns:
        match = re.search(pattern, text)
        if match:
            eng_name = match.group(1).strip()
            # Clean but preserve letters, spaces, and common name characters
            eng_name = re.sub(r'[^A-Za-z\s\.\-]', '', eng_name)
            eng_name = re.sub(r'\s+', ' ', eng_name).strip()
            if len(eng_name) > 3:  # Minimum reasonable name length
                break

    # If English name is split across lines, try to find the continuation
    if eng_name and len(eng_name.split()) < 3:  # If name seems incomplete
        continuation = re.search(r'(?<=\n)([A-Z][A-Za-z\s]+)(?=\n)', text)
        if continuation:
            eng_name += " " + continuation.group(1).strip()

    return {
        'nic': nic,
        'sin_name': sin_name,
        'eng_name': eng_name,
        'raw_text': text
    }


def is_new_nic_valid(nic):
    """Check if NIC is valid new NIC (12 digits)."""
    if not nic:
        return False
    nic = nic.strip()
    return len(nic) == 12 and nic.isdigit()


def verify_in_db(nic, name):
    """Confirm if the NIC and Name exist in the database."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)

        nic_result = None
        name_result = None

        if nic:
            cursor.execute("SELECT * FROM users WHERE nic = %s", (nic,))
            nic_result = cursor.fetchone()

        if name:
            # Search for either Sinhala or English name
            cursor.execute("SELECT * FROM users WHERE name LIKE %s OR name LIKE %s",
                          (f"%{name}%", f"%{name.split()[0]}%"))
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
        return {"error": str(err)}


@app.route("/process", methods=["POST"])
def process():
    """API endpoint to process both sides of the NIC."""
    if "front_file" not in request.files or "back_file" not in request.files:
        return jsonify(error="Both images are required"), 400

    files = {
        "front_file": request.files["front_file"],
        "back_file": request.files["back_file"],
    }
    texts = []

    for fname, file in files.items():
        img_bytes = file.read()
        arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify(error=f"Invalid {fname}"), 400

        if fname == "back_file":
            text = extract_sinhala_and_english_text(img)
            extracted_temp = extract_fields(text)
            if not extracted_temp['nic']:
                # fallback for handwritten back side
                text = extract_sinhala_handwritten(img)
        else:
            text = extract_sinhala_and_english_text(img)

        texts.append(text)

    combined = " ".join(texts)
    extracted = extract_fields(combined)
    print("Extracted fields:", extracted)

    # Handle cases where NIC or name could not be extracted — treat as old NIC case
    if not extracted['nic'] and not extracted['sin_name'] and not extracted['eng_name']:
        response = {
            'extracted': extracted,
            'admin_verification_needed': True,
            'valid': False,
            'message': 'Could not reliably extract NIC or Name - treat as old NIC, admin verification required.'
        }
        return jsonify(response)

    # If NIC looks like a valid new NIC, proceed with DB verification
    if is_new_nic_valid(extracted['nic']):
        name_for_verification = extracted['eng_name'] or extracted['sin_name']
        verification = verify_in_db(extracted['nic'], name_for_verification)

        if "error" in verification:
            return jsonify(error=verification['error']), 500

        valid = verification['nic_found'] and verification['name_found']

        response = {
            'extracted': extracted,
            'verification': verification,
            'valid': valid
        }

        if not valid:
            response['error'] = "Information does not match records"

        return jsonify(response)

    else:
        # Old NIC or OCR unreliable - admin verification needed
        response = {
            'extracted': extracted,
            'admin_verification_needed': True,
            'valid': False,
            'message': 'Old NIC detected or OCR extraction unreliable. Admin verification required.'
        }
        return jsonify(response)


if __name__ == "__main__":
    app.run(port=5001, debug=True)