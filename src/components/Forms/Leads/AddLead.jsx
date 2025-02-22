import React,{ useState } from "react";
import CancelBtn from "../../buttons/CancelBtn";
import {  message } from "antd";
import NextBtn from "../../buttons/NextBtn";
import CountrySelector from "./CountrySelector";
import StatusSelector from "./StatusSelector";

export default function AddLead({
  closeModal,
  newLead,
  setNewLead,
  handleChange,
  countries,
  statuses,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newLead, "newLead");
    if (!newLead.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      const res = await apiClient.post("/lead", newLead);
      setNewLead({ name: "", dob: "", Contact: "", Whatsupp: "", Mail: "" });
      refetchLeads();
      message.success("Branch created successfully!");
    } catch (e) {
      setIsLoading(false);
      message.error("Error creating branch. Please try again.");
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
              onChange={handleChange}
              placeholder="Name"
              className="input-formGroup"
              required
            />
          </div>
          <div className="modal__form-input-text">
            <input
              type="text"
              name="email"
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
            name="Contact"
            onChange={handleChange}
            placeholder="Contact Number"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <StatusSelector statuses={statuses} />
          </div>
          <div className="modal__form-input-text">
            <CountrySelector countries={countries} />
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
