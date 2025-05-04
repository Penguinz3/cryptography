import React, { useState } from 'react'
import FileInput from '../components/FileInput'
import useAudioStego from '../hooks/useAudioStego'

const StegoPage: React.FC = () => {
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null)
  const [audioMessage, setAudioMessage] = useState('')
  const {
    stegoAudioURL,
    decodedAudioMessage,
    encodingError,
    decodingError,
    encodeAudio,
    decodeAudio,
  } = useAudioStego()

  const handleImageFileSelected = (file: File | null) => {
    setSelectedImageFile(file)
  }

  const handleAudioFileSelected = (file: File | null) => {
    setSelectedAudioFile(file)
  }

  const handleEncodeAudio = () => {
    encodeAudio(selectedAudioFile, audioMessage)
  }

  const handleDecodeAudio = () => {
    decodeAudio(selectedAudioFile)
  }

  return (
    <div className="stego-page">
      <h2>Steganography Tools</h2>
      <p>Embed and decode messages in images and audio.</p>

      <div className="image-stego-section">
        <h3>Image Steganography</h3>
        <div className="encode-section">
          <h4>Encode Message in Image</h4>
          <FileInput onFileSelected={handleImageFileSelected} />
          {selectedImageFile && (
            <div>
              <label htmlFor="imageMessage">Message:</label>
              <textarea
                id="imageMessage"
                value={audioMessage}
                onChange={(e) => setAudioMessage(e.target.value)}
              />
              <button onClick={() => {}} disabled={!selectedImageFile}>
                Encode Image
              </button>
            </div>
          )}
        </div>

        <div className="decode-section">
          <h4>Decode Message from Image</h4>
          <FileInput onFileSelected={handleImageFileSelected} />
          {selectedImageFile && (
            <button onClick={() => {}} disabled={!selectedImageFile}>
              Decode Image
            </button>
          )}
        </div>
      </div>

      <div className="audio-stego-section">
        <h3>Audio Steganography</h3>
        <div className="encode-section">
          <h4>Encode Message in Audio</h4>
          <FileInput onFileSelected={handleAudioFileSelected} />
          {selectedAudioFile && (
            <div>
              <label htmlFor="audioMessage">Message:</label>
              <textarea
                id="audioMessage"
                value={audioMessage}
                onChange={(e) => setAudioMessage(e.target.value)}
              />
              <button onClick={handleEncodeAudio} disabled={!selectedAudioFile}>
                Encode Audio
              </button>
              {encodingError && <p className="error">Error: {encodingError}</p>}
              {stegoAudioURL && (
                <div>
                  <h4>Stego Audio:</h4>
                  <audio src={stegoAudioURL} controls />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="decode-section">
          <h4>Decode Message from Audio</h4>
          <FileInput onFileSelected={handleAudioFileSelected} />
          {selectedAudioFile && (
            <div>
              <button onClick={handleDecodeAudio} disabled={!selectedAudioFile}>
                Decode Audio
              </button>
              {decodingError && <p className="error">Error: {decodingError}</p>}
              {decodedAudioMessage && (
                <div>
                  <h4>Decoded Message:</h4>
                  <p>{decodedAudioMessage}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StegoPage 