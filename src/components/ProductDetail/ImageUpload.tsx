import React, { useEffect, useRef, useState } from "react"

interface Props {
  files: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
}

const ImageUpload: React.FC<Props> = ({ files, onChange, maxFiles = 5 }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const urls = files.map(f => URL.createObjectURL(f))
    setPreviewUrls(urls)
    return () => urls.forEach(u => URL.revokeObjectURL(u))
  }, [files])

  const handleFiles = (newFiles: File[]) => {
    const allowed = Math.max(0, maxFiles - files.length)
    const take = newFiles.slice(0, allowed)
    if (take.length === 0) return
    onChange([...files, ...take])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    handleFiles(Array.from(e.target.files))
    e.currentTarget.value = ""
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"))
    handleFiles(dropped)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  const removeAt = (index: number) => {
    const next = files.filter((_, i) => i !== index)
    onChange(next)
  }

  return (
    <div className="image-upload">
      <div
        className="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleInputChange}
        />
        <div className="dropzone-content">
          <div className="icon">📷</div>
          <div className="text">Kéo thả ảnh hoặc <span className="select-link">chọn ảnh</span></div>
          <div className="hint">Tối đa {maxFiles} ảnh</div>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="preview-images">
          {previewUrls.map((src, i) => (
            <div className="preview-item" key={i}>
              <img src={src} alt={`preview-${i}`} />
              <button className="remove-btn" onClick={() => removeAt(i)}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
