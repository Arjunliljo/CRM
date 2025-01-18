import { useState } from "react";

function DocumentUpload() {
  const [documents, setDocuments] = useState(5);

  const handleAddCard = () => {
    setDocuments((prev) => prev + 1);
  };
  return (
    <div className="document-upload">
      <span className="name-small">Documents</span>
      <div className="document-upload-document-container">
        {Array.from({ length: documents }).map((_, index) => (
          <div
            key={index}
            className="document-upload-document-container-add-on"
            onClick={index === 0 ? handleAddCard : null}
          >
            +
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUpload;
