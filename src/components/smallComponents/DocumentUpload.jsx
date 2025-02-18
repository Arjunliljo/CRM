// import { useState } from "react";
// import { useSelector } from "react-redux";
// import apiClient from "../../../config/axiosInstance";

// function DocumentUpload() {
//   const [documents, setDocuments] = useState(6);
//   const [uploadedFiles, setUploadedFiles] = useState({});
//   const currentLead = useSelector((state) => state.leads.curLead);
//   console.log(currentLead, "currentLead");
//   const handleAddCard = () => {
//     setDocuments((prev) => prev + 1);
//   };

//   const handleFileChange = (index, file) => {
//     setUploadedFiles((prev) => ({
//       ...prev,
//       [index]: file,
//     }));

//     const formData = new FormData();
//     formData.append("docfile", file);
//     formData.append("leadId", currentLead._id);

//     apiClient.post("/lead/uploadLeadFile", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//   };


//   return (
//     <div className="document-upload">
//       <span className="name-small">Documents</span>
//       <div className="document-upload-document-container">
//         {Array.from({ length: documents }).map((_, index) => (
//           <div
//             key={index}
//             className="document-upload-document-container-add-on"
//           >
//             {index === 0 ? (
//               <div onClick={handleAddCard}>+</div>
//             ) : (
//               <label>
//                 {uploadedFiles[index] ? uploadedFiles[index].name : "+"}
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(index, e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </label>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../config/axiosInstance";
import HomeIcon from "../utils/Icons/HomeIcon";
import { updateCurLeadDocuments } from "../../../global/leadsSlice";

function DocumentUpload() {
  const [documents, setDocuments] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const currentLead = useSelector((state) => state.leads.curLead);
  const dispatch = useDispatch();

  const handleAddCard = () => {
    setDocuments((prev) => prev + 1);
  };

  const handleFileChange = (index, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [index]: file,
    }));

    const formData = new FormData();
    formData.append("docfile", file);
    formData.append("leadId", currentLead._id);

    apiClient.post("/lead/uploadLeadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleDeleteDocument = (doc) => {
    console.log(doc, "doc from handleDeleteDocument");
    apiClient.patch("/lead/updateLeadDocuments", {
      leadId: currentLead._id,
      documentObj: doc
    }).then(() => {

      console.log("Document deleted successfully");
      dispatch(updateCurLeadDocuments(doc._id));
    }).catch(err => {
      console.error("Error deleting document:", err);
    });
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
            <div
              onClick={() => handleDeleteDocument(doc)}
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                cursor: 'pointer',
                zIndex: 1
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
            <label style={{ marginLeft: '25px' }}>
              {doc.name.split('/').pop()}
              <input
                type="file"
                onChange={(e) => handleFileChange(index + 1, e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ))}
        {Array.from({ length: documents - (currentLead?.documents?.length || 0) - 1 }).map((_, index) => (
          <div
            key={`new-${index}`}
            className="document-upload-document-container-add-on"
          >
            <label>
              {uploadedFiles[index + (currentLead?.documents?.length || 0) + 1]
                ? uploadedFiles[index + (currentLead?.documents?.length || 0) + 1].name
                : "+"}
              <input
                type="file"
                onChange={(e) => handleFileChange(index + (currentLead?.documents?.length || 0) + 1, e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentUpload;
