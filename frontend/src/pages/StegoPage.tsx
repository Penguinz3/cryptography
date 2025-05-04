import { useState } from 'react'
import FileInput from '../components/FileInput'
import useAudioStego from '../hooks/useAudioStego'

function StegoPage() {
  const [message, setMessage] = useState('')
  const { encodeMessage, decodeMessage, stegoAudioURL, decodedAudioMessage } = useAudioStego()

  const handleEncode = (file: File | null) => {
    encodeMessage(file)
  }

  return (
    <div className="section">
      <h2>Steganography</h2>
      <div className="stego-section">
        <h3>Encode Message</h3>
        <textarea
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          placeholder="Enter message to hide"
        />
        <FileInput accept="audio/*" onFileSelect={handleEncode} />
        {stegoAudioURL && (
          <div>
            <h4>Encoded Audio:</h4>
            <audio src={stegoAudioURL} controls />
          </div>
        )}
      </div>
      <div className="stego-section">
        <h3>Decode Message</h3>
        <FileInput accept="audio/*" onFileSelect={decodeMessage} />
        {decodedAudioMessage && (
          <div>
            <h4>Decoded Message:</h4>
            <p>{decodedAudioMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StegoPage 