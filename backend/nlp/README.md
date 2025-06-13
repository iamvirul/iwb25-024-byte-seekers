# Sinhala OCR Document Verification API

## Overview

This system provides an API endpoint that processes images containing Sinhala text (particularly National Identity Cards), extracts NIC numbers and names, and verifies them against a database. The system is built with Flask and uses Tesseract OCR with Sinhala language support.

## Prerequisites

Before running the system, ensure you have the following installed:

1. **Python 3.7+**
2. **Tesseract OCR** with Sinhala language support
3. **MySQL Database** (or compatible)

### Installation Instructions

#### macOS

```bash
# Install Tesseract
brew install tesseract

# Install Sinhala language data
brew install tesseract-lang
```

#### Linux (Ubuntu/Debian)

```bash
# Install Tesseract
sudo apt install tesseract-ocr

# Install Sinhala language data
sudo apt install tesseract-ocr-sin
```

#### Windows

1. Download Tesseract installer from [UB Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
2. Install Sinhala language data (download from [tesseract-ocr/tessdata](https://github.com/tesseract-ocr/tessdata))

## Setup

1. Clone the repository
2. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file with your database credentials:

```env
DB_HOST=your_database_host
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database_name
```

## Database Setup

Create a table in your MySQL database with the following structure:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nic VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    -- Add other fields as needed
    UNIQUE KEY (nic)
);
```

## Running the Application

Start the Flask development server:

```bash
python ocr_nlp_service.py
```

The API will be available at `http://localhost:5001`

## API Endpoint

### POST `/process`

Process an image containing Sinhala text to extract and verify NIC and name information.

**Request:**
- Content-Type: `multipart/form-data`
- Parameter: `file` (image file)

**Response:**
```json
{
    "extracted": {
        "name": "NAME",
        "nic": "NIC",
        "raw_text": "TEXT"
    },
    "valid": true,
    "verification": {
        "name_found": true,
        "name_match": {
            "id": 2,
            "name": "USER'S FULL NAME",
            "nic": "NIC"
        },
        "nic_found": true,
        "nic_match": {
            "id": 2,
            "name": "USER'S FULL NAME",
            "nic": "NIC"
        }
    }
}
```

## Workflow

1. **Image Submission**
   - Client sends an image file to `/process` endpoint

2. **Image Processing**
   - System converts image to grayscale
   - Applies thresholding for better OCR results

3. **Text Extraction**
   - Uses Tesseract OCR with Sinhala language support
   - Extracts all text from the image

4. **Data Extraction**
   - Uses regex patterns to identify:
     - NIC number (following Sinhala labels like "ජාතික හැඳුනුම්පත් අංකය")
     - Name (following Sinhala labels like "නම")

5. **Database Verification**
   - Checks if extracted NIC exists in database
   - Checks if extracted name exists in database (fuzzy match)

6. **Response Generation**
   - Returns extracted data and verification results
   - Returns error if:
     - Image doesn't contain NIC/name information
     - Information doesn't match database records
     - Any processing error occurs

## Error Handling

The system handles and returns appropriate errors for:
- Missing image file
- Invalid image format
- Tesseract not installed
- Database connection issues
- Documents missing required information
- Information not found in database

## Customization

To adapt the system to your specific documents:

1. **Update Regex Patterns**
   - Modify the patterns in `extract_nic_and_name()` to match your document format
   - Add more patterns if needed

2. **Database Schema**
   - Adjust the table structure and queries in `verify_in_db()` to match your database

3. **Validation Logic**
   - Modify the verification logic in the main endpoint if you need different validation rules

## Deployment

For production deployment, consider:
1. Using a production WSGI server (Gunicorn, uWSGI)
2. Setting up proper logging
3. Implementing API authentication
4. Containerizing with Docker
5. Setting up monitoring

## Troubleshooting

**Common Issues:**

1. **Tesseract not found**
   - Ensure Tesseract is installed and in your PATH
   - Uncomment and set `pytesseract.pytesseract.tesseract_cmd` in the code

2. **Poor OCR results**
   - Improve image quality before submission
   - Adjust preprocessing parameters (thresholding, etc.)
   - Train Tesseract with your specific font if needed

3. **Database connection issues**
   - Verify `.env` file settings
   - Check database server accessibility
   - Verify table structure matches expectations