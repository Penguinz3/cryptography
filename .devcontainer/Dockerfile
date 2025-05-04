FROM mcr.microsoft.com/devcontainers/python:3.11

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install system dependencies for audio processing
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsndfile1 \
    libportaudio2 \
    libportaudiocpp0 \
    portaudio19-dev \
    libavcodec-extra \
    libavformat-dev \
    libavutil-dev \
    libswresample-dev \
    python3-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Set up Python virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
WORKDIR /workspace/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Additional audio processing dependencies
RUN pip install --no-cache-dir \
    soundfile \
    audioread \
    resampy \
    numba

# Install frontend dependencies
WORKDIR /workspace/frontend
COPY frontend/package*.json ./
RUN npm install

# Set up workspace
WORKDIR /workspace
COPY . . 