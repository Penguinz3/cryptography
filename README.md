# Steganography & Crypto Web App

This project implements a web application for image and audio steganography with cryptographic features.

## Project Structure

```
/project-root
├── frontend/     # React app
├── backend/      # FastAPI app
├── .github/      # Actions workflows
├── .gitignore
└── README.md
```

## Features

- Image Steganography (LSB encoding/decoding)
- Audio Steganography (Echo encoding/decoding)
- Cryptographic Operations (AES, RSA)
- Steganalysis Tools

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or use Windows command
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# http://localhost:8000/api/health
```

## Development

- Frontend: React + TypeScript + Vite
- Backend: FastAPI + Python
- CI/CD: GitHub Actions

## Security Notes

- All cryptographic operations are performed client-side using libsodium
- Audio steganography uses echo embedding
- Image steganography uses LSB (Least Significant Bit) method
- Steganalysis tools are provided for both image and audio analysis

## License

MIT 