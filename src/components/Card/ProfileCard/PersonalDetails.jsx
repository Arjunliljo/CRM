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

export default function PersonalDetails({ lead, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Store original details for cancel
  const [originalDetails, setOriginalDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Update details when lead changes
  useEffect(() => {
    const newDetails = {
      name: lead?.name || '',
      phone: lead?.phone || '',
      email: lead?.email || '',
      address: lead?.address || ''
    };
    setDetails(newDetails);
    setOriginalDetails(newDetails);
    setIsEditing(false);
  }, [lead]);

  const [cards, setCards] = useState([
    { id: 1, title: "SSLC", percentage: "79%" },
    { id: 2, title: "PG", percentage: "69%" },
    { id: 3, title: "IELTS", percentage: "5" },
    { id: 4, title: "SSLC", percentage: "80.05%" },
    { id: 5, title: "IELTS", percentage: "72%" },
    { id: 6, title: "SSLC", percentage: "5" },
    { id: 7, title: "UG", percentage: "69%" },
    { id: 8, title: "HSE", percentage: "79%" },
  ]);

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setDetails(originalDetails); // Restore original details on cancel
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setOriginalDetails(details); // Update original details with new values
   const res = onSubmit({...details, leadId: lead?._id});
if(res){
  setIsEditing(false);
   message.success("Details updated successfully");
}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      title: "New Card",
      percentage: "50%",
    };
    setCards((prevCards) => [newCard, ...prevCards]);
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
        {cards.map((card) => (
          <div key={card.id} className="personal-details-green-card">
            <span className="personal-details-green-card-text">
              {card.title}
            </span>
            <span className="personal-details-green-card-percentage">
              {card.percentage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
