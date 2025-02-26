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
import PrimaryBttn from "../../buttons/PrimaryBttn";
import apiClient from "../../../../config/axiosInstance";
import { message } from "antd";
import { refetchUsers } from "../../../apiHooks/useUsers";
import { setCurUser } from "../../../../global/userSlice";
import { useDispatch } from "react-redux";

function UserPersonalEdit({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
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

  const handleDeleteUser = async () => {
    try {
      const response = await apiClient.delete(`/user/${user?._id}`);
      message.success("User deleted successfully");
      refetchUsers();
      dispatch(setCurUser({}));
      console.log(response, "response");
    } catch (error) {
      message.error("User not deleted");
      console.log(error, "error");
    }
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
                value={user && user?.name}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user && user?.name}</span>
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
                  value={user && user?.phone}
                  className="personalUserEdit-details-edit-input"
                />
              ) : (
                <span>{user && user?.phone}</span>
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
                value={user && user?.email}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user && user?.email}</span>
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
                value={user && user?.addressOne}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{user && user?.addressOne}</span>
            )}
          </div>
        </div>
      </div>
      <div
        className="personalUserEdit-details-buttons"
        style={{ marginTop: "0.7rem" }}
      >
        {/* <PrimaryBttn
          style={{
            backgroundColor: "#dadada",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Cancel
        </PrimaryBttn> */}
        <PrimaryBttn
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            fontWeight: "bold",
            backgroundColor: "#bd1212",
            color: "white",
          }}
          onClick={handleDeleteUser}
        >
          Delete User
        </PrimaryBttn>
      </div>
    </div>
  );
}

export default UserPersonalEdit;
