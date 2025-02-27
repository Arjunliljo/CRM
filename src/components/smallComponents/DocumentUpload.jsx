import { useState, useEffect } from "react";
import HomeIcon from "../utils/Icons/HomeIcon";
import { message } from "antd";

function DocumentUpload({ lead, onUpload, onDelete, onUpdate }) {
  const [uploadForms, setUploadForms] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [documentDetails, setDocumentDetails] = useState({});
  const [editingDocId, setEditingDocId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    content: "",
    isImportant: false,
    name: "",
  });

  // Initialize default forms if no documents are uploaded
  useEffect(() => {
    if (lead?.documents?.length === 0) {
      setUploadForms([0, 1, 2, 3]); // Initialize 4 default forms
    } else {
      // Reduce default forms based on uploaded documents
      const remainingForms = 4 - (lead?.documents?.length || 0);
      if (remainingForms > 0) {
        setUploadForms(Array.from({ length: remainingForms }, (_, i) => i));
      } else {
        setUploadForms([]); // No default forms if 4 or more documents are uploaded
      }
    }
  }, [lead?.documents]);

  const handleAddCard = () => {
    const newIndex = uploadForms.length > 0 ? Math.max(...uploadForms) + 1 : 0;
    setUploadForms((prev) => [...prev, newIndex]);
    setDocumentDetails((prev) => ({
      ...prev,
      [newIndex]: {
        content: "",
        isImportant: false,
      },
    }));
  };

  const handleFileChange = (index, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [index]: file,
    }));

    // Initialize document details if not already set
    if (!documentDetails[index]) {
      setDocumentDetails((prev) => ({
        ...prev,
        [index]: {
          content: "",
          isImportant: false,
        },
      }));
    }
  };

  const handleDocumentSubmit = async (index) => {
    const file = uploadedFiles[index];
    const details = documentDetails[index];

    if (!file || !details) return;
    setLoading(true);
    const success = await onUpload(file, {
      ...details,
      leadId: lead._id,
      mainFolder: "documents",
      subFolder: lead._id,
    });

    if (success) {
      // Clean up form state
      cleanupFormState(index);
    }
    setLoading(false);
  };

  const cleanupFormState = (index) => {
    setUploadForms((prev) => prev.filter((formIndex) => formIndex !== index));
    setUploadedFiles((prev) => {
      const { [index]: removed, ...rest } = prev;
      return rest;
    });
    setDocumentDetails((prev) => {
      const { [index]: removed, ...rest } = prev;
      return rest;
    });
  };

  const handleDeleteDocument = async (doc) => {
    await onDelete(doc);
  };

  const handleDownload = async (docUrl) => {
    try {
      const response = await fetch(docUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to download file: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = docUrl.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      message.error(
        "You do not have permission to download this file. Please contact the administrator."
      );
    }
  };

  const handleEditClick = (doc) => {
    setEditingDocId(doc._id);
    setEditFormData({
      content: doc.content || "",
      isImportant: doc.isImportant || false,
      name: doc.name || "",
    });
  };

  const handleSaveEdit = async (doc) => {
    const success = await onUpdate(doc, editFormData);
    if (success) {
      setEditingDocId(null);
    }
  };

  return (
    <div className="document-upload">
      <span className="name-small">Documents</span>
      <div className="document-upload-document-container">
        {/* Add more forms button - always first */}
        <div className="document-upload-document-container-add-on">
          <div onClick={handleAddCard}>+</div>
        </div>

        {/* Render upload forms */}
        {uploadForms.map((formIndex) => (
          <div
            key={formIndex}
            className="document-upload-document-container-add-on"
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                zIndex: 1,
              }}
            >
              <div
                onClick={() => {
                  setUploadForms((prev) =>
                    prev.filter((idx) => idx !== formIndex)
                  );
                  setDocumentDetails((prev) => {
                    const newDetails = { ...prev };
                    delete newDetails[formIndex];
                    return newDetails;
                  });
                  setUploadedFiles((prev) => {
                    const newFiles = { ...prev };
                    delete newFiles[formIndex];
                    return newFiles;
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <HomeIcon
                  path="delete"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "red",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </div>
            </div>

            <div
              className="document-upload-form"
              // style={{
              //   margin: "5px 0",
              //   padding: "5px",
              //   borderRadius: "8px",
              //   display: "flex",
              //   flexDirection: "column",
              //   gap: "4px",
              // }}
            >
              <input
                type="text"
                placeholder="Document content"
                value={documentDetails[formIndex]?.content || ""}
                onChange={(e) =>
                  setDocumentDetails((prev) => ({
                    ...prev,
                    [formIndex]: {
                      ...prev[formIndex],
                      content: e.target.value,
                    },
                  }))
                }
                className="document-upload-form-input"
              />

              <label className="document-upload-form-label-important">

                <input
                  type="checkbox"
                  checked={documentDetails[formIndex]?.isImportant || false}
                  onChange={(e) =>
                    setDocumentDetails((prev) => ({
                      ...prev,
                      [formIndex]: {
                        ...prev[formIndex],
                        isImportant: e.target.checked,
                      },
                    }))
                  }
                  style={{
                    marginRight: "4px",
                    transform: "scale(0.8)",
                  }}
                />
                Mark as Important
              </label>

              <label className="document-upload-form-label">
                {uploadedFiles[formIndex] ? (
                  <span
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "0.85rem",
                      maxWidth: "140px",
                    }}
                  >
                    {uploadedFiles[formIndex].name}
                  </span>
                ) : (
                  <span style={{ fontSize: "0.85rem" }}>Select File</span>
                )}
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(formIndex, e.target.files[0])
                  }
                  style={{ display: "none" }}
                />
              </label>

              {uploadedFiles[formIndex] && (
                <button
                  onClick={() => handleDocumentSubmit(formIndex)}
                  style={{
                    width: "50%",
                    marginTop: "10px",
                    padding: "6px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    display: "block",
                    margin: "0 auto",
                  }}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Render uploaded documents */}
        {lead?.documents?.map((doc, index) => (
          <div
            key={doc._id}
            className="document-upload-document-container-add-on"
            style={{ position: "relative" }}
          >
            {doc.isImportant && (
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  zIndex: 1,
                }}
              >
                <HomeIcon
                  path="star"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#FFD700",
                    filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.3))",
                  }}
                />
              </div>
            )}
            {/* Document actions (delete, edit, download) */}
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                display: "flex",
                gap: "5px",
                zIndex: 1,
              }}
            >
              <div
                onClick={() => handleDeleteDocument(doc)}
                style={{ cursor: "pointer" }}
              >
                <HomeIcon
                  path="delete"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "red",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </div>
              <div
                onClick={() =>
                  editingDocId === doc._id
                    ? setEditingDocId(null)
                    : handleEditClick(doc)
                }
                style={{ cursor: "pointer" }}
              >
                <HomeIcon
                  path={editingDocId === doc._id ? "close" : "edit"}
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </div>
              <div
                onClick={() => handleDownload(doc.url)}
                style={{ cursor: "pointer" }}
              >
                <HomeIcon
                  path="download"
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </div>
            </div>

            {/* Document details or edit form */}
            {editingDocId === doc._id ? (
              <div
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <input
                  type="text"
                  placeholder="Document name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "4px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.95rem",
                  }}
                />

                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.8rem",
                      color: "#666",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={editFormData.isImportant}
                      onChange={(e) =>
                        setEditFormData((prev) => ({
                          ...prev,
                          isImportant: e.target.checked,
                        }))
                      }
                      style={{
                        marginRight: "4px",
                        transform: "scale(0.8)",
                      }}
                    />
                    Mark as Important
                  </label>
                </div>
                <button
                  onClick={() => handleSaveEdit(doc)}
                  style={{
                    width: "50%",
                    padding: "6px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    display: "block",
                    margin: "0 auto",
                    fontSize: "0.85rem",
                    marginTop: "10px",
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="document-info">
                <div className="document-icon">
                  <HomeIcon
                    path="document"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#007bff",
                      marginRight: "8px",
                      marginTop: "5px",
                    }}
                  />
                </div>
                <div className="document-details">
                  <label className="document-name">{doc.name}</label>
                  <span className="document-filename">{doc.filename}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUpload;
