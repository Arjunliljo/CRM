import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../config/axiosInstance";
import HomeIcon from "../utils/Icons/HomeIcon";
import { removeCurLeadDocument , updateCurLeadDocuments} from "../../../global/leadsSlice";

function DocumentUpload() {
  const [documents, setDocuments] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [documentDetails, setDocumentDetails] = useState({});
  const currentLead = useSelector((state) => state.leads.curLead);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    const newIndex = documents;
    setDocuments((prev) => prev + 1);
    // Initialize document details when adding new card
    setDocumentDetails(prev => ({
      ...prev,
      [newIndex]: {
        content: "",
        isImportant: true  // Set default to true
      }
    }));
  };

  const handleFileChange = (index, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [index]: file,
    }));

    // Show input for document details
    setDocumentDetails(prev => ({
      ...prev,
      [index]: {
        content: "",
        isImportant: false
      }
    }));
  };

  const handleDocumentSubmit = async (index) => {
    const file = uploadedFiles[index];
    const details = documentDetails[index];

    if (!file || !details) return;

    const formData = new FormData();
    formData.append("docfile", file);
    formData.append("leadId", currentLead._id);
    formData.append("content", details.content);
    formData.append("isImportant", Boolean(details.isImportant));

    try {
      const response = await apiClient.post("/lead/uploadLeadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        });

      setUploadedFiles(prev => {
        const newFiles = {...prev};
        delete newFiles[index];
        return newFiles;
      });
      dispatch(updateCurLeadDocuments(response?.data?.data));

      setDocumentDetails(prev => {
        const newDetails = {...prev};
        delete newDetails[index];
        return newDetails;
      });
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDeleteDocument = (doc) => {
    try {
      apiClient.patch("/lead/updateLeadDocuments", {
        leadId: currentLead._id,
        documentObj: doc
      });

      dispatch(removeCurLeadDocument(doc._id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleDownload = async (docUrl) => {
    try {
      const response = await fetch(docUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = docUrl.split('/').pop(); // Extract filename from URL
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };


  return (
    <div className="document-upload">
      <span className="name-small">Documents</span>
      <div className="document-upload-document-container">
        <div className="document-upload-document-container-add-on">
          <div onClick={handleAddCard}>+</div>
        </div>
        {currentLead?.documents?.map((doc, index) => (
          <div
            key={doc._id}
            className="document-upload-document-container-add-on"
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '5px', left: '5px', display: 'flex', gap: '5px', zIndex: 1 }}>
              <div
                onClick={() => handleDeleteDocument(doc)}
                style={{
                  cursor: 'pointer'
                }}
              >
                <HomeIcon
                  path="delete"
                  style={{
                    width: '20px',
                    height: '20px',
                    color: 'red',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px'
                  }}
                />
              </div>
              <div
                onClick={() => handleDownload(doc.url)}
                style={{
                  cursor: 'pointer'
                }}
              >
                <HomeIcon
                  path="download"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px'
                  }}
                />
              </div>
            </div>
            <label style={{ marginLeft: '50px' }}>
              {doc.name}
              <input
                type="file"
                onChange={(e) => handleFileChange(index + 1, e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ))}
        {Array.from({ length: documents - (currentLead?.documents?.length || 0) - 1 }).map((_, index) => {
          const actualIndex = index + (currentLead?.documents?.length || 0) + 1;
          return (
            <div
              key={`new-${index}`}
              className="document-upload-document-container-add-on"
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 1 }}>
                <HomeIcon
                  path="delete"
                  style={{
                    width: '20px',
                    height: '20px',
                    color: 'red',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setDocumentDetails(prev => {
                      const newDetails = {...prev};
                      delete newDetails[actualIndex];
                      return newDetails;
                    });
                    setUploadedFiles(prev => {
                      const newFiles = {...prev};
                      delete newFiles[actualIndex];
                      return newFiles;
                    });
                    setDocuments(prev => prev - 1);
                  }}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Document content"
                  value={documentDetails[actualIndex]?.content || ""}
                  onChange={(e) => setDocumentDetails(prev => ({
                    ...prev,
                    [actualIndex]: {
                      ...prev[actualIndex],
                      content: e.target.value
                    }
                  }))}
                />
                <div style={{ marginTop: '5px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={documentDetails[actualIndex]?.isImportant || false}
                      onChange={(e) => setDocumentDetails(prev => ({
                        ...prev,
                        [actualIndex]: {
                          ...prev[actualIndex],
                          isImportant: e.target.checked
                        }
                      }))}
                    />
                    Mark as Important
                  </label>
                </div>

                <label className="file-select-button" style={{ display: 'block', marginTop: '5px' }}>
                  {uploadedFiles[actualIndex]
                    ? uploadedFiles[actualIndex].name
                    : "Select File"}
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(actualIndex, e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>

                {uploadedFiles[actualIndex] && (
                  <button
                    onClick={() => handleDocumentSubmit(actualIndex)}
                    style={{ marginTop: '5px' }}
                  >
                    Upload Document
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DocumentUpload;
