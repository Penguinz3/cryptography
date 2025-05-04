import React, { useState, useRef } from 'react'

interface FileInputProps {
  onFileSelected: (file: File | null) => void
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    onFileSelected(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="file-input">
      <button onClick={handleClick}>
        {selectedFile?.name || 'Select File'}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  )
}

export default FileInput 