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
import { color } from "framer-motion";

function UserPersonalEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    name: "David Wilson",
    contact: "9895699452",
    email: "davidwilson123@gmail.com",
    address: "Add address",
  });

  const [cards, setCards] = useState([
    { id: 1, title: "SSLC", percentage: "79%" },
    { id: 1, title: "PG", percentage: "69%" },
    { id: 1, title: "IELTS", percentage: "5" },
    { id: 1, title: "SSLC", percentage: "80.05%" },
    { id: 1, title: "IELTS", percentage: "72%" },
    { id: 1, title: "SSLC", percentage: "5" },
    { id: 1, title: "UG", percentage: "69%" },
    { id: 1, title: "HSE", percentage: "79%" },
  ]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCard = () => {
    const newCard = {
      id: cards.length + 1,
      title: "New Card",
      percentage: "50%",
    };
    setCards((prevCards) => [...prevCards, newCard]);
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
                value={details.name}
                onChange={handleChange}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{details.name}</span>
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
                  value={details.contact}
                  onChange={handleChange}
                  className="personalUserEdit-details-edit-input"
                />
              ) : (
                <span>{details.contact}</span>
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
                value={details.email}
                onChange={handleChange}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{details.email}</span>
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
                value={details.address}
                onChange={handleChange}
                className="personalUserEdit-details-edit-input"
              />
            ) : (
              <span>{details.address}</span>
            )}
          </div>
        </div>
      </div>
      <div className="personalUserEdit-details-buttons">
        <PrimaryBttn
          style={{
            backgroundColor: "gray",
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
          Submit
        </PrimaryBttn>
      </div>
    </div>
  );
}

export default UserPersonalEdit;
