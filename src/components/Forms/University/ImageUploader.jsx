import React, { useState, useEffect } from "react";
import Upload from "../../../assets/Icons/upload.png";

export default function ImageUploader({ onUpload, image }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Clear previous preview
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }

    if (image instanceof File) {
      const previewUrl = URL.createObjectURL(image);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }

    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file); // Debug log
      onUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("File dropped:", file); // Debug log
      onUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onUpload(null);
  };

  return (
    <div className="modal__form-course-selector">
      <h2 className="modal__form-course-selector-heading">Upload Image</h2>

      <div
        className="modal__form-course-selector-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #ddd',
          borderRadius: '8px',
          padding: '20px',
          position: 'relative'
        }}
      >
        <input
          type="file"
          id="imageUpload"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="imageUpload"
          style={{
            width: '100%',
            cursor: 'pointer',
            display: 'block'
          }}
        >
          <div className="modal__form-course-selector-upload-icon-content">
            {preview ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt="Uploaded Preview"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <img
                  src={Upload}
                  alt="upload"
                  style={{
                    width: '50px',
                    height: '50px',
                    marginBottom: '10px'
                  }}
                />
                <p style={{ margin: '5px 0', color: '#666' }}>
                  Drop your image here, or browse
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  JPEG, PNG, GIF, or SVG
                </p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
