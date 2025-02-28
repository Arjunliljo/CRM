// import React, { useState } from "react";
// import Upload from "../../../assets/Icons/upload.png";

// export default function ImageUploader({ onUpload }) {
//   const [image, setImage] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       onUpload(file);
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       onUpload(file);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div className="modal__form-course-selector">
//       <h2 className="modal__form-course-selector-heading">Upload Image</h2>

//       <div
//         className="modal__form-course-selector-upload"
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <label
//           htmlFor="imageUpload"
//           className="modal__form-course-selector-upload-icon"
//         >
//           <div className="modal__form-course-selector-upload-icon-content">
//             {image ? (
//               <img
//                 src={image}
//                 alt="Uploaded"
//                 className="modal__form-course-selector-upload-icon-content-preview"
//               />
//             ) : (
//               <>
//                 <img
//                   src={Upload}
//                   alt="upload"
//                   className="modal__form-course-selector-upload-icon-content-image"
//                 />
//                 <p className="modal__form-course-selector-upload-icon-content-text1">
//                   Drop your image here, or browse
//                 </p>
//                 <p className="modal__form-course-selector-upload-icon-content-text2">
//                   JPEG, PNG, GIF, or SVG
//                 </p>
//               </>
//             )}
//           </div>
//         </label>
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/png, image/jpeg, image/gif, image/svg+xml"
//           onChange={handleFileChange}
//           hidden
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Upload from "../../../assets/Icons/upload.png";

export default function ImageUploader({ onUpload, image }) {
  const [preview, setPreview] = useState(image || null);

  useEffect(() => {
    if (image) {
      setPreview(image);
    }
  }, [image]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
      onUpload(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
      onUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="modal__form-course-selector">
      <h2 className="modal__form-course-selector-heading">Upload Image</h2>

      <div
        className="modal__form-course-selector-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <label htmlFor="imageUpload">
          <div className="modal__form-course-selector-upload-icon-content">
            {preview ? (
              <img
                src={preview}
                alt="Uploaded Preview"
                className="modal__form-course-selector-upload-icon-content-preview"
              />
            ) : (
              <>
                <img
                  src={Upload}
                  alt="upload"
                  className="modal__form-course-selector-upload-icon-content-image"
                />
                <p>Drop your image here, or browse</p>
                <p>JPEG, PNG, GIF, or SVG</p>
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          onChange={handleFileChange}
          // hidden
        />
      </div>
    </div>
  );
}
