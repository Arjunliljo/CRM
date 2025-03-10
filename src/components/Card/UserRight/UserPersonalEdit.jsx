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
import { setAutoUserAssign, setCurUser } from "../../../../global/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalBase from "../../Forms/ModalBase";
import DeleteUser from "./DeleteUser";

function UserPersonalEdit({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to edit mode open
  const handleOpenEdit = () => {
    navigate("/User/user-profile-edit", { state: { user } });
  };

  //to close edit mode
  const handleCloseEdit = () => {};

  //to save form data
  const handleSaveEdit = () => {
    setIsEditing(false);
    //here : logic for save the data
  };

  const handleDeleteUser = async () => {
    try {
      await apiClient.delete(`/user/${user?._id}`);
      refetchUsers();
      dispatch(setAutoUserAssign(false));
      setIsModalOpen(false);
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Something went wrong, please try again later");
    }
  };


  return (
    <div className="profileCardEdituser-box personalUserEdit-details">
      <div className="personalUserEdit-details-heading">
        <span className="name-small">Personal Details</span>
        {!isEditing ? (
          <span
            className="icons"
            onClick={handleOpenEdit}
            style={{ cursor: "pointer" }}
          >
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
          onClick={() => setIsModalOpen(true)}
        >
          Delete User
        </PrimaryBttn>
      </div>

      <ModalBase
        title="Delete User"
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <DeleteUser closeModal={() => setIsModalOpen(false)} onClick={handleDeleteUser} />
      </ModalBase>
    </div>
  );
}

export default UserPersonalEdit;
