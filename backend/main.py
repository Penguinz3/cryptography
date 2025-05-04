from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydub import AudioSegment
import librosa
import numpy as np
import io
import base64

app = FastAPI()

origins = ["http://localhost:3000"]  # Frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

def embed_echo(audio_bytes: bytes, message: str, delay: float = 0.1, amplitude: float = 0.5):
    # Basic echo embedding
    audio = AudioSegment.from_file(io.BytesIO(audio_bytes))
    echo = audio.apply_gain(amplitude).delay(int(delay * 1000))
    combined = audio.overlay(echo)
    buffer = io.BytesIO()
    combined.export(buffer, format="wav")
    return buffer.getvalue()

@app.post("/api/audio/encode")
async def encode_audio(audio_file: UploadFile = File(...), message: str = Form(...)):
    audio_bytes = await audio_file.read()
    stego_audio = embed_echo(audio_bytes, message)
    return {"stego_audio": base64.b64encode(stego_audio).decode("utf-8")}

def extract_echo(audio_bytes: bytes):
    # Basic echo extraction
    return "Extracted message (Echo detection is complex)"

@app.post("/api/audio/decode")
async def decode_audio(audio_file: UploadFile = File(...)):
    audio_bytes = await audio_file.read()
    decoded_message = extract_echo(audio_bytes)
    return {"message": decoded_message}

def detect_echo(audio_bytes: bytes):
    # Rudimentary echo detection using autocorrelation
    try:
        audio, sr = librosa.load(io.BytesIO(audio_bytes), sr=None)
        if len(audio) < sr * 0.2:  # Minimum duration
            return "Audio too short for reliable echo detection."
        autocorr = librosa.autocorrelate(audio, max_size=sr // 10)  # Check for echoes up to 100ms
        peak_index = np.argmax(autocorr[sr // 100:]) + sr // 100  # Look for peak after 10ms
        if autocorr[peak_index] > 0.1:  # Threshold for detection
            return f"Possible echo detected with a delay of approximately {(peak_index / sr) * 1000:.2f} ms."
        else:
            return "No significant echo pattern detected."
    except Exception as e:
        return f"Error during audio analysis: {e}"

@app.post("/api/audio/analyze")
async def analyze_audio(audio_file: UploadFile = File(...)):
    audio_bytes = await audio_file.read()
    analysis_result = detect_echo(audio_bytes)
    return {"result": analysis_result} 