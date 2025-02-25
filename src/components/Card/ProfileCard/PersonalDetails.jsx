import React, { useState, useEffect } from "react";
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
import { message } from "antd";
import ModalBase from "../../Forms/ModalBase";
import AddQualification from "../../Forms/Leads/addQualification";
import HomeIcon from "../../utils/Icons/HomeIcon";
import EditQualification from "../../Forms/Leads/EditQualification";
import { useDispatch } from "react-redux";

export default function PersonalDetails({
  lead,
  onSubmit,
  modalSubmit,
  editQualification,
  deleteQualification,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const dispatch = useDispatch();

  const [originalDetails, setOriginalDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const newDetails = {
      name: lead?.name || "",
      phone: lead?.phone || "",
      email: lead?.email || "",
      address: lead?.address || "",
    };
    setDetails(newDetails);
    setOriginalDetails(newDetails);
    setIsEditing(false);
  }, [lead]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setDetails(originalDetails); // Restore original details on cancel
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setOriginalDetails(details);
    const res = onSubmit({ ...details, leadId: lead?._id }, lead, dispatch);
    if (res) {
      setIsEditing(false);
      message.success("Details updated successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCard = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditCard = (cardId) => {
    const cardToEdit = lead?.qualification?.find((card) => card._id === cardId);
    setSelectedCard(cardToEdit);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (updatedCard) => {
    modalSubmit({ ...updatedCard, leadId: lead?._id });
    setSelectedCard(null);
    handleModalClose();
  };

  const handleEditQualification = (updatedCard) => {
    editQualification(updatedCard);
    setSelectedCard(null);
    handleModalClose();
  };

  const handleDeleteCard = (cardId) => {
    setSelectedCard(cardId);
    deleteQualification(cardId);
  };

  return (
    <div className="profileCard-box personal-details">
      <div className="personal-details-heading">
        <span className="name-small">Personal Details</span>
        {!isEditing ? (
          <span className="icons" onClick={handleOpenEdit}>
            <MdOutlineModeEdit />
          </span>
        ) : (
          <div className="icons personal-details-group-icons">
            <span onClick={handleCloseEdit}>
              <MdOutlineClose />
            </span>
            <span onClick={handleSaveEdit}>
              <MdOutlineCheck />
            </span>
          </div>
        )}
      </div>
      <div className="personal-details-subset">
        <span className="icons">
          <FaRegUser />
        </span>
        <div className="personal-details-key-value">
          <span className="card-number">Name</span>
          <div className="personal-details-editable-detail">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={details.name}
                onChange={handleChange}
                className="personal-details-edit-input"
              />
            ) : (
              <span>{lead?.name}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personal-details-subset-with-wtsp">
        <div className="personal-details-subset">
          <span className="icons">
            <MdOutlineLocalPhone />
          </span>
          <div className="personal-details-key-value">
            <span className="card-number">Contact Number</span>
            <div className="personal-details-editable-detail">
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                  className="personal-details-edit-input"
                />
              ) : (
                <span>{lead?.phone}</span>
              )}
            </div>
          </div>
        </div>
        <span className="whatsapp-icon">
          <FaWhatsapp />
        </span>
      </div>
      <div className="personal-details-subset">
        <span className="icons">
          <MdOutlineMailOutline />
        </span>
        <div className="personal-details-key-value">
          <span className="card-number">Email</span>
          <div className="personal-details-editable-detail">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                className="personal-details-edit-input"
              />
            ) : (
              <span>{lead?.email}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personal-details-subset">
        <span className="icons">
          <GoHome />
        </span>
        <div className="personal-details-key-value">
          <span className="card-number">Address</span>
          <div className="personal-details-editable-detail">
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={details.address}
                onChange={handleChange}
                className="personal-details-edit-input"
              />
            ) : (
              <span>{lead?.address}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personal-details-mark-container">
        <div
          className="personal-details-green-card-add-btn"
          onClick={handleAddCard}
        >
          <IoAdd className="personal-details-green-card-plus" />
        </div>
        {lead?.qualification?.map((card) => (
          <div
            key={card._id}
            className="personal-details-green-card"
            style={{ position: "relative" }}
          >
            <div>
              <div
                onClick={() => handleEditCard(card._id)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "5px",
                  right: "30px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeIcon path="edit" />
              </div>
              <div
                onClick={() => handleDeleteCard(card._id)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  width: "20px",
                  height: "20px",
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HomeIcon path="delete" />
              </div>
            </div>
            <span className="personal-details-green-card-text">
              {card?.name?.length > 4
                ? `${card?.name?.slice(0, 4)}..`
                : card?.name}
            </span>
            <span className="personal-details-green-card-percentage">
              {`${card?.mark}%`}
            </span>
          </div>
        ))}
      </div>
      <ModalBase
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        title={selectedCard ? "Edit Student Mark" : "Add Student Mark"}
      >
        {selectedCard ? (
          <EditQualification
            card={selectedCard}
            closeModal={handleModalClose}
            onSubmit={handleEditQualification}
          />
        ) : (
          <AddQualification
            onSubmit={handleModalSubmit}
            closeModal={handleModalClose}
          />
        )}
      </ModalBase>
    </div>
  );
}
