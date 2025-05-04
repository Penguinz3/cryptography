import { useState } from 'react'

const useAudioStego = () => {
  const [stegoAudioURL, setStegoAudioURL] = useState<string | null>(null)
  const [decodedAudioMessage, setDecodedAudioMessage] = useState<string | null>(null)
  const [encodingError, setEncodingError] = useState<string | null>(null)
  const [decodingError, setDecodingError] = useState<string | null>(null)

  const encodeAudio = async (audioFile: File | null, message: string) => {
    if (!audioFile) {
      setEncodingError('Please select an audio file.')
      return null
    }
    if (!message) {
      setEncodingError('Please enter a message to embed.')
      return null
    }

    setEncodingError(null)
    try {
      const formData = new FormData()
      formData.append('audio_file', audioFile)
      formData.append('message', message)

      const response = await fetch('/api/audio/encode', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        setEncodingError(errorData.detail || 'Failed to encode audio.')
        return null
      }

      const data = await response.json()
      setStegoAudioURL(`data:audio/wav;base64,${data.stego_audio}`)
      return data.stego_audio
    } catch (error: any) {
      setEncodingError(error.message || 'An unexpected error occurred during encoding.')
      return null
    }
  }

  const decodeAudio = async (audioFile: File | null) => {
    if (!audioFile) {
      setDecodingError('Please select an audio file to decode.')
      return null
    }

    setDecodingError(null)
    try {
      const formData = new FormData()
      formData.append('audio_file', audioFile)

      const response = await fetch('/api/audio/decode', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        setDecodingError(errorData.detail || 'Failed to decode audio.')
        return null
      }

      const data = await response.json()
      setDecodedAudioMessage(data.message)
      return data.message
    } catch (error: any) {
      setDecodingError(error.message || 'An unexpected error occurred during decoding.')
      return null
    }
  }

  return {
    stegoAudioURL,
    decodedAudioMessage,
    encodingError,
    decodingError,
    encodeAudio,
    decodeAudio,
  }
}

export default useAudioStego 