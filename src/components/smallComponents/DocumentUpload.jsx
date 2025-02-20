import { useState } from "react";
import HomeIcon from "../utils/Icons/HomeIcon";

// function DocumentUpload({lead , onSubmit, onDelete , onEdit , onSave }) {
//   const [documents, setDocuments] = useState(1);
//   const [uploadForms, setUploadForms] = useState([]);
//   const [uploadedFiles, setUploadedFiles] = useState({});
//   const [documentDetails, setDocumentDetails] = useState({});
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [editingDocId, setEditingDocId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     content: "",
//     isImportant: false,
//     name: ""
//   });

//   const dispatch = useDispatch();

//   console.log(lead, "currentLead");

//   const handleAddCard = () => {
//     setShowUploadForm(true);
//     const newIndex = documents;
//     setDocuments(prev => prev + 1);
//     setUploadForms(prev => [...prev, newIndex]);
//     setDocumentDetails(prev => ({
//       ...prev,
//       [newIndex]: {
//         content: "",
//         isImportant: false
//       }
//     }));
//   };

//   const handleFileChange = (index, file) => {
//     setUploadedFiles((prev) => ({
//       ...prev,
//       [index]: file,
//     }));

//     // Don't reset document details when file changes
//     if (!documentDetails[index]) {
//       setDocumentDetails(prev => ({
//         ...prev,
//         [index]: {
//           content: "",
//           isImportant: false
//         }
//       }));
//     }
//   };

//   const handleDocumentSubmit = async (index) => {
//     const file = uploadedFiles[index];
//     const details = documentDetails[index];

//     if (!file || !details) return;

//     const formData = new FormData();
//     formData.append("docfile", file);
//     formData.append("leadId", lead._id);
//     formData.append("content", details.content);
//     formData.append("isImportant", Boolean(details.isImportant));

//     try {
//       const response = await apiClient.post("/lead/uploadLeadFile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Clean up form state
//       cleanupFormState(index);

//       // Update documents through Redux
//       dispatch(updateCurLeadDocuments(response?.data?.data));
//     } catch (error) {
//       console.error("Error uploading document:", error);
//     }
//   };

//   const cleanupFormState = (index) => {
//     setUploadForms(prev => prev.filter(formIndex => formIndex !== index));
//     setUploadedFiles(prev => {
//       const { [index]: removed, ...rest } = prev;
//       return rest;
//     });
//     setDocumentDetails(prev => {
//       const { [index]: removed, ...rest } = prev;
//       return rest;
//     });
//   };

//   const handleDeleteDocument = async (doc) => {
//     try {
//       await apiClient.patch("/lead/deleteLeadDocument", {
//         leadId: lead._id,
//         documentObj: doc
//       });
//       dispatch(removeCurLeadDocument(doc._id));
//     } catch (error) {
//       console.error("Error deleting document:", error);
//     }
//   };

//   const handleDownload = async (docUrl) => {
//     try {
//       const response = await fetch(docUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = docUrl.split('/').pop();
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading document:", error);
//     }
//   };

//   const handleEditClick = (doc) => {
//     setEditingDocId(doc._id);
//     setEditFormData({
//       content: doc.content || "",
//       isImportant: doc.isImportant || false,
//       name: doc.name || ""
//     });
//   };

//   const handleSaveEdit = async (doc) => {
//     try {
//       const response = await apiClient.patch("/lead/updateLeadDocuments", {
//         leadId: lead._id,
//         documentObj: {
//           ...doc,
//           ...editFormData
//         }
//       });

//       dispatch(updateCurLeadDocuments(response?.data?.data));
//       setEditingDocId(null);
//     } catch (error) {
//       console.error("Error updating document:", error);
//     }
//   };

//   return (
//     <div className="document-upload">
//       <span className="name-small">Documents</span>
//       <div className="document-upload-document-container">
//         <div className="document-upload-document-container-add-on">
//           <div onClick={handleAddCard}>+</div>
//         </div>
//         {lead?.documents?.map((doc, index) => (
//           <div
//             key={doc._id}
//             className="document-upload-document-container-add-on"
//             style={{ position: 'relative' }}
//           >
//             {doc.isImportant && (
//               <div style={{
//                 position: 'absolute',
//                 top: '5px',
//                 right: '5px',
//                 zIndex: 1
//               }}>
//                 <HomeIcon
//                   path="star"
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     color: '#FFD700',
//                     filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.3))'
//                   }}
//                 />
//               </div>
//             )}
//             <div style={{ position: 'absolute', top: '5px', left: '5px', display: 'flex', gap: '5px', zIndex: 1 }}>
//               <div
//                 onClick={() => handleDeleteDocument(doc)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <HomeIcon
//                   path="delete"
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     color: 'red',
//                     backgroundColor: 'white',
//                     borderRadius: '50%',
//                     padding: '2px'
//                   }}
//                 />
//               </div>
//               <div
//                 onClick={() => editingDocId === doc._id ? setEditingDocId(null) : handleEditClick(doc)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <HomeIcon
//                   path={editingDocId === doc._id ? "close" : "edit"}
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     backgroundColor: 'white',
//                     borderRadius: '50%',
//                     padding: '2px'
//                   }}
//                 />
//               </div>
//               <div
//                 onClick={() => handleDownload(doc.url)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <HomeIcon
//                   path="download"
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     backgroundColor: 'white',
//                     borderRadius: '50%',
//                     padding: '2px'
//                   }}
//                 />
//               </div>
//             </div>
//             {editingDocId === doc._id ? (
//               <div style={{
//                 marginLeft: '10px',
//                 marginTop: '10px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '4px'
//               }}>
//                 <input
//                   type="text"
//                   placeholder="Document name"
//                   value={editFormData.name}
//                   onChange={(e) => setEditFormData(prev => ({
//                     ...prev,
//                     name: e.target.value
//                   }))}
//                   style={{
//                     width: '100%',
//                     padding: '4px',
//                     border: '1px solid #ced4da',
//                     borderRadius: '4px',
//                     backgroundColor: '#f5f5f5',
//                     fontSize: '0.95rem'
//                   }}
//                 />

//                 <div>
//                   <label style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     fontSize: '0.8rem',
//                     color: '#666'
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={editFormData.isImportant}
//                       onChange={(e) => setEditFormData(prev => ({
//                         ...prev,
//                         isImportant: e.target.checked
//                       }))}
//                       style={{
//                         marginRight: '4px',
//                         transform: 'scale(0.8)'
//                       }}
//                     />
//                     Mark as Important
//                   </label>
//                 </div>
//                 <button
//                   onClick={() => handleSaveEdit(doc)}
//                   style={{
//                     width: '50%',
//                     padding: '6px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '20px',
//                     cursor: 'pointer',
//                     display: 'block',
//                     margin: '0 auto',
//                     fontSize: '0.85rem',
//                     marginTop: '10px'
//                   }}
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <div className="document-info">
//                 <div className="document-icon">
//                   <HomeIcon
//                     path="document"
//                     style={{
//                       width: '24px',
//                       height: '24px',
//                       color: '#007bff',
//                       marginRight: '8px',
//                       marginTop: '5px'
//                     }}
//                   />
//                 </div>
//                 <div className="document-details">
//                   <label className="document-name">{doc.name}</label>
//                   <span className="document-filename">{doc.filename}</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         {uploadForms.map(formIndex => (
//           <div
//             key={formIndex}
//             className="document-upload-document-container-add-on"
//             style={{ position: 'relative' }}
//           >
//             <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 1 }}>
//               <div
//                 onClick={() => {
//                   setUploadForms(prev => prev.filter(idx => idx !== formIndex));
//                   setDocumentDetails(prev => {
//                     const newDetails = {...prev};
//                     delete newDetails[formIndex];
//                     return newDetails;
//                   });
//                   setUploadedFiles(prev => {
//                     const newFiles = {...prev};
//                     delete newFiles[formIndex];
//                     return newFiles;
//                   });
//                 }}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <HomeIcon
//                   path="delete"
//                   style={{
//                     width: '20px',
//                     height: '20px',
//                     color: 'red',
//                     backgroundColor: 'white',
//                     borderRadius: '50%',
//                     padding: '2px'
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="document-upload-form" style={{
//               margin: '5px 0',
//               padding: '5px',
//               borderRadius: '8px',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '4px'
//             }}>
//               <input
//                 type="text"
//                 placeholder="Document content"
//                 value={documentDetails[formIndex]?.content || ""}
//                 onChange={(e) => setDocumentDetails(prev => ({
//                   ...prev,
//                   [formIndex]: { ...prev[formIndex], content: e.target.value }
//                 }))}
//                 style={{
//                   width: '100%',
//                   padding: '4px',
//                   border: '1px solid #ced4da',
//                   borderRadius: '4px',
//                   backgroundColor: '#f5f5f5',
//                   fontSize: '0.95rem'
//                 }}
//               />

//               <label style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 fontSize: '0.8rem',
//                 color: '#666'
//               }}>
//                 <input
//                   type="checkbox"
//                   checked={documentDetails[formIndex]?.isImportant || false}
//                   onChange={(e) => setDocumentDetails(prev => ({
//                     ...prev,
//                     [formIndex]: { ...prev[formIndex], isImportant: e.target.checked }
//                   }))}
//                   style={{
//                     marginRight: '4px',
//                     transform: 'scale(0.8)'
//                   }}
//                 />
//                 Mark as Important
//               </label>

//               <label style={{
//                 display: 'block',
//                 padding: '4px 6px',
//                 backgroundColor: '#e9ecef',
//                 border: '1px dashed #adb5bd',
//                 borderRadius: '4px',
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 marginBottom: '5px',
//                 width: '150px',
//                 margin: '0 auto',
//               }}>
//                 {uploadedFiles[formIndex] ? (
//                   <span style={{
//                     display: 'block',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                     fontSize: '0.85rem',
//                     maxWidth: '140px',
//                   }}>
//                     {uploadedFiles[formIndex].name}
//                   </span>
//                 ) : (
//                   <span style={{ fontSize: '0.85rem' }}>Select File</span>
//                 )}
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(formIndex, e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </label>

//               {uploadedFiles[formIndex] && (
//                 <button
//                   onClick={() => handleDocumentSubmit(formIndex)}
//                   style={{
//                     width: '50%',
//                     marginTop: '10px',
//                     padding: '6px',
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '20px',
//                     cursor: 'pointer',
//                     display: 'block',
//                     margin: '0 auto',
//                   }}
//                 >
//                   Upload
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DocumentUpload;

function DocumentUpload({ lead, onUpload, onDelete, onUpdate }) {
  const [documents, setDocuments] = useState(1);
  const [uploadForms, setUploadForms] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [documentDetails, setDocumentDetails] = useState({});
  const [editingDocId, setEditingDocId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    content: "",
    isImportant: false,
    name: ""
  });

  const handleAddCard = () => {
    const newIndex = documents;
    setDocuments(prev => prev + 1);
    setUploadForms(prev => [...prev, newIndex]);
    setDocumentDetails(prev => ({
      ...prev,
      [newIndex]: {
        content: "",
        isImportant: false
      }
    }));
  };

  const handleFileChange = (index, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [index]: file,
    }));

    // Initialize document details if not already set
    if (!documentDetails[index]) {
      setDocumentDetails(prev => ({
        ...prev,
        [index]: {
          content: "",
          isImportant: false
        }
      }));
    }
  };

  const handleDocumentSubmit = async (index) => {
    const file = uploadedFiles[index];
    const details = documentDetails[index];

    if (!file || !details) return;

    const success = await onUpload(file, details);

    if (success) {
      // Clean up form state
      cleanupFormState(index);
    }
  };

  const cleanupFormState = (index) => {
    setUploadForms(prev => prev.filter(formIndex => formIndex !== index));
    setUploadedFiles(prev => {
      const { [index]: removed, ...rest } = prev;
      return rest;
    });
    setDocumentDetails(prev => {
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
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = docUrl.split('/').pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleEditClick = (doc) => {
    setEditingDocId(doc._id);
    setEditFormData({
      content: doc.content || "",
      isImportant: doc.isImportant || false,
      name: doc.name || ""
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
        <div className="document-upload-document-container-add-on">
          <div onClick={handleAddCard}>+</div>
        </div>
        {lead?.documents?.map((doc, index) => (
          <div
            key={doc._id}
            className="document-upload-document-container-add-on"
            style={{ position: 'relative' }}
          >
            {doc.isImportant && (
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                zIndex: 1
              }}>
                <HomeIcon
                  path="star"
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#FFD700',
                    filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.3))'
                  }}
                />
              </div>
            )}
            <div style={{ position: 'absolute', top: '5px', left: '5px', display: 'flex', gap: '5px', zIndex: 1 }}>
              <div
                onClick={() => handleDeleteDocument(doc)}
                style={{ cursor: 'pointer' }}
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
                onClick={() => editingDocId === doc._id ? setEditingDocId(null) : handleEditClick(doc)}
                style={{ cursor: 'pointer' }}
              >
                <HomeIcon
                  path={editingDocId === doc._id ? "close" : "edit"}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '2px'
                  }}
                />
              </div>
              <div
                onClick={() => handleDownload(doc.url)}
                style={{ cursor: 'pointer' }}
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
            {editingDocId === doc._id ? (
              <div style={{
                marginLeft: '10px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <input
                  type="text"
                  placeholder="Document name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                  style={{
                    width: '100%',
                    padding: '4px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    fontSize: '0.95rem'
                  }}
                />

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#666'
                  }}>
                    <input
                      type="checkbox"
                      checked={editFormData.isImportant}
                      onChange={(e) => setEditFormData(prev => ({
                        ...prev,
                        isImportant: e.target.checked
                      }))}
                      style={{
                        marginRight: '4px',
                        transform: 'scale(0.8)'
                      }}
                    />
                    Mark as Important
                  </label>
                </div>
                <button
                  onClick={() => handleSaveEdit(doc)}
                  style={{
                    width: '50%',
                    padding: '6px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '0 auto',
                    fontSize: '0.85rem',
                    marginTop: '10px'
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
                      width: '24px',
                      height: '24px',
                      color: '#007bff',
                      marginRight: '8px',
                      marginTop: '5px'
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
        {uploadForms.map(formIndex => (
          <div
            key={formIndex}
            className="document-upload-document-container-add-on"
            style={{ position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '5px', left: '5px', zIndex: 1 }}>
              <div
                onClick={() => {
                  setUploadForms(prev => prev.filter(idx => idx !== formIndex));
                  setDocumentDetails(prev => {
                    const newDetails = {...prev};
                    delete newDetails[formIndex];
                    return newDetails;
                  });
                  setUploadedFiles(prev => {
                    const newFiles = {...prev};
                    delete newFiles[formIndex];
                    return newFiles;
                  });
                }}
                style={{ cursor: 'pointer' }}
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
            </div>

            <div className="document-upload-form" style={{
              margin: '5px 0',
              padding: '5px',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <input
                type="text"
                placeholder="Document content"
                value={documentDetails[formIndex]?.content || ""}
                onChange={(e) => setDocumentDetails(prev => ({
                  ...prev,
                  [formIndex]: { ...prev[formIndex], content: e.target.value }
                }))}
                style={{
                  width: '100%',
                  padding: '4px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                  fontSize: '0.95rem'
                }}
              />

              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: '#666'
              }}>
                <input
                  type="checkbox"
                  checked={documentDetails[formIndex]?.isImportant || false}
                  onChange={(e) => setDocumentDetails(prev => ({
                    ...prev,
                    [formIndex]: { ...prev[formIndex], isImportant: e.target.checked }
                  }))}
                  style={{
                    marginRight: '4px',
                    transform: 'scale(0.8)'
                  }}
                />
                Mark as Important
              </label>

              <label style={{
                display: 'block',
                padding: '4px 6px',
                backgroundColor: '#e9ecef',
                border: '1px dashed #adb5bd',
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '5px',
                width: '150px',
                margin: '0 auto',
              }}>
                {uploadedFiles[formIndex] ? (
                  <span style={{
                    display: 'block',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.85rem',
                    maxWidth: '140px',
                  }}>
                    {uploadedFiles[formIndex].name}
                  </span>
                ) : (
                  <span style={{ fontSize: '0.85rem' }}>Select File</span>
                )}
                <input
                  type="file"
                  onChange={(e) => handleFileChange(formIndex, e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>

              {uploadedFiles[formIndex] && (
                <button
                  onClick={() => handleDocumentSubmit(formIndex)}
                  style={{
                    width: '50%',
                    marginTop: '10px',
                    padding: '6px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'block',
                    margin: '0 auto',
                  }}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUpload;