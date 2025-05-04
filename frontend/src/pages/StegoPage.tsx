import React from 'react'
import FileInput from '../components/FileInput'
import { useAudioStego } from '../hooks/useAudioStego'

function StegoPage() {
  const { encodeMessage, decodeMessage } = useAudioStego()

  return (
    <div className="section">
      <h2>Steganography</h2>
      <div className="stego-section">
        <h3>Encode Message</h3>
        <FileInput accept="audio/*" onFileSelect={encodeMessage} />
      </div>
      <div className="stego-section">
        <h3>Decode Message</h3>
        <FileInput accept="audio/*" onFileSelect={decodeMessage} />
      </div>
    </div>
  )
}

export default StegoPage 