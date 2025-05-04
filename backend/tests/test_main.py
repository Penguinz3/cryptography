from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_audio_encode_no_file():
    response = client.post("/api/audio/encode")
    assert response.status_code == 422  # Unprocessable Entity

def test_audio_decode_no_file():
    response = client.post("/api/audio/decode")
    assert response.status_code == 422  # Unprocessable Entity

def test_audio_analyze_no_file():
    response = client.post("/api/audio/analyze")
    assert response.status_code == 422  # Unprocessable Entity 