import React, { useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import { Input, message } from "antd";
import NextBtn from "../../buttons/NextBtn";
import CountrySelector from "./CountrySelector";
import StatusSelector from "./StatusSelector";
import { refetchLeads } from "../../../apiHooks/useLeads";
import apiClient from "../../../../config/axiosInstance";

export default function AddLead({
  closeModal,
  newLead,
  setNewLead,
  handleChange,
  statuses,
  countries,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newLead.name ||
      !newLead.email ||
      !newLead.phone ||
      !newLead.status ||
      !newLead.country
    ) {
      message.error("Please fill in the fields");
      return;
    }
    try {
      setIsLoading(true);
      const res = await apiClient.post("/lead", newLead);
      message.success("Lead created successfully!");
      setNewLead({ name: "", email: "", phone: "", status: "", country: "" });
      refetchLeads();
      closeModal();
    } catch (e) {
      console.log(e, "e");
      message.error(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="modal__form">
        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <input
              type="text"
              name="name"
              value={newLead.name}
              onChange={handleChange}
              placeholder="Name"
              className="input-formGroup"
              required
            />
          </div>
          <div className="modal__form-input-text">
            <input
              type="email"
              name="email"
              value={newLead.email}
              onChange={handleChange}
              placeholder="email"
              className="input-formGroup"
              required
            />
          </div>
        </div>

        <div className="modal__form-input-text">
          <input
            type="text"
            name="phone"
            value={newLead.phone}
            onChange={handleChange}
            placeholder="Contact Number"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <CountrySelector
              countries={countries}
              handleChange={handleChange}
            />
          </div>
          <div className="modal__form-input-text">
            <StatusSelector statuses={statuses} handleChange={handleChange} />
          </div>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <NextBtn onClick={handleSubmit} isLoading={isLoading}>
            Add
          </NextBtn>
        </div>
      </form>
    </>
  );
}
