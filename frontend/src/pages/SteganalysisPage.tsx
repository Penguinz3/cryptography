import React, { useState, useRef } from 'react'
import FileInput from '../components/FileInput'
import useAudioStego from '../hooks/useAudioStego'

const SteganalysisPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageAnalysisResult, setImageAnalysisResult] = useState<string | null>(null)
  const [audioAnalysisResult, setAudioAnalysisResult] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { decodeAudio } = useAudioStego()

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file)
    setImageAnalysisResult(null)
  }

  const handleAudioFileSelectedForAnalysis = (file: File | null) => {
    setSelectedFile(file)
    setAudioAnalysisResult(null)
  }

  const analyzeImage = () => {
    if (!selectedFile) {
      alert('Please select an image to analyze.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          // Basic bias detection (example: checking for LSB patterns - very simplified)
          let suspiciousPixels = 0
          for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i] % 2 !== imageData.data[i + 1] % 2 || 
                imageData.data[i] % 2 !== imageData.data[i + 2] % 2) {
              suspiciousPixels++
            }
          }
          const percentage = (suspiciousPixels / (imageData.data.length / 4)) * 100
          setImageAnalysisResult(
            `Basic Bias Analysis: Suspicious pixel changes detected in approximately ${percentage.toFixed(2)}% of pixels.`
          )
        }
      }
      if (event.target?.result) {
        img.src = event.target.result as string
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const analyzeAudio = async () => {
    if (!selectedFile) {
      alert('Please select an audio file to analyze.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('audio_file', selectedFile)

      const response = await fetch('/api/audio/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        setAudioAnalysisResult(errorData.detail || 'Failed to analyze audio.')
        return
      }

      const data = await response.json()
      setAudioAnalysisResult(data.result)
    } catch (error: any) {
      setAudioAnalysisResult(error.message || 'An unexpected error occurred during audio analysis.')
    }
  }

  return (
    <div className="steganalysis-page">
      <h2>Steganalysis Tools</h2>

      <div className="image-analysis-section">
        <h3>Detect Hidden Data in Image</h3>
        <FileInput onFileSelected={handleFileSelected} />
        {selectedFile && <button onClick={analyzeImage}>Analyze Image</button>}
        {imageAnalysisResult && <p>{imageAnalysisResult}</p>}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div className="audio-analysis-section">
        <h3>Detect Hidden Data in Audio (Echo)</h3>
        <FileInput onFileSelected={handleAudioFileSelectedForAnalysis} />
        {selectedFile && <button onClick={analyzeAudio}>Analyze Audio</button>}
        {audioAnalysisResult && <p>{audioAnalysisResult}</p>}
      </div>
    </div>
  )
}

export default SteganalysisPage 