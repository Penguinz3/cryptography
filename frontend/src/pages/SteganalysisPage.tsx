import React, { useState } from 'react'
import FileInput from '../components/FileInput'

function SteganalysisPage() {
  const [result, setResult] = useState('')

  const handleFileSelect = async (file: File | null) => {
    if (!file) return

    try {
      // Basic steganalysis - check for LSB patterns
      const buffer = await file.arrayBuffer()
      const view = new Uint8Array(buffer)
      
      // Simple analysis: count LSB patterns
      let lsbPatterns = 0
      for (let i = 0; i < view.length; i++) {
        if ((view[i] & 1) === 1) lsbPatterns++
      }
      
      const percentage = (lsbPatterns / view.length) * 100
      setResult(`Analysis complete. LSB pattern percentage: ${percentage.toFixed(2)}%`)
    } catch (error) {
      setResult(`Error analyzing file: ${error}`)
    }
  }

  return (
    <div className="section">
      <h2>Steganalysis</h2>
      <div className="steganalysis-section">
        <h3>Analyze File</h3>
        <FileInput accept="audio/*,image/*" onFileSelect={handleFileSelect} />
        {result && (
          <div>
            <h4>Analysis Result:</h4>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SteganalysisPage 