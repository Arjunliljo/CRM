import { useState } from "react";

function DocumentUpload() {
  const [documents, setDocuments] = useState(6);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleAddCard = () => {
    setDocuments((prev) => prev + 1);
  };

  const handleFileChange = (index, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [index]: file,
    }));
  };

  return (
    <div className="document-upload">
      <span className="name-small">Documents</span>
      <div className="document-upload-document-container">
        {Array.from({ length: documents }).map((_, index) => (
          <div
            key={index}
            className="document-upload-document-container-add-on"
          >
            {index === 0 ? (
              <div onClick={handleAddCard}>+</div>
            ) : (
              <label>
                {uploadedFiles[index] ? uploadedFiles[index].name : "+"}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUpload;
