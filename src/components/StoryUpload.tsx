 import { useState, useRef } from 'react'
 import type { ChangeEvent, FormEvent } from 'react'
 import './StoryUpload.css'

export interface StoryUploadProps {
  onSubmit?: (file: File) => void
  maxSizeBytes?: number
}

 function StoryUpload({ onSubmit, maxSizeBytes = 10 * 1024 * 1024 }: StoryUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (!file) {
      setSelectedFile(null)
      setErrorMessage(null)
      return
    }

    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedMimeTypes.includes(file.type)) {
      setSelectedFile(null)
      setErrorMessage('Invalid file type. Please upload a PDF, DOC, or DOCX file.')
      return
    }

    if (file.size > maxSizeBytes) {
      setSelectedFile(null)
      setErrorMessage(`File is too large. Max size is ${Math.floor(maxSizeBytes / (1024 * 1024))} MB.`)
      return
    }

    setErrorMessage(null)
    setSelectedFile(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFile) {
      setErrorMessage('Please select a file to upload.')
      return
    }

     if (onSubmit) {
      onSubmit(selectedFile)
    } else {
      console.log('Submitted story file:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      })
      alert('Story submitted! Check console for details.')
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setErrorMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="story-upload">
         <label>
           <div>Submit your story (PDF, DOC, DOCX)</div>
           <div className="story-upload__file-container">
             <input
               ref={fileInputRef}
               type="file"
               accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
               onChange={handleFileChange}
             />
             <button type="button" className="story-upload__clear-button" onClick={handleClear}>Clear</button>
           </div>
         </label>

        {selectedFile && (
          <div className="story-upload__file-info">
            Selected: {selectedFile.name} ({Math.ceil(selectedFile.size / 1024)} KB)
          </div>
        )}

        {errorMessage && (
          <div className="story-upload__error">{errorMessage}</div>
        )}

        <button type="submit" className="story-upload__submit-button" disabled={!selectedFile}>Upload Story</button>
      </div>
    </form>
  )
}

export default StoryUpload;

