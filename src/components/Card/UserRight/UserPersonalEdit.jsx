import React, { useState } from "react";
import {
  MdOutlineModeEdit,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
  MdOutlineClose,
  MdOutlineCheck,
} from "react-icons/md";
import { FaRegUser, FaWhatsapp } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import PrimaryBttn from "../../buttons/PrimaryBttn";

function UserPersonalEdit({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  //to edit mode open
  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  //to close edit mode
  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  //to save form data
  const handleSaveEdit = () => {
    setIsEditing(false);
    //here : logic for save the data
  };

  return (
    <div className="profileCardEdituser-box personalUserEdit-details">
      <div className="personalUserEdit-details-heading">
        <span className="name-small">Personal Details</span>
        {!isEditing ? (
          <span className="icons" onClick={handleOpenEdit}>
            <MdOutlineModeEdit />
          </span>
        ) : (
          <div className="icons personalUserEdit-details-group-icons">
            <span onClick={handleCloseEdit}>
              <MdOutlineClose />
            </span>
            <span onClick={handleSaveEdit}>
              <MdOutlineCheck />
            </span>
          </div>
        )}
      </div>
      <div className="personalUserEdit-details-subset">
        <span className="icons">
          <FaRegUser />
        </span>
        <div className="personalUserEdit-details-key-value">
          <span className="card-number">Name</span>
          <div className="personalUserEdit-details-editable-detail">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user.name}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personalUserEdit-details-subset-with-wtsp">
        <div className="personalUserEdit-details-subset">
          <span className="icons">
            <MdOutlineLocalPhone />
          </span>
          <div className="personalUserEdit-details-key-value">
            <span className="card-number">Contact Number</span>
            <div className="personalUserEdit-details-editable-detail">
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={user.phone}
                  className="personalUserEdit-details-edit-input"
                />
              ) : (
                <span>{user.phone}</span>
              )}
            </div>
          </div>
        </div>
        <span className="whatsapp-icon">
          <FaWhatsapp />
        </span>
      </div>
      <div className="personalUserEdit-details-subset">
        <span className="icons">
          <MdOutlineMailOutline />
        </span>
        <div className="personalUserEdit-details-key-value">
          <span className="card-number">Email</span>
          <div className="personalUserEdit-details-editable-detail">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personalUserEdit-details-subset">
        <span className="icons">
          <GoHome />
        </span>
        <div className="personalUserEdit-details-key-value">
          <span className="card-number">Address</span>
          <div className="personalUserEdit-details-editable-detail">
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={user.addressOne}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user.addressOne}</span>
            )}
          </div>
        </div>
      </div>
      <div
        className="personalUserEdit-details-buttons"
        style={{ marginTop: "0.7rem" }}
      >
        <PrimaryBttn
          style={{
            backgroundColor: "#dadada",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Cancel
        </PrimaryBttn>
        <PrimaryBttn
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            fontWeight: "bold",
          }}
        >
          Add
        </PrimaryBttn>
      </div>
    </div>
  );
}

export default UserPersonalEdit;
