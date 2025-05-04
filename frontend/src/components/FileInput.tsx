import React from 'react'

interface FileInputProps {
  accept: string
  onFileSelect: (file: File | null) => void
}

function FileInput({ accept, onFileSelect }: FileInputProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onFileSelect(file)
  }

  return (
    <input
      type="file"
      accept={accept}
      onChange={handleFileChange}
    />
  )
}

export default FileInput 